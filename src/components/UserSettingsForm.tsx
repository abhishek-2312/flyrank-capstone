"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NOTIFICATION_FREQUENCY_LABELS,
  NOTIFICATION_FREQUENCY_OPTIONS,
  userSettingsDefaultValues,
  userSettingsSchema,
  type UserSettingsFormProps,
  type UserSettingsFormValues,
  type UserSettingsSubmitState,
} from "@/lib/schemas/user-settings";

export type { UserSettingsFormValues, UserSettingsSubmitState };

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

async function defaultSubmitHandler(
  values: UserSettingsFormValues,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.info("Settings saved:", values);
}

export function UserSettingsForm({
  defaultValues,
  onSubmit = defaultSubmitHandler,
  className,
}: UserSettingsFormProps) {
  const [submitState, setSubmitState] = useState<UserSettingsSubmitState>({
    isSubmitting: false,
    isSuccess: false,
    errorMessage: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      ...userSettingsDefaultValues,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const isDisabled = submitState.isSubmitting;

  const handleFormSubmit = handleSubmit(async (values) => {
    setSubmitState({ isSubmitting: true, isSuccess: false, errorMessage: null });

    try {
      await onSubmit(values);
      setSubmitState({ isSubmitting: false, isSuccess: true, errorMessage: null });
      reset(values);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitState({
        isSubmitting: false,
        isSuccess: false,
        errorMessage: message,
      });
    }
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className={cn(
        "w-full max-w-lg space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
      aria-busy={isDisabled}
    >
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          User Settings
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Update your profile and notification preferences.
        </p>
      </header>

      {submitState.isSuccess && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
        >
          Settings saved successfully.
        </p>
      )}

      {submitState.errorMessage && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
        >
          {submitState.errorMessage}
        </p>
      )}

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            disabled={isDisabled}
            aria-invalid={errors.displayName ? "true" : "false"}
            aria-describedby={
              errors.displayName ? "displayName-error" : undefined
            }
            className={cn(
              "block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition",
              "placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60",
              "dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500",
              errors.displayName
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-indigo-500 dark:border-slate-600",
            )}
            placeholder="Jane Doe"
            {...register("displayName")}
          />
          {errors.displayName && (
            <p
              id="displayName-error"
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isDisabled}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition",
              "placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60",
              "dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500",
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-indigo-500 dark:border-slate-600",
            )}
            placeholder="you@company.com"
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700">
          <div className="space-y-0.5">
            <label
              htmlFor="darkMode"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Dark Mode
            </label>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Use a dark color theme across the app.
            </p>
          </div>
          <input
            id="darkMode"
            type="checkbox"
            disabled={isDisabled}
            aria-invalid={errors.darkMode ? "true" : "false"}
            aria-describedby={errors.darkMode ? "darkMode-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600"
            {...register("darkMode")}
          />
        </div>
        {errors.darkMode && (
          <p
            id="darkMode-error"
            role="alert"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errors.darkMode.message}
          </p>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="notificationFrequency"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Notification Frequency
          </label>
          <select
            id="notificationFrequency"
            disabled={isDisabled}
            aria-invalid={errors.notificationFrequency ? "true" : "false"}
            aria-describedby={
              errors.notificationFrequency
                ? "notificationFrequency-error"
                : undefined
            }
            className={cn(
              "block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition",
              "focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60",
              "dark:bg-slate-950 dark:text-slate-50",
              errors.notificationFrequency
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-indigo-500 dark:border-slate-600",
            )}
            {...register("notificationFrequency")}
          >
            {NOTIFICATION_FREQUENCY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {NOTIFICATION_FREQUENCY_LABELS[option]}
              </option>
            ))}
          </select>
          {errors.notificationFrequency && (
            <p
              id="notificationFrequency-error"
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.notificationFrequency.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => {
            reset({ ...userSettingsDefaultValues, ...defaultValues });
            setSubmitState({
              isSubmitting: false,
              isSuccess: false,
              errorMessage: null,
            });
          }}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDisabled ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
