const form_relativisticGamma = document.getElementById("relativisticGamma");
const input_velocity = document.getElementById("velocityInput");
const span_result = document.getElementById("result");
const select_type = document.getElementById("type");
const inputArea = document.getElementById("inputArea");
const input_percent = document.getElementById("percentInput");
const label_percent = document.getElementById("percentLabel");
const input_gamma = document.getElementById("gammaInput");
const percentMono = document.getElementById("percentMono");

const div_vel = document.getElementById("vel");
const div_light = document.getElementById("light");
const div_gamma = document.getElementById("gamma");

const c = 299792458;

input_velocity.addEventListener("input", (e) => {
    gamma();
});

input_percent.addEventListener("input", () => {
    light();
});

input_gamma.addEventListener("input", () => {
    v2 = c ** 2 - (c / parseFloat(input_gamma.value)) ** 2;
    v = Math.sqrt(v2);

    vel = Qty(v, "m/s");
    span_result.innerText = `${parseFloat(vel.to("m/s")).toLocaleString()} ${"m/s"}
    ${parseFloat(vel.to("mph")).toLocaleString()} ${"mph"}
    ${parseFloat(vel.to("kph")).toLocaleString()} ${"kph"}
    ${parseFloat(vel.to("mi/s")).toLocaleString()} ${"mi/s"}
    ${parseFloat(vel.to("km/s")).toLocaleString()} ${"km/s"}`;
});

select_type.addEventListener("change", () => {
    if (select_type.value == "percent") {
        div_light.style.display = "flex";
        div_vel.style.display = "none";
        div_gamma.style.display = "none";
    } else if (select_type.value == "speed") {
        div_light.style.display = "none";
        div_vel.style.display = "flex";
        div_gamma.style.display = "none";
    } else if (select_type.value == "gamma") {
        div_light.style.display = "none";
        div_vel.style.display = "none";
        div_gamma.style.display = "flex";
    } else if (select_type.value == "graph") {
        window.location.href = "/g";
    } else {
        window.location.href = "/orbit";
    }
});

function gamma() {
    valid = true;
    var vel = Qty.parse(input_velocity.value);

    if (!vel) {
        valid = false;
    } else if (vel.kind() != "speed") {
        valid = false;
    }

    if (valid) {
        vel = vel.to("m/s"); // To meters per second

        y = 1 /
            (Math.sqrt(1 -
                (parseFloat(vel.toString()) / c) ** 2
            ));

        span_result.innerText = `Relativistic Gamma: ${y}`;
        input_velocity.style.color = "#1cb300";
    } else {
        input_velocity.style.color = "red";
    }
}

function light() {
    percentMono.innerText = `${parseFloat(input_percent.value).toFixed(5)}%`;

    var vel = Qty(`${parseFloat(input_percent.value) / 100 * c} m/s`);

    valid = true;

    if (!vel) {
        valid = false;
    } else if (vel.kind() != "speed") {
        valid = false;
    }

    if (valid) {
        vel = vel.to("m/s"); // To meters per second

        y = 1 /
            (Math.sqrt(1 -
                (parseFloat(vel.toString()) / c) ** 2
            ));

        span_result.innerText = `Relativistic Gamma: ${y}`;
        input_velocity.style.color = "#1cb300";
    } else {
        input_velocity.style.color = "red";
    }
}