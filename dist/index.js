'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function rotate(v, theta) {
    return [
        v[0] * Math.cos(theta) - v[1] * Math.sin(theta),
        v[0] * Math.sin(theta) + v[1] * Math.cos(theta),
    ];
}
function distance(point1, point2) {
    const distanceX = point1[0] - point2[0];
    const distanceY = point1[1] - point2[1];
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

var _Circle_instances, _Circle_draw;
const canvasEl = document.getElementById("canvas");
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;
const ctx = canvasEl.getContext("2d");
class Phys {
    constructor(updateCb, circle) {
        this.update = updateCb.bind(circle);
    }
}
class Circle {
    constructor(x, y, radius, dx, dy, color) {
        _Circle_instances.add(this);
        this.phys = null;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    distance(circle) {
        return distance([this.x, this.y], [circle.x, circle.y]);
    }
    setPhys(updateCb) {
        this.phys = new Phys(updateCb, this);
    }
    update(elapsed) {
        var _a;
        (_a = this.phys) === null || _a === void 0 ? void 0 : _a.update(elapsed);
        __classPrivateFieldGet(this, _Circle_instances, "m", _Circle_draw).call(this);
    }
}
_Circle_instances = new WeakSet(), _Circle_draw = function _Circle_draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color + "80";
    ctx.strokeStyle = this.color;
    ctx.fill();
    ctx.stroke();
};

function randomX() {
    return Math.random() * canvasEl.width;
}
function randomY() {
    return Math.random() * canvasEl.height;
}
function randomSpeed() {
    return Math.floor(Math.random() * 10 - 5);
}
function randomColor() {
    const colors = [
        "#ffd152",
        "#ff7e57",
        "#c8fa64",
        "#64fadf",
        "#647dfa",
        "#cb64fa",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

const G = 0.3;
const Fr = 0.9;
const circles$1 = [];
let start$1 = -1;
window.addEventListener("click", function (event) {
    start$1 = -1;
    const circle = new Circle(event.x, event.y, 30, randomSpeed(), 0, randomColor());
    circle.setPhys(function (elapsed) {
        const width = canvasEl.width;
        const height = canvasEl.height;
        if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.dx = -(this.dx * Fr);
        }
        if (this.x + this.radius > width) {
            this.x = width - this.radius;
        }
        if (this.x - this.radius < 0) {
            this.x = this.radius;
        }
        if (this.y + this.radius >= height || this.y - this.radius <= 0) {
            this.dy = -(this.dy * Fr);
            this.dx = this.dx * Fr;
        }
        if (this.y + this.radius > height) {
            this.y = height - this.radius;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
        }
        this.dy += G;
        this.x += this.dx;
        this.y += this.dy;
    });
    circles$1.push(circle);
});
function animateGravity(timeStamp) {
    canvasEl.style.display = "block";
    if (start$1 === -1) {
        start$1 = timeStamp;
    }
    const elapsed = timeStamp - start$1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let circle of circles$1) {
        circle.update(elapsed);
    }
    requestAnimationFrame(animateGravity);
}

const NUMBER_OF_CIRCLES = 2;
const circles = [];
let start = -1;
function updatePhysCb() {
    const width = canvasEl.width;
    const height = canvasEl.height;
    for (let circle of circles) {
        if (this.distance(circle) < this.radius + circle.radius) {
            const relativeVelocity = [this.dx - circle.dx, this.dy - circle.dy];
            const relativePosition = [circle.x - this.x, circle.y - this.y];
            const dotProduct = relativeVelocity[0] * relativePosition[0] +
                relativeVelocity[1] * relativePosition[1];
            if (dotProduct >= 0) {
                const angleOfContact = -Math.atan2(relativePosition[1], relativePosition[0]);
                const rotatedThisVelocity = rotate([this.dx, this.dy], angleOfContact);
                const rotatedCircleVelocity = rotate([circle.dx, circle.dy], angleOfContact);
                const thisVelocityAfterCollision = rotate([rotatedCircleVelocity[0], rotatedThisVelocity[1]], -angleOfContact);
                const circleVelocityAfterCollision = rotate([rotatedThisVelocity[0], rotatedCircleVelocity[1]], -angleOfContact);
                this.dx = thisVelocityAfterCollision[0];
                this.dy = thisVelocityAfterCollision[1];
                circle.dx = circleVelocityAfterCollision[0];
                circle.dy = circleVelocityAfterCollision[1];
            }
        }
    }
    const other = circles.find((c) => c !== this);
    const futureX = this.x + this.dx;
    const futureY = this.y + this.dy;
    if (Math.sqrt((futureX - other.x) ** 2 + (futureY - other.y) ** 2) <
        this.radius + other.radius) {
        const otherDx = other.dx;
        const otherDy = other.dy;
        const angleOfContact = Math.acos((other.x - this.x) /
            Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2));
        const otherAngle = Math.acos(otherDx / Math.sqrt(otherDx ** 2 + otherDy ** 2));
        const thisAngle = Math.acos(this.dx / Math.sqrt(this.dx ** 2 + this.dy ** 2));
        const thisDFactor1 = Math.cos(thisAngle - angleOfContact) * Math.cos(angleOfContact);
        const otherDFactor1 = Math.sin(otherAngle - angleOfContact);
        other.dx = thisDFactor1 * this.dx + otherDFactor1 * otherDx;
        other.dy = thisDFactor1 * this.dy + otherDFactor1 * otherDy;
        const thisDFactor2 = Math.cos(otherAngle - angleOfContact) * Math.cos(angleOfContact);
        const otherDFactor2 = Math.sin(thisAngle - angleOfContact);
        this.dx = thisDFactor2 * otherDx + otherDFactor2 * this.dx;
        this.dy = thisDFactor2 * otherDy + otherDFactor2 * this.dy;
    }
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
        this.dx = -this.dx;
    }
    if (this.x + this.radius > width) {
        this.x = width - this.radius;
    }
    if (this.x - this.radius < 0) {
        this.x = this.radius;
    }
    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
        this.dy = -this.dy;
    }
    if (this.y + this.radius > height) {
        this.y = height - this.radius;
    }
    if (this.y - this.radius < 0) {
        this.y = this.radius;
    }
    this.x += this.dx;
    this.y += this.dy;
}
function init() {
    start = -1;
    for (let i of Array(NUMBER_OF_CIRCLES)) {
        const circle = new Circle(randomX(), randomY(), 50, randomSpeed(), randomSpeed(), randomColor());
        circle.setPhys(updatePhysCb);
        circles.push(circle);
    }
}
function animateGas(timeStamp) {
    canvasEl.style.display = "block";
    if (start === -1) {
        start = timeStamp;
    }
    const elapsed = timeStamp - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let circle of circles) {
        circle.update(elapsed);
    }
    requestAnimationFrame(animateGas);
}
init();

const menu = document.getElementById("menu");
const gravity = document.getElementById("gravity");
const gas = document.getElementById("gas");
gravity.addEventListener("click", () => {
    menu.style.display = "none";
    animateGravity(0);
});
gas.addEventListener("click", () => {
    menu.style.display = "none";
    animateGas(0);
});
