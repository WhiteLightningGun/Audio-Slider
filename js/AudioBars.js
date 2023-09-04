const audio1 = document.getElementById('audioElement');
const waveform = document.getElementById('waveform');
const playbtn = document.getElementById('playbtn');
const playme = document.getElementById('playme');
const unplay = document.getElementById('unplay');

playbtn.addEventListener('click', function () {
    //Controls audio playback using the playbtn element

    audio1.paused ? audio1.play() : audio1.pause();

    if (unplay.hidden) {
        playme.style.display = "none";
        unplay.hidden = false;
    }
    else {
        playme.style.display = "";
        unplay.hidden = true;
    }
})

waveform.addEventListener('mousedown', function (e) {
    //Grabs the horizontal x-position of the click as a percentage of total element width and
    //uses this percentage to control gradient position and song playback position
    let xPercent = 100*e.offsetX / waveform.offsetWidth;
    console.log(xPercent);
    setGradient(xPercent);
    audio1.currentTime = audio1.duration*Math.abs(xPercent/100);
});

setInterval(updateGrad = () => {
    //updates the gradient 10 times per second to reflect current song play back position
    let timePercentage = 100*audio1.currentTime / audio1.duration;
    setGradient(timePercentage);
}, 100)

function setGradient(percent) {

    const newGrad = `linear-gradient(90deg, rgba(0,0,0,1) ${percent}%, rgba(255,255,255,0) ${percent}%)`;
    waveform.style.maskImage = newGrad;
    waveform.style.webkitMaskImage = newGrad; //For Chrome Compatibility
}