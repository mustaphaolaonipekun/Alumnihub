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
    });
