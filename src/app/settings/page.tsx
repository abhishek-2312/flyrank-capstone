import SettingsForm from '../../components/SettingsForm';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Configuration</h1>
        <p className="mt-1 text-slate-600">Manage agent preferences and telemetry alerts.</p>
      </div>
      <SettingsForm />
    </div>
  );
}