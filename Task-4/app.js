const express = require("express");

const app = express();
const PORT = 3000;

// Temporary storage
const students = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Form submission
app.post("/submit", (req, res) => {

    const { name, email, phone, course, password} = req.body;

    // Server-side validation
    if (name.length < 3) {
        return res.send("Name must contain at least 3 characters.");
    }

    if (phone.length !== 10) {
        return res.send("Phone number must be exactly 10 digits.");
    }

    // Temporary storage
    students.push({
        name,
        email,
        phone,
        course
    });

    res.render("success", {
        name,
        email,
        phone,
        course
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});