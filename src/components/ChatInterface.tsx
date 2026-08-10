'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  // 1. 100% Native React State (No buggy Vercel hooks)
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [localInput, setLocalInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 2. Native Fetch to stream the AI response flawlessly
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    const userText = localInput.trim();
    setLocalInput('');
    setIsLoading(true);

    const userMessage = { id: Date.now().toString(), role: 'user', content: userText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No readable stream');

      const decoder = new TextDecoder();
      let aiContent = '';
      const aiMsgId = (Date.now() + 1).toString();

      // Create an empty AI message in the UI to start streaming into
      setMessages((prev) => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);

      // Read the stream chunk by chunk naturally
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiContent += chunk;

        setMessages((prev) =>
          prev.map((msg) => (msg.id === aiMsgId ? { ...msg, content: aiContent } : msg))
        );
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: 'assistant', content: '⚠️ Error: Connection to Nexus AI failed.' },
        ]);
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const stop = () => {
    if (abortController) {
      abortController.abort();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.length === 0 && (
          <div className="mt-24 text-center text-slate-500 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">N</div>
            <h3 className="text-lg font-bold text-slate-800">Nexus Intelligence Ready</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Ask for competitor breakdowns, target audience acquisition plans, or GTM scaling strategies.
            </p>
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                  : 'bg-slate-100 text-slate-900 rounded-bl-xs border border-slate-200/60 prose prose-slate max-w-none'
              }`}
            >
              {m.role === 'user' ? (
                <p className="whitespace-pre-wrap">{m.content}</p>
              ) : (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-2xl rounded-bl-xs px-5 py-3.5 text-sm animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              Analyzing market insights...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 p-4 bg-white z-10">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400"
            type="text"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)} 
            placeholder="Type your strategic query..."
          />
          
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!localInput.trim()}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}