export function calculateVelocity(circle) {
    const p2 = circle.curr;
    const p1 = circle.goal;
    const xDist = p1.x - p2.x;
    const yDist = p1.y - p2.y;
    const velocityObj = {
        x : xDist / 60.0,
        y : yDist / 60.0
    }
    return velocityObj;
}

export function findDist(p1, p2) {
    const xDist = Math.abs(p1.x - p2.x);
    const yDist = Math.abs(p1.y - p2.y);
    return {x : xDist, y : yDist};
}
