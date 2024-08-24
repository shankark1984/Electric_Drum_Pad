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

document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', () => playSound(pad.dataset.key));
});

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (sounds[key]) {
        playSound(key);
    }
});

function playSound(key) {
    const audio = sounds[key];
    audio.currentTime = 0; // Rewind to the start
    audio.play();
}
