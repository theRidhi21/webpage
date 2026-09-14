// Client Side Validation using JavaScript
// This file checks the Registration form and the Login form
// before the data is submitted.


// ---------- HELPER FUNCTIONS ----------

// show the error message below the input box
const showError = (id, message) => {
  document.getElementById(id).innerHTML = message;
};

// clear all the old error messages
const clearErrors = (ids) => {
  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).innerHTML = "";
  }
};


// ---------- REGISTRATION FORM VALIDATION ----------

const validateRegister = () => {

  // get all the values typed by the user
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const male = document.getElementById("male").checked;
  const female = document.getElementById("female").checked;

  // first remove the old messages
  clearErrors(["e_username", "e_email", "e_phone", "e_dob", "e_password", "e_confirm", "e_gender"]);

  let ok = true;

  // 1. USER NAME - cannot be empty, only letters, at least 3 letters
  if (name == "") {
    showError("e_username", "Please enter user name");
    ok = false;
  } else if (name.length < 3) {
    showError("e_username", "User name must have at least 3 characters");
    ok = false;
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    showError("e_username", "User name can contain only letters");
    ok = false;
  }

  // 2. EMAIL - must be in the correct format like abc@gmail.com
  if (email == "") {
    showError("e_email", "Please enter email id");
    ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
    showError("e_email", "Please enter a valid email id");
    ok = false;
  }

  // 3. PHONE NUMBER - must be exactly 10 digits
  if (phone == "") {
    showError("e_phone", "Please enter phone number");
    ok = false;
  } else if (!/^[0-9]{10}$/.test(phone)) {
    showError("e_phone", "Phone number must be exactly 10 digits");
    ok = false;
  }

  // 4. DATE OF BIRTH - cannot be empty and cannot be a future date
  if (dob == "") {
    showError("e_dob", "Please select date of birth");
    ok = false;
  } else {
    const today = new Date();
    const birth = new Date(dob);

    if (birth > today) {
      showError("e_dob", "Date of birth cannot be in the future");
      ok = false;
    } else {
      // find the age
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m == 0 && today.getDate() < birth.getDate())) {
        age = age - 1;
      }
      if (age < 18) {
        showError("e_dob", "You must be at least 18 years old");
        ok = false;
      }
    }
  }

  // 5. PASSWORD - at least 8 characters with one capital, one small,
  //    one number and one special character
  if (password == "") {
    showError("e_password", "Please enter password");
    ok = false;
  } else if (password.length < 8) {
    showError("e_password", "Password must be at least 8 characters");
    ok = false;
  } else if (!/[A-Z]/.test(password)) {
    showError("e_password", "Password must have one capital letter");
    ok = false;
  } else if (!/[a-z]/.test(password)) {
    showError("e_password", "Password must have one small letter");
    ok = false;
  } else if (!/[0-9]/.test(password)) {
    showError("e_password", "Password must have one number");
    ok = false;
  } else if (!/[@#$%^&*!]/.test(password)) {
    showError("e_password", "Password must have one special character (@ # $ % ^ & * !)");
    ok = false;
  }

  // 6. CONFIRM PASSWORD - must be same as password
  if (confirm == "") {
    showError("e_confirm", "Please confirm your password");
    ok = false;
  } else if (confirm != password) {
    showError("e_confirm", "Password and Confirm Password do not match");
    ok = false;
  }

  // 7. GENDER - one option must be selected
  if (male == false && female == false) {
    showError("e_gender", "Please select gender");
    ok = false;
  }

  // if everything is correct then go to the login page
  if (ok == true) {
    alert("Registration Successful! Please login now.");
    window.location.href = "login.html";
  }

  // returning false stops the form from submitting
  return false;
};


// ---------- LOGIN FORM VALIDATION ----------

const validateLogin = () => {

  const name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  clearErrors(["e_username", "e_password"]);

  let ok = true;

  // USER NAME cannot be empty
  if (name == "") {
    showError("e_username", "Please enter user name");
    ok = false;
  } else if (name.length < 3) {
    showError("e_username", "User name must have at least 3 characters");
    ok = false;
  }

  // PASSWORD cannot be empty
  if (password == "") {
    showError("e_password", "Please enter password");
    ok = false;
  } else if (password.length < 8) {
    showError("e_password", "Password must be at least 8 characters");
    ok = false;
  }

  if (ok == true) {
    alert("Login Successful! Welcome " + name);
    window.location.href = "catalog.html";
  }

  return false;
};


// ---------- ALLOW ONLY NUMBERS IN PHONE BOX ----------
// this function is called when the user types a key

const onlyNumbers = (event) => {
  const key = event.key;

  // allow backspace, delete, tab and arrow keys
  if (key == "Backspace" || key == "Delete" || key == "Tab" || key == "ArrowLeft" || key == "ArrowRight") {
    return true;
  }

  // if it is not a number then block it
  if (key < "0" || key > "9") {
    event.preventDefault();
    return false;
  }

  return true;
};
