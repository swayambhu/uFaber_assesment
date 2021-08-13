/** @format */

const mobileNumber = document.querySelector("#mobileNumber");
const fullName = document.querySelector("#fullName");
const emailID = document.querySelector("#emailID");
const describes = document.querySelector("#describes");

const form = document.querySelector("#signup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>{
  return length < min || length > max ? false : true;
}

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  console.log(formField);
  // add the error class
  input.classList.remove("success");
  input.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
  console.log(error);
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  input.classList.remove("error");
  input.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkMobileNumber = () => {
  let valid = false;
  const min = 10,
    max = 12;
  const phoneNumber = Number(mobileNumber.value.trim());

  if (!isRequired(phoneNumber)) {
    showError(mobileNumber, "Phone Number cannot be blank.");
  } else if (!isBetween(phoneNumber.length, min, max)) {
    showError(
      mobileNumber,
      `Phone Number must be between ${min} and ${max - 1} characters long`,
    );
  }else if (phoneNumber === NaN) {
    showError(mobileNumber, "Only Numbers are allowed.");
  } else {
    showSuccess(mobileNumber);
    valid = true;
  }
  return valid;
};

const checkFullName = () => {
  let valid = false;
  const min = 6,
    max = 25;
  const name = fullName.value.trim();
  if (!isRequired(name)) {
    showError(fullName, "Full Name cannot be blank.");
  } else if (!isBetween(name.length, min, max)) {
    showError(
      fullName,
      `Phone Number must be between ${min} and ${max - 1} characters long`,
    );
  } else {
    showSuccess(fullName);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailID.value.trim();
  if (!isRequired(email)) {
    showError(emailID, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailID, "Email is not valid.");
  } else {
    showSuccess(emailID);
    valid = true;
  }
  return valid;
};

const checkDescribes = () => {
  let valid = false;
  if (describes.value === "Select Option") {
    showError(describes, "Please Select an Option");
    return valid;
  } else {
    valid = true;
  }
  return valid;
};
form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isMobileNumberValid = checkMobileNumber(),
    isFullNameValid = checkFullName(),
    isEmailValid = checkEmail(),
    isDescribed = checkDescribes();
  let isFormValid =
    isMobileNumberValid && isFullNameValid && isEmailValid && isDescribed;

  // submit to the server if the form is valid
  if (isFormValid) {
    location.pathname = location.pathname+"home.html";
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "mobileNumber":
        checkMobileNumber();
        break;
      case "fullName":
        checkFullName();
        break;
      case "emailID":
        checkEmail();
        break;
      case "describes":
        checkDescribes();
        break;
    }
  }),
);
