interface StatusResponse {
    status: string;
    timestamp: string;
  }
  
  // Simulating a server-side data fetch
  async function getHealthStatus(): Promise<StatusResponse> {
    return {
      status: 'operational',
      timestamp: new Date().toISOString(),
    };
  }
  
  export default async function HealthPage() {
    const data = await getHealthStatus();
  
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">System Health Status</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-semibold capitalize text-emerald-700">Status: {data.status}</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">Last Verified: {data.timestamp}</p>
        </div>
      </div>
    );
  }