
document.querySelector("#button-1").onclick = () => {
    
}

const appHeight = () => {
    root.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

if (isOnMobileOrTablet()) { 
let i = 0;
const navbarChildren = Array.from(document.querySelector(".navbar").children);
const buttonRotationLoop = setInterval(() => {
    document.querySelector("#view-on-desktop").style.display = "block";
    let n = 0;
    navbarChildren.forEach(child => {
        child.style.backgroundImage = `linear-gradient(${i + n * 43}deg, var(--button-border-color1), var(--button-border-color2))`; 
        child.style.padding = "2px"; 
        n++      
    })
    i += 3;
}, 1);
}