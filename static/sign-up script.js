// Your SheetDB API endpoint (acts like a database)
const sheetApi = "https://sheetdb.io/api/v1/zqqbuc7ksps31";

// Switch to Register tab
function showRegister() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const tabs = document.querySelectorAll(".tab");

    loginForm.style.display = "none";
    registerForm.style.display = "block";

    tabs[0].classList.remove("active");
    tabs[1].classList.add("active");
}

// Switch back to Login tab
function showLogin() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const tabs = document.querySelectorAll(".tab");

    registerForm.style.display = "none";
    loginForm.style.display = "block";

    tabs[1].classList.remove("active");
    tabs[0].classList.add("active");
}

// Handle user registration
function handleRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-pass").value;
    const role = document.getElementById("reg-role").value;

    if (!name || !email || !pass || !role) {
        alert("Please fill in all fields.");
        return;
    }

    const userData = {
        FullName: name,
        Email: email,
        Password: pass,
        Role: role
    };

    fetch(sheetApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [userData] })
    })
    .then(response => {
        if (!response.ok) throw new Error("API error");
        alert("Registration successful! You can now log in.");
        showLogin();
    })
    .catch(error => {
        console.error("Registration error:", error);
        alert("Could not save user. Please try again later.");
    });
}

// Handle user login
function handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-pass").value;

    if (!email || !pass) {
        alert("Please enter both email and password.");
        return;
    }

    fetch(sheetApi + "/search?Email=" + encodeURIComponent(email))
    .then(response => response.json())
    .then(users => {
        if (!users || users.length === 0) {
            alert("User not found.");
            return;
        }

        const matchedUser = users.find(user => user.Password === pass);

        if (!matchedUser) {
            alert("Invalid email or password.");
            return;
        }

        alert("Welcome back, " + matchedUser.FullName + "!");

        // Redirect based on role
        if (matchedUser.Role === "Mall Admin") {
            window.location.href = "admin.html"; // stays the same
        } 
        else if (matchedUser.Role === "Customer") {
            // Redirect to localhost index.html
            window.location.href = "/"; 
        } 
        else {
            alert("Your role is not recognized.");
        }
    })
    .catch(error => {
        console.error("Login error:", error);
        alert("Login failed. Please check your connection.");
    });
}