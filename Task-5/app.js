const express = require("express");

const app = express();

const PORT = 3001;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static files
app.use(express.static("public"));


// EJS
app.set("view engine", "ejs");


// Temporary student data
let students = [];


// ================================
// HOME PAGE
// ================================

app.get("/", (req, res) => {

    res.render("index");

});


// ================================
// CREATE - POST
// ================================

app.post("/api/students", (req, res) => {

    const { name, email, phone, course } = req.body;


    if (!name || !email || !phone || !course) {

        return res.status(400).json({

            message: "All fields are required."

        });

    }


    const student = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        course: course

    };


    students.push(student);


    res.status(201).json({

        message: "Student registered successfully.",

        student: student

    });

});


// ================================
// READ - GET ALL
// ================================

app.get("/api/students", (req, res) => {

    res.json(students);

});


// ================================
// READ - GET ONE
// ================================

app.get("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);


    const student =
        students.find(
            student => student.id === id
        );


    if (!student) {

        return res.status(404).json({

            message: "Student not found."

        });

    }


    res.json(student);

});


// ================================
// UPDATE - PUT
// ================================

app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);


    const student =
        students.find(
            student => student.id === id
        );


    if (!student) {

        return res.status(404).json({

            message: "Student not found."

        });

    }


    const {
        name,
        email,
        phone,
        course
    } = req.body;


    if (name) {
        student.name = name;
    }

    if (email) {
        student.email = email;
    }

    if (phone) {
        student.phone = phone;
    }

    if (course) {
        student.course = course;
    }


    res.json({

        message: "Student updated successfully.",

        student: student

    });

});


// ================================
// DELETE
// ================================

app.delete("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);


    const index =
        students.findIndex(
            student => student.id === id
        );


    if (index === -1) {

        return res.status(404).json({

            message: "Student not found."

        });

    }


    const deletedStudent =
        students.splice(index, 1);


    res.json({

        message: "Student deleted successfully.",

        student: deletedStudent[0]

    });

});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});