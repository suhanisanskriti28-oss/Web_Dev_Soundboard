
const sounds = {
    dog: new Audio("sounds/dog.mp3"),
    clap: new Audio("sounds/clap.mp3"),
    pop: new Audio("sounds/pop.mp3"),
    laugh: new Audio("sounds/laugh.mp3"),
    ocean: new Audio("sounds/ocean.mp3"),
    birds: new Audio("sounds/birds.mp3")
};

let currentAudio = null;


const volume = document.getElementById("volume-slider");
const muteBtn = document.getElementById("mute-btn");


function playSound(name) {
    const audio = sounds[name];

    if (!audio) return;

    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = audio;
    audio.currentTime = 0;
    audio.volume = volume.value;
    audio.play();
}


document.querySelectorAll(".sound-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        playSound(btn.getAttribute("data-sound"));

        
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

let previousVolume = volume.value; 

volume.addEventListener("input", () => {
    if (currentAudio) {
        currentAudio.volume = volume.value;

        
        if (currentAudio.muted) {
            currentAudio.muted = false;
            muteBtn.textContent = "Mute";
        }

        previousVolume = volume.value; 
    }
});


muteBtn.addEventListener("click", () => {
    if (currentAudio) {
        if (!currentAudio.muted) {
          
            previousVolume = volume.value;  
            currentAudio.muted = true;
            muteBtn.textContent = "Unmute";
            volume.value = 0;               
        } else {
            
            currentAudio.muted = false;
            muteBtn.textContent = "Mute";
            volume.value = previousVolume; 
            currentAudio.volume = previousVolume; 
        }
    }
});


function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("bg-particle");
    const size = Math.random() * 12 + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;

    document.body.appendChild(particle);

    
    setTimeout(() => particle.remove(), 12000);
}


setInterval(createParticle, 400);
