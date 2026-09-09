// Get form elements
const form = document.querySelector("form");

const nameInput = document.querySelector("[name='name']");
const phoneInput = document.querySelector("[name='phone']");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput =
    document.querySelector("#confirmPassword");

const passwordMessage =
    document.querySelector("#passwordMessage");

const confirmMessage =
    document.querySelector("#confirmMessage");


// ========================================
// PASSWORD STRENGTH
// ========================================

passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    let strength = 0;

    // At least 8 characters
    if (password.length >= 8) {
        strength++;
    }

    // Uppercase letter
    if (/[A-Z]/.test(password)) {
        strength++;
    }

    // Lowercase letter
    if (/[a-z]/.test(password)) {
        strength++;
    }

    // Number
    if (/[0-9]/.test(password)) {
        strength++;
    }

    // Special character
    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    // Dynamic DOM update

    if (password.length === 0) {

        passwordMessage.textContent =
            "Password strength will appear here.";

        passwordMessage.className =
            "text-muted";

    } else if (strength <= 2) {

        passwordMessage.textContent =
            "Weak password";

        passwordMessage.className =
            "text-danger";

    } else if (strength <= 4) {

        passwordMessage.textContent =
            "Medium password";

        passwordMessage.className =
            "text-warning";

    } else {

        passwordMessage.textContent =
            "Strong password ✓";

        passwordMessage.className =
            "text-success";
    }

});


// ========================================
// CONFIRM PASSWORD
// ========================================

confirmPasswordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    if (confirmPassword.length === 0) {

        confirmMessage.textContent =
            "Please confirm your password.";

        confirmMessage.className =
            "text-muted";

    } else if (password === confirmPassword) {

        confirmMessage.textContent =
            "Passwords match ✓";

        confirmMessage.className =
            "text-success";

    } else {

        confirmMessage.textContent =
            "Passwords do not match ✗";

        confirmMessage.className =
            "text-danger";
    }

});


// ========================================
// FORM SUBMISSION VALIDATION
// ========================================

form.addEventListener("submit", function (event) {

    const name =
        nameInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    // Name validation

    if (name.length < 3) {

        alert(
            "Name must contain at least 3 characters."
        );

        event.preventDefault();

        return;
    }


    // Phone validation

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Phone number must contain exactly 10 digits."
        );

        event.preventDefault();

        return;
    }


    // Password validation

    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


    if (!strongPassword.test(password)) {

        alert(
            "Password must contain at least 8 characters, " +
            "one uppercase letter, one lowercase letter, " +
            "one number and one special character."
        );

        event.preventDefault();

        return;
    }


    // Confirm password validation

    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        event.preventDefault();

        return;
    }

});