// for navigation scroll

window.addEventListener('scroll', ()=> {
    document.querySelector('nav').
    classList.toggle('window-scroll',window.scrollY > 0)
})


// ============= script for dark mode toggle =======*/


const darkmode = document.getElementById('darkmode')
const bulbGlow = document.getElementById('glow')
const darkTheme = 'dark-theme';
let audio = document.getElementById('audio')


// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  
}


darkmode.addEventListener('click', () => {
     document.body.classList.toggle(darkTheme)
  let current =  document.body.classList.contains(darkTheme)
    current ? bulbGlow.style.visibility = "visible" : bulbGlow.style.visibility = "hidden";
    audio.play()
   


    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    console.log(localStorage.getItem('selected-theme'), document.body.classList.contains(darkTheme))
})




/* ========== For Active and curent link in the desktop and mobile version*/


const navMenuLink = document.querySelectorAll(".nav__menu a")
const navItems = document.querySelectorAll('.navigation__tab-item')

navItems.forEach((tab, index) => {
    tab.addEventListener("click", ()=>{
        navItems.forEach((item) => {
            item.classList.remove('active');
        })
        tab.classList.add('active');
     }) 
}) 

navMenuLink.forEach((link,index) => {
  link.addEventListener("click", ()=>{
    navMenuLink.forEach((anchor) => {
      anchor.classList.remove("current")
    })
    link.classList.add("current")
  })
})

console.log(navMenuLink)



// For service Section

let cards = document.querySelectorAll(".card");

const rotateCards = ()=> {
    let angle = 0;
    cards.forEach((card, index) => {
        if(card.classList.contains("away")){
            card.style.transform = `translateY(-120vh) rotate(-48deg)`
        }
        else{
            card.style.transform = `rotate(${angle}deg)`;
            angle =  angle - 10;
            card.style.zIndex = (cards.length - index);

        }
  
    });
   
}




let stackArea = document.querySelector(".stackarea")
let mobileArea = document.querySelector(".mobileArea")


    
    window.addEventListener("scroll", () => {

        let topVal = 0;
            if(window.innerWidth < 600){
            topVal = mobileArea.getBoundingClientRect().top;
                
            }
            else{
                topVal = stackArea.getBoundingClientRect().top;
                }


        let distance = window.innerHeight/2;
        let index = -1 * (topVal/distance + 1)
        index = Math.floor(index)
    
        for(let i = 0; i<cards.length; i++){
            if(i <= index){
                cards[i].classList.add("away")
            }
            else{
                cards[i].classList.remove("away")
            }
        }
    
        rotateCards()
    
    })




    // ========================/*
    // function for portfolio section scroll    ===============            
    // 
    // 
    // ================
    // 
    // **/

    document.addEventListener("scroll", ()=>{
        let projects = document.querySelectorAll('.portfolio__project');
    
    function scaleProjectPair(firstIndex, secondIndex, scaleIndex) {
        let firstProject = projects[firstIndex];
        let secondProject = projects[secondIndex];
        let scale = 0.95;
        
        if (secondProject.getBoundingClientRect().top < firstProject.offsetHeight) {
            firstProject.style.transform = `scale(${scale})`;
        } else {
            firstProject.style.transform = 'scale(1)';
        }
    }
    
    for (let i = 0; i < projects.length - 1; i++) {
        scaleProjectPair(i, i + 1);
    }
    
    })
    