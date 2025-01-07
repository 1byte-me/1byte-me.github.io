// Hide Header on scroll down
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const delta = 5;
const navbarHeight = header.offsetHeight;

window.addEventListener('scroll', function () {
    const st = window.scrollY;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        header.classList.add('nav-up');
    } else {
        // Scroll Up
        if (st + window.innerHeight < document.documentElement.scrollHeight) {
            header.classList.remove('nav-up');
        }
    }

    lastScrollTop = st;
}); 