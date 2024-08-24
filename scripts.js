// Define sounds
const sounds = {
    Q: new Audio('sounds/kick.wav'),
    W: new Audio('sounds/snare.wav'),
    E: new Audio('sounds/hihat.wav'),
    A: new Audio('sounds/tom1.wav'),
    S: new Audio('sounds/tom2.wav'),
    D: new Audio('sounds/tom3.wav'),
    Z: new Audio('sounds/crash.wav'),
    X: new Audio('sounds/ride.wav'),
    C: new Audio('sounds/clap.wav'),
    V: new Audio('sounds/hhopen.wav')
};

// Add event listeners to drum pads
document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', () => playSound(pad.dataset.key));
});

// Add event listener for keyboard presses
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (sounds[key]) {
        playSound(key);
    }
});

// Function to play sound
function playSound(key) {
    const audio = sounds[key];
    if (audio) {
        audio.currentTime = 0; // Rewind to the start
        audio.play().catch(error => {
            console.error('Audio play error:', error);
        });
    }
}

// Function to open fullscreen
function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

// Automatically request fullscreen on page load
document.addEventListener('DOMContentLoaded', () => {
    openFullscreen();
});

// Re-request fullscreen if exiting
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        openFullscreen();
    }
});

// Handle fullscreen errors (e.g., due to user gestures)
document.addEventListener('fullscreenerror', () => {
    console.error('Failed to enter fullscreen mode.');
});
