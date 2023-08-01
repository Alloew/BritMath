var lastPX = -1;
var lastPY = -1;
var lastIssX = -1;
var lastIssY = -1;

var earthRotation = 18*3.13/180;
var issRotation = 223*3.14/180;
const r = 6371;
var frames = 0;
var totalSpeed = 0;
var done = false;

var average, averageMs;

var img;

function preload() {
    img = loadImage("e.png");
}

function setup() {
    createCanvas(window.innerWidth - 1, window.innerHeight - 4);
}

function draw() {
        // One second = one hour
        var scale = (r * 2) / Math.min(window.innerHeight - 100, window.innerWidth - 100);

        //earthRotation += 360 / (24*60*60*60*60*deltaTime/1000) * PI / 180;
        //issRotation += 360 / (92.9*60*60*60*deltaTime/1000) *PI / 180; // 92.9 minute orbital period

        earthRotation=Math.random()*2*PI;
        issRotation=Math.random()*2*PI;
        background(20);
        noStroke();

        fill(55);
        ellipse(window.innerWidth / 2, window.innerHeight / 2, r * 2 / scale);
        imageMode(CENTER);
        translate(window.innerWidth / 2, window.innerHeight / 2);
        rotate(earthRotation);
        image(img, 0, 0, r * 2 / scale, r * 2 / scale);
        rotate(-earthRotation);
        translate(-window.innerWidth / 2, -window.innerHeight / 2);

        var pX = window.innerWidth / 2 + cos(earthRotation) * r / scale;
        var pY = window.innerHeight / 2 + sin(earthRotation) * r / scale;

        fill(255, 0, 0);
        ellipse(pX, pY, 12);

        var issX = window.innerWidth / 2 + cos(issRotation + earthRotation) * (r + 417) / scale;
        var issY = window.innerHeight / 2 + sin(issRotation + earthRotation) * (r + 417) / scale;

        fill(0, 255, 0);
        ellipse(issX, issY, 12);

        stroke(0, 0, 255);
        line(pX, pY, issX, issY);

        var diff = Math.sqrt(
            (Math.abs(lastPX * scale - pX * scale) - Math.abs(lastIssX * scale - issX * scale)) ** 2 + (Math.abs(lastPY * scale - pY * scale) - Math.abs(lastIssY * scale - issY * scale)) ** 2
        );

        fill(255);
        //text(issRotation * 180 / PI, 50, 50);
        noStroke();

        lastPX = pX;
        lastPY = pY;
        lastIssX = issX;
        lastIssY = issY;

        if (earthRotation <= 360 * PI / 180) {
            frames++;
            totalSpeed += diff;
            // console.log(frames);
        } else if (!done) {
            done = true;

            average = totalSpeed / frames;
            averageMs = average * 1000 / 60;
            console.log(average);
            console.log(`${averageMs}m/s`);
            alert(`Average Velocity: ${averageMs}m/s`)
        }
}

window.addEventListener("resize", () => {
    resizeCanvas(window.innerWidth - 1, window.innerHeight - 4);
});