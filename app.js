const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// Home Page
app.get("/", (req, res) => {
    res.render("index");
});

// Form Submit
app.post("/submit", (req, res) => {

    const { name, email, phone, course } = req.body;

    res.render("success", {
        name,
        email,
        phone,
        course
    });

});

// Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});