const loginSubmit = document.getElementById('loginSubmit');
const idInput = document.getElementById('idInput');

loginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = window.location.origin + "/additional?id=" + idInput.value;
})