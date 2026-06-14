// mobile nav menu

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');

 console.log(nav);

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  nav.classList.toggle('active')


  if (navLinks.classList.contains('active')) {
    menuIcon.src = '/close.png';  // show X icon
  } else {
    menuIcon.src = '/menu.png';   // show hamburger icon
  }
});