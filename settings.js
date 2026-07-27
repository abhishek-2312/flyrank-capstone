const settingsForm = document.getElementById("settings-form");
const formAlert = document.getElementById("form-alert");
const resetBtn = document.getElementById("reset-btn");
const emailAlertsCheckbox = document.getElementById("emailAlerts");
const alertThresholdInput = document.getElementById("alertThreshold");
const alertThresholdGroup = document.getElementById("alertThreshold-group");

const DEFAULTS = {
  displayName: "",
  email: "",
  websiteUrl: "",
  crawlFrequency: "",
  timezone: "",
  emailAlerts: false,
  weeklyReports: true,
  alertThreshold: "10",
};

const validators = {
  displayName(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Display name is required.";
    if (trimmed.length < 2) return "Display name must be at least 2 characters.";
    if (trimmed.length > 50) return "Display name must be 50 characters or fewer.";
    return "";
  },

  email(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Email address is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
    return "";
  },

  websiteUrl(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Website URL is required.";
    try {
      const url = new URL(trimmed);
      if (!["http:", "https:"].includes(url.protocol)) {
        return "URL must use http:// or https://.";
      }
    } catch {
      return "Enter a valid URL (e.g. https://example.com).";
    }
    return "";
  },

  crawlFrequency(value) {
    if (!value) return "Please select a crawl frequency.";
    return "";
  },

  timezone(value) {
    if (!value) return "Please select a timezone.";
    return "";
  },

  alertThreshold(value, formData) {
    if (!formData.emailAlerts) return "";
    const num = Number(value);
    if (value === "" || Number.isNaN(num)) return "Threshold is required when alerts are enabled.";
    if (num < 1 || num > 100) return "Threshold must be between 1 and 100.";
    if (!Number.isInteger(num)) return "Threshold must be a whole number.";
    return "";
  },
};

function getFormData() {
  return {
    displayName: settingsForm.displayName.value,
    email: settingsForm.email.value,
    websiteUrl: settingsForm.websiteUrl.value,
    crawlFrequency: settingsForm.crawlFrequency.value,
    timezone: settingsForm.timezone.value,
    emailAlerts: settingsForm.emailAlerts.checked,
    weeklyReports: settingsForm.weeklyReports.checked,
    alertThreshold: settingsForm.alertThreshold.value,
  };
}

function setFieldError(fieldName, message) {
  const input = settingsForm.elements[fieldName];
  const errorEl = document.getElementById(`${fieldName}-error`);
  if (!input || !errorEl) return;

  input.classList.toggle("input-error", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  errorEl.textContent = message;
}

function validateField(fieldName) {
  const formData = getFormData();
  const value = formData[fieldName];
  const message = validators[fieldName](value, formData);
  setFieldError(fieldName, message);
  return !message;
}

function validateForm() {
  const fields = Object.keys(validators);
  const results = fields.map(validateField);
  return results.every(Boolean);
}

function showAlert(message, type = "success") {
  formAlert.textContent = message;
  formAlert.className = `form-alert form-alert--${type}`;
  formAlert.hidden = false;
  formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideAlert() {
  formAlert.hidden = true;
  formAlert.textContent = "";
}

function updateThresholdState() {
  const enabled = emailAlertsCheckbox.checked;
  alertThresholdInput.disabled = !enabled;
  alertThresholdGroup.classList.toggle("form-group--disabled", !enabled);
  if (!enabled) {
    setFieldError("alertThreshold", "");
  }
}

function populateForm(data) {
  settingsForm.displayName.value = data.displayName;
  settingsForm.email.value = data.email;
  settingsForm.websiteUrl.value = data.websiteUrl;
  settingsForm.crawlFrequency.value = data.crawlFrequency;
  settingsForm.timezone.value = data.timezone;
  settingsForm.emailAlerts.checked = data.emailAlerts;
  settingsForm.weeklyReports.checked = data.weeklyReports;
  settingsForm.alertThreshold.value = data.alertThreshold;
  updateThresholdState();
}

function loadSettings() {
  try {
    const saved = localStorage.getItem("flyrank-settings");
    if (saved) {
      populateForm({ ...DEFAULTS, ...JSON.parse(saved) });
      return;
    }
  } catch {
    /* ignore corrupt storage */
  }
  populateForm(DEFAULTS);
}

function saveSettings(data) {
  localStorage.setItem("flyrank-settings", JSON.stringify(data));
}

Object.keys(validators).forEach((fieldName) => {
  const input = settingsForm.elements[fieldName];
  if (!input) return;

  input.addEventListener("blur", () => validateField(fieldName));
  input.addEventListener("input", () => {
    if (input.classList.contains("input-error")) {
      validateField(fieldName);
    }
    hideAlert();
  });
});

emailAlertsCheckbox.addEventListener("change", () => {
  updateThresholdState();
  validateField("alertThreshold");
});

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideAlert();

  if (!validateForm()) {
    showAlert("Please fix the errors below before saving.", "error");
    const firstInvalid = settingsForm.querySelector(".input-error");
    firstInvalid?.focus();
    return;
  }

  const data = getFormData();
  saveSettings(data);
  showAlert("Settings saved successfully.", "success");
});

resetBtn.addEventListener("click", () => {
  populateForm(DEFAULTS);
  Object.keys(validators).forEach((fieldName) => setFieldError(fieldName, ""));
  hideAlert();
  showAlert("Form reset to defaults.", "info");
});

loadSettings();
