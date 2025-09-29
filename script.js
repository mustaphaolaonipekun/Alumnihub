

document.addEventListener("DOMContentLoaded", function () {
document.getElementById("formSignup").addEventListener("submit", async function (e) {
  e.preventDefault();
  
    console.log("✅ Form submitted");

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
    photoMimeType: "", // leave empty if not using profile photo
    photo: "" // leave empty if no profile image
  };

  console.log("📤 Sending payload:", payload);

  try {
    const response = await fetch("https://alumnihub.azurewebsites.net/auth/emails/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("📥 API Response:", result);

    if (response.ok) {
      window.location.href = "accountcreated.html";
    } else {
      alert("❌ Signup failed: " + (result.message || "Unknown error. Check console."));
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    alert("⚠️ Network error. Please try again later.");
  }
});
const passwordInput = document.getElementById("password");
const confirmpasswordInput = document.getElementById("pass");

const togglePassword = document.getElementById("togglePassword");
const confirmPassword = document.getElementById("confirmPassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

confirmPassword.addEventListener("click", () => {
  const isPassword = confirmpasswordInput.type === "password";
  confirmpasswordInput.type = isPassword ? "text" : "password";

  confirmPassword.classList.toggle("fa-eye");
  confirmPassword.classList.toggle("fa-eye-slash");
});

 const form = document.getElementById("formSignup");
    const password = document.getElementById("password");
    const confirmPasswords = document.getElementById("pass");
    const error = document.getElementById("error");

    form.addEventListener("submit", function(event) {
      if (password.value !== confirmPasswords.value) {
        event.preventDefault(); 
        error.style.display = "block";
      } else {
        error.style.display = "none"; 
      }
    });});



