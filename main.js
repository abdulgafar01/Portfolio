const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav-ul')

hamburger.addEventListener('click',()=>{
    nav.classList.toggle('show');
})
