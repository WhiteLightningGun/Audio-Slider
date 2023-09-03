const audio1 = document.getElementById('audioElement');
const waveform = document.getElementById('waveform');
const playbtn = document.getElementById('playbtn');
const playme = document.getElementById('playme');
const unplay = document.getElementById('unplay');

playbtn.addEventListener('click', function () {
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

function get_time() {
    
    console.log(`current time ${audio1.currentTime}`);
    console.log(`audio duration total: ${audio1.duration}`);
    //audio1.currentTime = 100;

}

function set_time(time) {

    p = audio1.duration*Math.abs(time);
    audio1.currentTime = p;
}

waveform.addEventListener('mousedown', function (e) {
    let cursorXRatio = getCursorPositionRatio(e);
    //console.log(cursorXRatio);
    let percentage = cursorXRatio * 100;
    setGradient(percentage);

    set_time(cursorXRatio);

});

function getCursorPositionRatio(e) {

    const xP = e.offsetX/waveform.offsetWidth;
    return xP;
}

function setGradient(x) {
    let p = x;
    console.log(`set gradient argument is ${p} `);
    const newGrad = `linear-gradient(90deg, rgba(0,0,0,1) ${p}%, rgba(255,255,255,0) ${p}%)`;
    waveform.style.maskImage = newGrad;
    waveform.style.webkitMaskImage = newGrad;
}

setInterval(updateGrad = () => {
    let r = 100*audio1.currentTime / audio1.duration;
    setGradient(r);
}, 100)