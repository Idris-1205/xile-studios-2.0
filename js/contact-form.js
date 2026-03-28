document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const formStatus = document.getElementById("formStatus");
  if (!form || !submitButton || !formStatus) return;

  const fields = [...form.querySelectorAll("input, select, textarea")];

  function setFieldError(field, message) {
    const group = field.closest(".form-group");
    const errorText = group?.querySelector(".error-text");
    field.classList.add("is-invalid");
    if (errorText) errorText.textContent = message;
  }

  function clearFieldError(field) {
    const group = field.closest(".form-group");
    const errorText = group?.querySelector(".error-text");
    field.classList.remove("is-invalid");
    if (errorText) errorText.textContent = "";
  }

  function validateField(field) {
    const value = field.value.trim();

    if (!value) {
      setFieldError(field, "This field is required.");
      return false;
    }

    if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setFieldError(field, "Enter a valid email address.");
        return false;
      }
    }

    clearFieldError(field);
    return true;
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const isValid = fields.map(validateField).every(Boolean);
    if (!isValid) {
      formStatus.textContent = "Please fix the highlighted fields.";
      formStatus.classList.add("is-error");
      return;
    }

    const payload = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value.trim(),
      budget: form.budget.value.trim(),
      message: form.message.value.trim(),
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch("/.netlify/functions/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      form.reset();
      formStatus.textContent = "Inquiry sent successfully. We’ll be in touch soon.";
      formStatus.classList.add("is-success");
    } catch (error) {
      formStatus.textContent = error.message || "Unable to send inquiry right now.";
      formStatus.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
    }
  });
});
