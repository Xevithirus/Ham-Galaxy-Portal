//------------------------------- PARALLAX IMAGE BAR ------------------------------------
const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
    const limitedNextPercentage = Math.min(0, Math.max(-100, nextPercentage));

    track.dataset.percentage = limitedNextPercentage;

    track.animate({
        transform: `translate(${limitedNextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + limitedNextPercentage}% Center`
        }, { duration: 1200, fill: "forwards" });
    }
}