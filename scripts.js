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

