const form = document.getElementById("contact-form");

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageTextarea = document.getElementById("message");
const consentBox = document.getElementById("consent-box");

const firstNameErrorLabel = document.getElementById("first-name-error-label");
const lastNameErrorLabel = document.getElementById("last-name-error-label");
const emailErrorLabel = document.getElementById("email-error-label");
const queryTypeErrorLabel = document.getElementById("query-type-error-label");
const messageErrorLabel = document.getElementById("message-error-label");
const consentBoxErrorLabel = document.getElementById("consent-box-error-label");

const submitButton = document.getElementById("submit-button");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidInput = (value) => value !== undefined && value !== "";
const toCamelCase = (str) => {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

const createSuccessMessage = () => {
  const successPopup = document.createElement("section");
  successPopup.id = "success-popup";
  successPopup.ariaLive = "polite";
  successPopup.innerHTML += `
    <header class="success-popup-header">
      <img src="assets/images/icon-success-check.svg" alt="Checkmark" />
      <h2>Message Sent!</h2>
    </header>
    <p class="thank-you-message">Thanks for completing the form. We'll be in touch soon!</p>
  `;
  return successPopup;
};

const addErrorLabel = ({ input, label, message }) => {
  if (input) {
    input.classList.add("error");
    input.ariaInvalid = "true";
  }
  label.classList.remove("hidden");
  label.textContent = message;
};

const clearErrorLabel = ({ input, label }) => {
  if (input) {
    input.classList.remove("error");
    input.ariaInvalid = "false";
  }
  label.classList.add("hidden");
  label.textContent = "";
};

const removePopup = (element) => element.remove();

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const purifiedFormData = {};

  for (let [key, value] of formData.entries()) {
    const camelCaseKey = toCamelCase(key);
    purifiedFormData[camelCaseKey] = value;
  }

  const { firstName, lastName, email, queryType, message } = purifiedFormData;
  const isConsentBoxChecked = consentBox.checked;

  clearErrorLabel({ input: firstNameInput, label: firstNameErrorLabel });
  clearErrorLabel({ input: lastNameInput, label: lastNameErrorLabel });
  clearErrorLabel({ input: emailInput, label: emailErrorLabel });
  clearErrorLabel({ label: queryTypeErrorLabel });
  clearErrorLabel({ input: messageTextarea, label: messageErrorLabel });
  clearErrorLabel({ input: consentBox, label: consentBoxErrorLabel });

  if (
    !isValidInput(firstName) ||
    !isValidInput(lastName) ||
    !isValidEmail(email) ||
    !isValidInput(queryType) ||
    !isValidInput(message) ||
    !isConsentBoxChecked
  ) {
    const genericErrorMessage = "This field is required";
    const firstNameErrorMessage = genericErrorMessage;
    const lastNameErrorMessage = genericErrorMessage;
    const emailErrorMessage = "Please enter a valid email address";
    const queryTypeErrorMessage = "Please select a query type";
    const messageErrorMessage = genericErrorMessage;
    const consentBoxErrorMessage =
      "To submit this form, please consent to being contacted";

    if (!isValidInput(firstName)) {
      addErrorLabel({
        input: firstNameInput,
        label: firstNameErrorLabel,
        message: firstNameErrorMessage,
      });
    }

    if (!isValidInput(lastName)) {
      addErrorLabel({
        input: lastNameInput,
        label: lastNameErrorLabel,
        message: lastNameErrorMessage,
      });
    }

    if (!isValidEmail(email)) {
      addErrorLabel({
        input: emailInput,
        label: emailErrorLabel,
        message: emailErrorMessage,
      });
    }

    if (!isValidInput(queryType)) {
      addErrorLabel({
        label: queryTypeErrorLabel,
        message: queryTypeErrorMessage,
      });
    }

    if (!isValidInput(message)) {
      addErrorLabel({
        input: messageTextarea,
        label: messageErrorLabel,
        message: messageErrorMessage,
      });
    }

    if (!isConsentBoxChecked) {
      addErrorLabel({
        input: consentBox,
        label: consentBoxErrorLabel,
        message: consentBoxErrorMessage,
      });
    }

    return;
  }

  const successPopup = createSuccessMessage();
  document.body.appendChild(successPopup);

  form.reset();

  setTimeout(() => removePopup(successPopup), 10000);
};

form.addEventListener("submit", handleSubmit);
