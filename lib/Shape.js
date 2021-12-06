export default class Shape {
    // Each point consist 5 attribute: x, y, r, g, b
    points = [];
    min_x = -1.0;
    min_y = -1.0;
    max_x = 1.0;
    max_y = 1.0;
    centroid = [0.0, 0.0]
    constructor(min_x, min_y, max_x, max_y, ) {
        this.min_x = min_x;
        this.min_y = min_y;
        this.max_x = max_x;
        this.max_y = max_y;
    }
    add(x, y, r, g, b) {
        // Normalize points
        x = -1.0 + (2.0/(this.max_x - this.min_x))*x;
        y = -1.0 + (2.0/(this.max_y - this.min_y))*y;
        this.centroid[0] = (this.centroid[0] + x) / 2;
        this.centroid[1] = (this.centroid[1] + y) / 2;
        this.points.push(x);
        this.points.push(y);
        this.points.push(r);
        this.points.push(g);
        this.points.push(b);
    }
    resize(scale) {
        for (var i = 0; i < this.points.length / 5; i++) {
            this.points[i*5] *= scale;
            this.points[i*5+1] *= scale;
        }
    }
    translate(x, y) {
        for (var i = 0; i < this.points.length / 5; i++) {
            this.points[i*5] += x;
            this.points[i*5+1] += y;
        }
    }
    getPoints() {
        return this.points;
    }
    getCentroid() {
        return this.centroid;
    }
}