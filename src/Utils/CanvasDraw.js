import { findDist } from "./Formulas.js";

function drawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.arc(circle.curr.x, circle.curr.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

export function animateAll(canvas, circleList) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleList.forEach((circle) => {
        const dist = findDist(circle.curr, circle.goal);
        if (dist.x > 0.01 * Math.abs(circle.velocity.x) && dist.y > 0.01 * Math.abs(circle.velocity.y)) {
            circle.curr.x += circle.velocity.x;
            circle.curr.y += circle.velocity.y;
        }
        drawCircle(ctx, circle);
    });
    requestAnimationFrame(() => animateAll(canvas, circleList));
}

export function createProgramCircles() {
    const x_pos_list = [200, 600, 1000, 1400];
    const y_pos_list = [90, 225, 360, 495, 630];
    const circleList = [];

    for (let xi = 0; xi < x_pos_list.length; xi++) {
        for (let yi = 0; yi < y_pos_list.length; yi++) {
            const x = x_pos_list[xi];
            const y = y_pos_list[yi];
            const pos = {x : x, y : y};
            const id = circleList.length + 1;
            const circle = {id : id, curr : pos, goal : pos, velocity : {x : 0, y : 0}, radius: 50, color : "blue"};
            circleList.push(circle);
        }
    }
    return circleList;
}


export function createApplicantCircles() {
    // radius of 5
    const circleList = [];
    for (let yi = 1; yi < 13; yi++) {
        for (let xi = 1; xi < 56; xi++) {
            const x = 230 + 20 * xi;
            const y = 720 + 20 * yi;
            const id = circleList.length + 1;
            const startPos = {x : x, y : y};
            const circle = {id : id, curr : startPos, goal : startPos, velocity : {x : 0, y : 0}, radius : 10, color : "gray"};
            circleList.push(circle);
        }
    }
    return circleList;
}
