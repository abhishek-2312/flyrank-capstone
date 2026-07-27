import { z } from "zod";

export const NOTIFICATION_FREQUENCY_OPTIONS = [
  "immediate",
  "daily",
  "weekly",
] as const;

export type NotificationFrequency =
  (typeof NOTIFICATION_FREQUENCY_OPTIONS)[number];

export interface UserSettingsFormValues {
  displayName: string;
  email: string;
  darkMode: boolean;
  notificationFrequency: NotificationFrequency;
}

export interface UserSettingsSubmitState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
}

export interface UserSettingsFormProps {
  defaultValues?: Partial<UserSettingsFormValues>;
  onSubmit?: (values: UserSettingsFormValues) => Promise<void> | void;
  className?: string;
}

export const userSettingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required.")
    .min(3, "Display name must be at least 3 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  darkMode: z.boolean(),
  notificationFrequency: z.enum(NOTIFICATION_FREQUENCY_OPTIONS, {
    required_error: "Select a notification frequency.",
    invalid_type_error: "Select a notification frequency.",
  }),
});

export const userSettingsDefaultValues: UserSettingsFormValues = {
  displayName: "",
  email: "",
  darkMode: false,
  notificationFrequency: "daily",
};

export const NOTIFICATION_FREQUENCY_LABELS: Record<
  NotificationFrequency,
  string
> = {
  immediate: "Immediate",
  daily: "Daily",
  weekly: "Weekly",
};
