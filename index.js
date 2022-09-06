const root = document.documentElement;
const buttonBorderColor1Hue = 250;
const buttonBorderColor2Hue = 360;
const maxHueShift = 30;

// root.addEventListener("mousemove", e => {
//   root.style.setProperty('--mouse-x', e.clientX + "px");
//   root.style.setProperty('--mouse-y', e.clientY + "px");
// });

window.onmousemove = (e) => {
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
}

window.onload = () => {
    root.style.setProperty("--button-border-color1", `hsl(${buttonBorderColor1Hue}deg, 75%, 60%)`);
    root.style.setProperty("--button-border-color2", `hsl(${buttonBorderColor2Hue}deg, 75%, 60%)`);
}