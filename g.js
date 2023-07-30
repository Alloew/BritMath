var x = [], y = [];
const c = 299792458;
const samples = 1000;

for (var i = 0; i < samples; i++) {
    var gamma = 1 /
        (Math.sqrt(1 -
            ((i * c / samples) / c) ** 2
        ));

    x.push(i * c / samples);
    y.push(gamma);
}

var trace = {
    x: x,
    y: y,
    type: 'scatter',
};

var data = [trace];

var layout = {
    title: "Lorentz Factor",
    xaxis: {
        title: "Speed (m/s)"
    },
    yaxis: {
        title: "Relativity Gamma"
    },
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
}

const plotDiv = document.getElementById("plot");
Plotly.newPlot(plotDiv, data, layout);

window.addEventListener("resize", () => {
    Plotly.update(plotDiv, {}, { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight }, [0]);
})