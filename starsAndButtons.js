const root = document.documentElement;
const buttonBorderColor1Hue = 250;
const buttonBorderColor2Hue = 360;
const maxHueShift = 30;
const canvasScale = 3;
const maxStarSize = Math.min(window.innerWidth, window.innerHeight)/300 * canvasScale;
const maxStarMove = window.innerWidth/3;
const starBorder = maxStarSize;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
const nameTitle = document.querySelector(".name-title");
const nameTitleMove = 130;
var stars = [];

const drawStar =(x, y, size) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

const clearCanvas = () => {
    canvas.width = window.innerWidth * canvasScale;
    canvas.height = window.innerHeight * 0.8 * canvasScale;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawStars = (mousePos) => {
    ctx.fillStyle = "white";
    stars.forEach(star => {
        star.pos.x = mousePos.x * maxStarMove * (star.size/maxStarSize ** 2) * canvasScale;
        star.pos.y = mousePos.y * maxStarMove * (star.size/maxStarSize ** 2) * canvasScale;
        drawStar(star.startPos.x * canvasScale + star.pos.x, star.startPos.y * canvasScale + star.pos.y, star.size);
    })
}

const createStars = (numStars) => {
    for (let i = 0; i < numStars; i++) {
        const xPos = starBorder + Math.random() * (window.innerWidth - starBorder*2);
        const yPos = starBorder + Math.random() * (window.innerHeight * 0.8 - starBorder*2);
        const size = Math.random() * maxStarSize;

        stars.push({
            startPos: {x: xPos, y: yPos},
            pos: {x: xPos, y: yPos},
            size: size,
        });
        drawStar(xPos * canvasScale, yPos * canvasScale, size);
    }
}

const resetStarPos = () => {
    clearCanvas();
    drawStars({x: 0, y: 0});
    nameTitle.style = `transform: translate(0)`;
}

const handleMouseMove = e => {
    if (isOnMobileOrTablet())
        return;
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
    if (window.scrollY < window.innerHeight * 0.8) {
        clearCanvas();
        drawStars({x: mouseX, y: mouseY});
        nameTitle.style = `transform: translate(${mouseX * nameTitleMove}px, ${mouseY * nameTitleMove}px)`;
    }
}

window.onload = () => {
    root.style.setProperty("--button-border-color1", `hsl(${buttonBorderColor1Hue}deg, 75%, 60%)`);
    root.style.setProperty("--button-border-color2", `hsl(${buttonBorderColor2Hue}deg, 75%, 60%)`);

    clearCanvas();
    createStars(200);
    const navbarChildren = Array.from(document.querySelector(".navbar").children);
    let i = 0.5;
    navbarChildren.forEach(child => {
        child.style.animation = `fadeIn 1s ${i}s forwards`
        i += 0.5;
    })
    // handleMouseMove({clientY: 0, clientX: 0});
}

window.onmousemove = handleMouseMove
