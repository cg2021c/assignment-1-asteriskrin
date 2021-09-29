export default class ShapeGroup {
    shapes = [];
    centroid = [0.0, 0.0];
    constructor() {}
    addShape(shape) {
        this.shapes.push(shape);
        let shapeCentroid = shape.getCentroid();
        this.centroid[0] = (this.centroid[0] + shapeCentroid[0]) / 2;
        this.centroid[1] = (this.centroid[1] + shapeCentroid[1]) / 2;
    }
    resize(scale) {
        this.shapes.forEach((shape, i) => {
            shape.resize(scale);
        });
        this.centroid[0] *= scale;
        this.centroid[1] *= scale;
    }
    translate(x, y) {
        this.shapes.forEach((shape, i) => {
            shape.translate(x, y);
        });
        this.centroid[0] += x;
        this.centroid[1] += y;
    }
    getShapes() {
        return this.shapes;
    }
    getCentroid() {
        return this.centroid;
    }
}