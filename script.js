// Load audio files
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

// Play sound function
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

// Add click listeners to sound buttons
document.querySelectorAll(".sound-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        playSound(btn.getAttribute("data-sound"));

        // Ripple effect
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});





let previousVolume = volume.value; // Store last non-mute volume

// Volume slider
volume.addEventListener("input", () => {
    if (currentAudio) {
        currentAudio.volume = volume.value;

        // If user moves slider while muted → unmute
        if (currentAudio.muted) {
            currentAudio.muted = false;
            muteBtn.textContent = "Mute";
        }

        previousVolume = volume.value; // update saved volume
    }
});

// Mute button
muteBtn.addEventListener("click", () => {
    if (currentAudio) {
        if (!currentAudio.muted) {
            // Going to mute
            previousVolume = volume.value;  // save before muting
            currentAudio.muted = true;
            muteBtn.textContent = "Unmute";
            volume.value = 0;               // slider jumps to 0
        } else {
            // Unmuting
            currentAudio.muted = false;
            muteBtn.textContent = "Mute";
            volume.value = previousVolume;  // restore slider
            currentAudio.volume = previousVolume; 
        }
    }
});




// Floating Background Particles

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("bg-particle");

    // Random size
    const size = Math.random() * 12 + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    // Random animation duration
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;

    document.body.appendChild(particle);

    // Remove particle after animation ends
    setTimeout(() => particle.remove(), 12000);
}

// Create a particle every 400ms
setInterval(createParticle, 400);
