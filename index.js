const root = document.documentElement;
const buttonBorderColor1Hue = 250;
const buttonBorderColor2Hue = 360;
const maxHueShift = 30;
const maxStarSize = Math.min(window.innerWidth, window.innerHeight)/300;
const maxStarMove = 30;
const starBorder = maxStarSize;
var stars = [];

var lastMousePos = {x: 0, y: 0}

// root.addEventListener("mousemove", e => {
//   root.style.setProperty('--mouse-x', e.clientX + "px");
//   root.style.setProperty('--mouse-y', e.clientY + "px");
// });

const createStars = (numStars) => {
    const starsContainer = document.querySelector(".stars-container");
    for (let i = 0; i < numStars; i++) {
        const newStar = document.createElement("div");
        const xPos = starBorder + Math.random() * (window.innerWidth - starBorder*2);
        const yPos = starBorder + Math.random() * (window.innerHeight * 0.8 - starBorder*2);
        const size = Math.random() * maxStarSize;

        newStar.className = "star";
        newStar.style = `position: absolute; left: ${xPos}px; top: ${yPos}px; width: ${size}px; height: ${size}px;\
        box-shadow: 0 0 ${size/2}px ${size}px white`;
        starsContainer.appendChild(newStar);
        stars.push({
            startPos: {x: xPos, y: yPos},
            pos: {x: xPos, y: yPos},
            size: size,
            div: newStar
        });
    }
}

const handleMouseMove = e => {
    const buttons = document.querySelectorAll(".navbar-button-border");
    const angle = 60 + 360 * 2 * (0.5 - e.clientY / window.innerHeight);
    const hueShift = maxHueShift * (0.5 - e.clientX / window.innerWidth);
    const hue1 = (buttonBorderColor1Hue + hueShift) % 360;
    const hue2 = (buttonBorderColor2Hue - hueShift) % 360;
    buttons.forEach(button => {
        button.style.backgroundImage = `linear-gradient(${angle % 360}deg, var(--button-border-color1), var(--button-border-color2))`;
    })
    root.style.setProperty("--button-border-color1", `hsl(${hue1}deg, 75%, 60%)`);
    root.style.setProperty("--button-border-color2", `hsl(${hue2}deg, 75%, 60%)`);

    const mouseX = 0.5 - e.clientX / window.innerWidth;
    const mouseY = 0.5 - e.clientY / window.innerHeight;
    stars.forEach(star => {
        star.pos.x = mouseX * maxStarMove * (star.size/maxStarSize) ** 2;
        star.pos.y = mouseY * maxStarMove * (star.size/maxStarSize) ** 2;
        star.div.style.left = `${Math.min(Math.max(star.startPos.x - star.pos.x, starBorder), window.innerWidth - starBorder)}px`;
        star.div.style.top = `${Math.min(Math.max(star.startPos.y - star.pos.y, starBorder), window.innerHeight - starBorder)}px`;
    })
}

window.onmousemove = handleMouseMove;

window.onload = () => {
    root.style.setProperty("--button-border-color1", `hsl(${buttonBorderColor1Hue}deg, 75%, 60%)`);
    root.style.setProperty("--button-border-color2", `hsl(${buttonBorderColor2Hue}deg, 75%, 60%)`);

    createStars(100);

    const navbarChildren = Array.from(document.querySelector(".navbar").children);
    console.log(navbarChildren);
    let i = 0.5;
    navbarChildren.forEach(child => {
        child.style.animation = `fadeIn 1s ${i}s forwards`
        i += 0.5;
    })
    handleMouseMove();
}