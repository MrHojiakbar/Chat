const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = e.target.name.value;
  localStorage.setItem("name", name);
  window.location.href = "/";
});
