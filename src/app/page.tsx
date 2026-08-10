// src/app/page.tsx
import ChatInterface from '../components/ChatInterface';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Strategic Intelligence Hub</h1>
        <p className="mt-1 text-slate-600">
          Query the autonomous sales intelligence engine for competitor data and market positioning workflows.
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
}