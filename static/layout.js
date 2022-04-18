const loginSubmit = document.getElementById("loginSubmit");
const idInput = document.getElementById("idInput");

loginSubmit.addEventListener("click", (e) => {
  /**
   * handle login click
   * redirect user with the value they entered in input box as a query parameter
   */
  e.preventDefault();
  window.location.href =
    window.location.origin + "/additional?id=" + idInput.value;
});

let expertMode = false;
const expertModeToggle = document.querySelector(".expertModeToggle");
const expertModeLogs = document.getElementById("expertModeLogs");
const dbfsLog = document.querySelector(".exml.dbfsLog");
const hzLog = document.querySelector(".exml.hzLog");

if (window.location.pathname === "/test") {
  /**
   * only bring expert mode to action while in /test path
   */
  expertModeToggle.addEventListener("change", (e) => {
    e.preventDefault();
    expertMode = !expertMode;
    if (expertMode) {
      expertModeLogs.classList.remove("d-none");
    } else {
      expertModeLogs.classList.add("d-none");
    }
  });
}
