"use client";

import { useState } from "react";

// Make sure 'export default' is right here!
export default function SettingsForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    notifications: "daily",
  });

  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; email?: string } = {};

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Display name must be at least 3 characters long.";
    }

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Settings</h2>

      {submitted && (
        <div role="alert" className="p-3 mb-4 text-sm bg-green-100 text-green-800 rounded-md">
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            aria-invalid={!!errors.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          {errors.username && (
            <p role="alert" className="text-xs text-red-600 mt-1">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            aria-invalid={!!errors.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-red-600 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 mb-1">
            Notification Frequency
          </label>
          <select
            id="notifications"
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500"
            value={formData.notifications}
            onChange={(e) => setFormData({ ...formData, notifications: e.target.value })}
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}