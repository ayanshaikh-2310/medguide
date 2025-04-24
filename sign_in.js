
const spinner = document.getElementById('spinner');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const btn_cnt = document.getElementById('btn_cnt');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});


document.getElementById("email-form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent real form submission
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    const storedPassword = localStorage.getItem(email, password);

    if (!storedPassword) {
        const errmsg = document.getElementById('email-error');
        errmsg.innerHTML = '*Email not found. Please sign up first.';
        // alert("Email not found. Please sign up first.");
        return;
    }

    if (storedPassword !== password) {
        const err = document.getElementById('password-error');
        err.innerHTML = '*password does not match';
        return;
    }

    spinner.style.display = 'block'; // show spinner
    const err = document.getElementById('password-error');
    err.innerHTML = '';
    localStorage.getItem(email, password);

    setTimeout(() => {
        // After 1 second, hide spinner and redirect
        spinner.style.display = 'none';
        window.location.href = 'dashboard.html';
    }, 1500);
});





