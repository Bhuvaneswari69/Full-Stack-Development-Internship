const form = document.querySelector("#studentForm");
const studentList = document.querySelector("#studentList");
const message = document.querySelector("#message");


// ========================================
// LOAD ALL STUDENTS
// ========================================

async function loadStudents() {

    try {

        const response = await fetch("/api/students");

        const students = await response.json();

        studentList.innerHTML = "";

        if (students.length === 0) {

            studentList.innerHTML =
                "<p>No students registered yet.</p>";

            return;
        }


        students.forEach(student => {

            const card =
                document.createElement("div");

            card.className =
                "student-item";


            card.innerHTML = `
                <div>
                    <h5>${student.name}</h5>

                    <p>
                        <strong>Email:</strong>
                        ${student.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${student.phone}
                    </p>

                    <p>
                        <strong>Course:</strong>
                        ${student.course}
                    </p>
                </div>

                <div class="mt-2">

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editStudent(${student.id})">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${student.id})">

                        Delete

                    </button>

                </div>
            `;


            studentList.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load students.";

    }

}


// ========================================
// CREATE STUDENT
// ========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    const formData =
        new FormData(form);


    const student = {

        name: formData.get("name"),

        email: formData.get("email"),

        phone: formData.get("phone"),

        course: formData.get("course")

    };


    try {

        const response = await fetch(
            "/api/students",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        message.textContent =
            "Student registered successfully!";


        form.reset();


        loadStudents();

    }

    catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";

    }

});


// ========================================
// EDIT STUDENT
// ========================================

async function editStudent(id) {

    try {

        const response =
            await fetch(`/api/students/${id}`);


        const student =
            await response.json();


        if (!response.ok) {

            alert(student.message);

            return;
        }


        const name =
            prompt(
                "Enter student name:",
                student.name
            );


        if (name === null) {
            return;
        }


        const email =
            prompt(
                "Enter email:",
                student.email
            );


        if (email === null) {
            return;
        }


        const phone =
            prompt(
                "Enter phone number:",
                student.phone
            );


        if (phone === null) {
            return;
        }


        const course =
            prompt(
                "Enter course:",
                student.course
            );


        if (course === null) {
            return;
        }


        const updatedStudent = {

            name: name,

            email: email,

            phone: phone,

            course: course

        };


        const updateResponse =
            await fetch(
                `/api/students/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedStudent)

                }
            );


        const data =
            await updateResponse.json();


        if (!updateResponse.ok) {

            alert(data.message);

            return;
        }


        message.textContent =
            "Student updated successfully!";


        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to update student."
        );

    }

}


// ========================================
// DELETE STUDENT
// ========================================

async function deleteStudent(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/students/${id}`,
                {

                    method: "DELETE"

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;
        }


        message.textContent =
            "Student deleted successfully!";


        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to delete student."
        );

    }

}


// ========================================
// INITIAL LOAD
// ========================================

loadStudents();