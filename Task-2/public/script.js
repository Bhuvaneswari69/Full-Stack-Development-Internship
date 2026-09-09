const form = document.querySelector("form");

form.addEventListener("submit", function (event) {

    const name = document.querySelector("[name='name']").value.trim();
    const phone = document.querySelector("[name='phone']").value.trim();

    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        event.preventDefault();
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must contain exactly 10 digits.");
        event.preventDefault();
        return;
    }

});