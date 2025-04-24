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
    e.preventDefault();

    e.preventDefault(); // prevent real form submission
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    if (!email || !password || !confirm) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirm) {
        const err = document.getElementById('password-error');
        err.innerHTML = '*password does not match';
        return;
    }

    spinner.style.display = 'block';
    const err = document.getElementById('password-error');
    err.innerHTML = '';// show spinner
    localStorage.setItem(email, password);

    setTimeout(() => {
        // After 1 second, hide spinner and redirect
        spinner.style.display = 'none';
        window.location.href = 'sign_in.html'; // change this to your sign-in page
    }, 1500);
});


