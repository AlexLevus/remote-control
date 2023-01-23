import {Point} from "@nut-tree/nut-js";

const calculateCirclePoints = (centerPoint: Point, radius: number, pointsCount: number) => {
    const points = [];
    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * 2 * Math.PI;
        const x = centerPoint.x + radius * Math.cos(angle);
        const y = centerPoint.y + radius * Math.sin(angle);
        points.push(new Point(x, y));
    }
    points.push(points[1])

    return points;
}

export { calculateCirclePoints }