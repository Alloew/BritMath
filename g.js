var x = [], y = [];
const c = 299792458;

for (var i = 0; i < c / 1000000; i++) {
    var gamma = 1 /
        (Math.sqrt(1 -
            ((i * 1000000) / c) ** 2
        ));

    x.push(i * 1000000);
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
    margin: {
        pad: 24,
    }
}

Plotly.newPlot("plot", data, layout);