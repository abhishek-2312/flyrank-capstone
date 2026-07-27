import { UserSettingsForm } from "@/components/UserSettingsForm";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <UserSettingsForm
        defaultValues={{
          displayName: "Jane Doe",
          email: "jane@flyrank.ai",
          darkMode: false,
          notificationFrequency: "daily",
        }}
      />
    </main>
  );
}
