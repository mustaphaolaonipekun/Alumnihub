// document.addEventListener("DOMContentLoaded", function () {
// document.getElementById("formSignup").addEventListener("submit", async function (e) {
//   e.preventDefault();

//     console.log("✅ Form submitted");

//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phoneCode = document.getElementById("code").value;
//   const phoneNumber = document.getElementById("num").value.trim();
//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById("pass").value;

//   const errorElement = document.getElementById("error");
//   if (password !== confirmPassword) {
//     errorElement.style.display = "block";
//     return;
//   } else {
//     errorElement.style.display = "none";
//   }

//   const payload = {
//     password: password,
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     phoneNumber: phoneCode + phoneNumber,
//     photoMimeType: "", // leave empty if not using profile photo
//     photo: "" // leave empty if no profile image
//   };

//   console.log("📤 Sending payload:", payload);

//   try {
//     const response = await fetch("https://alumnihub.azurewebsites.net/auth/emails/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });

//     const result = await response.json();
//     console.log("📥 API Response:", result);

//     if (response.ok) {
//       window.location.href = "accountcreated.html";
//     } else {
//       alert("❌ Signup failed: " + (result.message || "Unknown error. Check console."));
//     }
//   } catch (error) {
//     console.error("❌ Network error:", error);
//     alert("⚠️ Network error. Please try again later.");
//   }
// });
// const passwordInput = document.getElementById("password");
// const confirmpasswordInput = document.getElementById("pass");

// const togglePassword = document.getElementById("togglePassword");
// const confirmPassword = document.getElementById("confirmPassword");

// togglePassword.addEventListener("click", () => {
//   const isPassword = passwordInput.type === "password";
//   passwordInput.type = isPassword ? "text" : "password";

//   togglePassword.classList.toggle("fa-eye");
//   togglePassword.classList.toggle("fa-eye-slash");
// });

// confirmPassword.addEventListener("click", () => {
//   const isPassword = confirmpasswordInput.type === "password";
//   confirmpasswordInput.type = isPassword ? "text" : "password";

//   confirmPassword.classList.toggle("fa-eye");
//   confirmPassword.classList.toggle("fa-eye-slash");
// });

//  const form = document.getElementById("formSignup");
//     const password = document.getElementById("password");
//     const confirmPasswords = document.getElementById("pass");
//     const error = document.getElementById("error");

//     form.addEventListener("submit", function(event) {
//       if (password.value !== confirmPasswords.value) {
//         event.preventDefault();
//         error.style.display = "block";
//       } else {
//         error.style.display = "none";
//       }
//     });});

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("formSignup");
//   if (!form) {
//     console.error("❌ formSignup not found in DOM!");
//     return;
//   }

//   // ✅ Check if user already registered
//   if (localStorage.getItem("isRegistered") === "true") {
//     window.location.href = "login.html"; // redirect to login page
//     return;
//   }

//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const firstName = document.getElementById("firstName").value.trim();
//     const lastName = document.getElementById("lastName").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const phoneCode = document.getElementById("code").value;
//     const phoneNumber = document.getElementById("num").value.trim();
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPasswordInput").value;

//     const errorElement = document.getElementById("error");
//     if (password !== confirmPassword) {
//       errorElement.style.display = "block";
//       return;
//     } else {
//       errorElement.style.display = "none";
//     }

//     const payload = {
//       password: password,
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phoneNumber: phoneCode + phoneNumber,
//       photoMimeType: "",
//       photo: ""
//     };

//     try {
//       const response = await fetch("https://alumnihub.azurewebsites.net/auth/emails/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       console.log("📥 API Response:", result);

//       if (response.ok) {
//         // ✅ Save registration status
//         localStorage.setItem("isRegistered", "true");
//         localStorage.setItem("registeredEmail", email); // optional: save email for login autofill

//         // Redirect to account created page
//         window.location.href = "accountexits.html";
//       } else {
//         alert("❌ Signup failed: " + (result.message || "Unknown error. Check console."));
//       }
//     } catch (error) {
//       console.error("❌ Network error:", error);
//       alert("⚠️ Network error. Please try again later.");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formSignup");
  const registerBtn = document.getElementById("registerBtn");
  const messageBox = document.getElementById("message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<span class="loader"></span> Creating account...';

    // console.log("✅ Form submitted");

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneCode = document.getElementById("code").value;
    const phoneNumber = document.getElementById("num").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("pass").value;

    const errorElement = document.getElementById("error");
    if (password !== confirmPassword) {
      errorElement.style.display = "block";
      return;
    } else {
      errorElement.style.display = "none";
    }

    const payload = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneCode + phoneNumber,
      photoMimeType: "",
      photo: "",
    };

    try {
      const response = await fetch(
        "https://alumnihub.azurewebsites.net/auth/emails/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      //The below Redirects to accountexits.html or accountcreated.html
      if (
        result.errorMessage &&
        (result.errorMessage.toLowerCase().includes("duplicate key") ||
          result.errorMessage.toLowerCase().includes("unique key"))
      ) {
        setTimeout(() => {
          window.location.href = "accountexits.html";
        }, 2000);
      } else if (!result.isError && response.ok) {
        setTimeout(() => {
          window.location.href = "accountcreated.html";
        }, 2000);
      } else {
        alert(
          `❌ Signup failed: ${result.errorMessage || "Unknown error."}`,
          "error"
        );
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("⚠️ Network error. Please try again later.");
    } finally {
      resetButton();
    }
  });

  // 🔹 Password toggle setup
  const passwordInput = document.getElementById("password");
  const confirmpasswordInput = document.getElementById("pass");
  const togglePassword = document.getElementById("togglePassword");
  const confirmPasswordToggle = document.getElementById("confirmPassword");

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  confirmPasswordToggle.addEventListener("click", () => {
    const isPassword = confirmpasswordInput.type === "password";
    confirmpasswordInput.type = isPassword ? "text" : "password";
    confirmPasswordToggle.classList.toggle("fa-eye");
    confirmPasswordToggle.classList.toggle("fa-eye-slash");
  });

  // 🔹 Double-check password match before submitting
  form.addEventListener("submit", function (event) {
    if (passwordInput.value !== confirmpasswordInput.value) {
      event.preventDefault();
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";
    }
  });
  function showMessage(text, type) {
    messageBox.style.display = "block";
    messageBox.textContent = text;
    if (type === "success") messageBox.style.color = "green";
    else if (type === "warning") messageBox.style.color = "orange";
    else messageBox.style.color = "red";
  }

  function resetButton() {
    registerBtn.disabled = false;
    registerBtn.textContent = "Register";
  }
});
