document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formSignup");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
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
});
