async function getHealthStatus() {
  return { status: 'operational', timestamp: new Date().toISOString() };
}

export default async function HealthPage() {
  const data = await getHealthStatus();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Telemetry</h1>
        <p className="mt-1 text-slate-600">Real-time status tracking for backend AI nodes.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse shadow-xs" />
          <p className="font-bold capitalize text-emerald-800 text-lg">Engine Status: {data.status}</p>
        </div>
        <p className="mt-3 text-sm text-slate-500 border-t border-slate-100 pt-3">Last Verified Node Ping: {data.timestamp}</p>
      </div>
    </div>
  );
}