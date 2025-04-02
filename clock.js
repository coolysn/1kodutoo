let h = document.getElementById('hours');
let m = document.getElementById('minutes');
let s = document.getElementById('seconds');
let dateElement = document.getElementById('date');
let colorPicker = document.getElementById('colorPicker');
let themeSelect = document.getElementById('themeSelect');

let monthNames = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];

function updateClock() {
    let date = new Date();
    let hourVal = date.getHours();
    let minuteVal = date.getMinutes();
    let secondVal = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    h.innerHTML = (hourVal < 10 ? "0" : "") + hourVal +":";
    m.innerHTML = (minuteVal < 10 ? "0" : "") + minuteVal + ":";
    s.innerHTML = (secondVal < 10 ? "0" : "") + secondVal;
    dateElement.innerHTML = `${day}. ${monthNames[month]} ${year}`;
}

// Värvi muutmine vastavalt RGB värvivalijale
colorPicker.addEventListener('input', function() {
    document.body.style.backgroundColor = colorPicker.value;
});

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("date");

    const fonts = [
        "Arial", "Verdana", "Tahoma", "Georgia", "Courier New", 
        "'Roboto', sans-serif", "'Open Sans', sans-serif", 
        "'Lobster', cursive", "'Pacifico', cursive", "'Press Start 2P'", "Garamond",
        "Courier New"
    ];

    function changeFont() { // Idee ja Funktsioon siit - https://stackoverflow.com/questions/21862759/how-do-i-generate-a-random-font-to-a-line-of-text-every-time-page-is-refreshed
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        textElement.style.fontFamily = randomFont;
    }

    textElement.addEventListener("click", changeFont);
});

//Teema muutmine (light või dark)
themeSelect.addEventListener('change', function() { //Chatgpt aitas teha RGB ratta ja muutmise
    if (themeSelect.value === 'dark') {
        document.body.style.color = 'limegreen';
        document.getElementById('clock-container').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('controls-container').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('themeSelect').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('colorPicker').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('scaleButton').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('scaleInput').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        document.getElementById('date').style.color = 'white';

    } else {
        document.body.style.color = 'black';
        document.getElementById('clock-container').style.backgroundColor = 'white';
        document.getElementById('controls-container').style.backgroundColor = 'white';
        document.getElementById('themeSelect').style.backgroundColor = 'white';
        document.getElementById('colorPicker').style.backgroundColor = 'white';
        document.getElementById('scaleButton').style.backgroundColor = 'white';
        document.getElementById('scaleInput').style.backgroundColor = 'white';
        document.getElementById('date').style.color = 'black';

    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        toggleMirror();
    }
});

let mirrored = false;

function toggleMirror() {
    mirrored = !mirrored;
    updateClock();
}
//Kasutasin lisaks ChatGPTle: https://stackoverflow.com/questions/49360639/how-to-reverse-characters-in-words-of-a-string-but-keep-word-order
function reverseString(str) { //ChatGPT "Too näide kuidas saab numbreid peegel pilti viia, nii et need oma kohale jäävad?"
    return str.split("").reverse().join(""); 
}

function updateClock() {
    let date = new Date();
    let hourVal = date.getHours().toString().padStart(2, "0"); //padStart() kasutuse leidsin chatGPT näite kaudu
    let minuteVal = date.getMinutes().toString().padStart(2, "0");
    let secondVal = date.getSeconds().toString().padStart(2, "0");

    if (mirrored) {
        h.innerHTML = reverseString(hourVal) + ":";
        m.innerHTML = reverseString(minuteVal) + ":";
        s.innerHTML = reverseString(secondVal);
    } else {
        h.innerHTML = hourVal + ":";
        m.innerHTML = minuteVal + ":";
        s.innerHTML = secondVal;
    }

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    dateElement.innerHTML = `${day}. ${monthNames[month]} ${year}`;
}
//ChatGPT "Mida siin 'applyScale' osas parandada, et jääks scale scrollwheeliga keskele, kas peab olema conteiner või clock-conteiner?"
let container = document.getElementById('container');
let scaleInput = document.getElementById('scaleInput');
let applyScaleButton = document.getElementById('scaleButton');
let scale = 1;

function applyScale(newScale) {
    scale = Math.max(0.3, Math.min(newScale, 1.5));
    container.style.transform = `translate(-50%, -50%) scale(${scale})`;

}

container.addEventListener("wheel", function(event) {
    event.preventDefault();// ChatGPT - Kuidas teha nii, et scrollimisega ei liiguks leht kaasa?
    //ChatGPT - Kuidas teha nii, et containeri scale liiguks scrollwheeliga vastavalt ekraanile?
    let zoomFactor = event.deltaY < 0 ? 0.1 : -0.1; 
    applyScale(scale + zoomFactor);
});

applyScaleButton.addEventListener("click", function() {
    let userScale = parseInt(scaleInput.value, 10);
    if (isNaN(userScale)) return;
    applyScale(userScale / 100);
});

//ChatGPT "Kuidas hoida keskel containerit kui selle scalei muuta protsentidega," 
window.addEventListener("resize", function () {
    container.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

document.addEventListener("keydown", function(event) {
    if (event.key === "f") {
        toggleFullscreen();
    }
});

//https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
function toggleFullscreen() {  
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            document.body.classList.add("fullscreen");//https://www.w3schools.com/jsref/prop_element_classlist.asp
        });
    } else {
        document.exitFullscreen().then(() => {
            document.body.classList.remove("fullscreen");
        });
    }
}

//choose color style background: add or remove gradient nt

setInterval(updateClock, 1000);
updateClock();
