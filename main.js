import Space from "./lib/Space.js";
import Shape from "./lib/Shape.js";
import ShapeGroup from "./lib/ShapeGroup.js";

function main() {
    // Accessing canvas through DOM (Document Object Model)
    var canvas = document.getElementById('myCanvas');   // The paper
    
    // Creating space
    let space = new Space(canvas);

    let charger1 = new ShapeGroup();

    // Part: Kepala
    let shape = new Shape(0, 0, 500, 500);
    shape.add(363, 120, 1.0, 1.0, 1.0);
    shape.add(227, 159, 1.0, 1.0, 1.0);
    shape.add(269, 244, 1.0, 1.0, 1.0);
    shape.add(278, 267, 0.9, 0.9, 0.9);
    shape.add(424, 220, 1.0, 1.0, 1.0);
    shape.add(420, 197, 1.0, 1.0, 1.0);
    shape.add(363, 119, 1.0, 1.0, 1.0);
    charger1.addShape(shape);

    // Part: Samping Kepala
    shape = new Shape(0, 0, 500, 500);
    shape.add(278, 266, 1.0, 1.0, 1.0);
    shape.add(277, 300, 0.5, 0.5, 0.5);
    shape.add(413, 253, 0.5, 0.5, 0.5);
    shape.add(424, 216, 1.0, 1.0, 1.0);
    charger1.addShape(shape);

    // Part: Samping Pinggang
    shape = new Shape(0, 0, 500, 500);
    shape.add(228, 160, 1.0, 1.0, 1.0);
    shape.add(217, 183, 0.3, 0.3, 0.3);
    shape.add(247, 247, 0.3, 0.3, 0.3);
    shape.add(259, 286, 0.3, 0.3, 0.3);
    shape.add(278, 298, 1.0, 1.0, 1.0);
    shape.add(280.39, 266, 1.0, 1.0, 1.0);
    shape.add(269, 243, 0.3, 0.3, 0.3);
    charger1.addShape(shape);

    // Part: Pinggang
    shape = new Shape(0, 0, 500, 500);
    shape.add(222, 183, 0.6, 0.6, 0.6);
    shape.add(142, 207, 1.0, 1.0, 1.0);
    shape.add(164, 274, 1.0, 1.0, 1.0);
    shape.add(176, 311, 0.90, 0.9, 0.9);
    shape.add(262, 286, 0.6, 0.6, 0.6);
    shape.add(253, 247, 0.7, 0.7, 0.7);
    charger1.addShape(shape);

    // Part: Colokan 1
    shape = new Shape(0, 0, 500, 500);
    shape.add(147, 222, 0.7, 0.7, 0.7);
    shape.add(106, 236, 1.0, 1.0, 1.0);
    shape.add(106, 242, 1.0, 1.0, 1.0);
    shape.add(111, 248, 1.0, 1.0, 1.0);
    shape.add(153, 236, 1.0, 1.0, 1.0);
    charger1.addShape(shape);

    shape = new Shape(0, 0, 500, 500);
    shape.add(106, 236, 0.3, 0.3, 0.3);
    shape.add(106, 241, 1.0, 1.0, 1.0);
    shape.add(111, 250, 0.3, 0.3, 0.3);
    shape.add(82, 259, 0.6, 0.6, 0.6);
    shape.add(76, 255, 0.5, 0.5, 0.5);
    shape.add(78, 245, 0.2, 0.2, 0.2);
    charger1.addShape(shape);

    // Part: Colokan 2
    shape = new Shape(0, 0, 500, 500);
    shape.add(166, 277, 0.8, 0.8, 0.8);
    shape.add(121, 291, 1.0, 1.0, 1.0);
    shape.add(122, 298, 1.0, 1.0, 1.0);
    shape.add(127, 306, 1.0, 1.0, 1.0);
    shape.add(171, 291, 0.8, 0.8, 0.8);
    charger1.addShape(shape);

    shape = new Shape(0, 0, 500, 500);
    shape.add(122, 291, 0.6, 0.6, 0.6);
    shape.add(121, 297, 0.6, 0.6, 0.6);
    shape.add(127, 307, 0.6, 0.6, 0.6);
    shape.add(98, 316, 0.6, 0.6, 0.6);
    shape.add(88, 311, 0.2, 0.2, 0.2);
    shape.add(92, 299, 0.3, 0.3, 0.3);
    charger1.addShape(shape);

    charger1.resize(0.5);
    charger1.translate(0.5, 0.0);

    space.addShapeGroup(charger1);
    
    let colokanSpeed = 0.009;
    let charger1_DELTA = -0.3; 
    function animatecharger1() {
        charger1.translate(0.0, colokanSpeed);
        if (charger1.getCentroid()[1] > 1 || charger1.getCentroid()[1]+(charger1_DELTA) < -1) colokanSpeed *= -1;
        space.render();
        requestAnimationFrame(animatecharger1);
    }
    requestAnimationFrame(animatecharger1);

    let charger2 = new ShapeGroup();
    
    // Part: Kepala
    shape = new Shape(0, 0, 500, 500);
    shape.add(92, 128, 1.0, 1.0, 1.0);
    shape.add(252, 134, 1.0, 1.0, 1.0);
    shape.add(255, 222, 0.8, 0.8, 0.8);
    shape.add(64, 221, 0.8, 0.8, 0.8);
    charger2.addShape(shape);

    // Part: Samping Kepala
    shape = new Shape(0, 0, 500, 500);
    shape.add(255, 223-1, 0.9, 0.9, 0.9);
    shape.add(254, 254-1, 0.8, 0.8, 0.8);
    shape.add(252, 287-1, 0.5, 0.5, 0.5);
    shape.add(82, 289-1, 0.5, 0.5, 0.5);
    shape.add(70, 260-1, 0.8, 0.8, 0.8);
    shape.add(65, 237-1, 0.8, 0.8, 0.8);
    shape.add(65, 222-1, 0.9, 0.9, 0.9);
    charger2.addShape(shape);

    // Part: Samping Pinggang
    shape = new Shape(0, 0, 500, 500);
    shape.add(252, 287, 0.8, 0.8, 0.8);
    shape.add(275, 265, 1.0, 1.0, 1.0);
    shape.add(277, 226, 1.0, 1.0, 1.0);
    shape.add(272, 155, 1.0, 1.0, 1.0);
    shape.add(251, 133, 0.8, 0.8, 0.8);
    shape.add(255, 222, 0.8, 0.8, 0.8);
    shape.add(255, 245, 0.8, 0.8, 0.8);
    shape.add(253, 269, 0.8, 0.8, 0.8);
    charger2.addShape(shape);

    // Part: Pinggang
    shape = new Shape(0, 0, 500, 500);
    shape.add(271, 156, 1.0, 1.0, 1.0);
    shape.add(277, 229, 1.0, 1.0, 1.0);
    shape.add(273, 265, 0.8, 0.8, 0.8);
    shape.add(366, 263, 0.8, 0.8, 0.8);
    shape.add(367, 226, 0.9, 0.9, 0.9);
    shape.add(365, 208, 1.0, 1.0, 1.0);
    shape.add(352, 158, 1.0, 1.0, 1.0);
    charger2.addShape(shape);

    // Part: Colokan 1
    shape = new Shape(0, 0, 500, 500);
    shape.add(356, 176, 0.8, 0.8, 0.8);
    shape.add(392, 177, 0.8, 0.8, 0.8);
    shape.add(394, 183, 1.0, 1.0, 1.0);
    shape.add(391, 191, 0.8, 0.8, 0.8);
    shape.add(360, 191, 1.0, 1.0, 1.0);
    charger2.addShape(shape);

    shape = new Shape(0, 0, 500, 500);
    shape.add(392, 176, 0.4, 0.4, 0.4);
    shape.add(395, 182, 1.0, 1.0, 1.0);
    shape.add(391, 192, 0.8, 0.8, 0.8);
    shape.add(419, 192, 0.4, 0.4, 0.4);
    shape.add(424, 186, 0.4, 0.4, 0.4);
    shape.add(420, 178, 0.4, 0.4, 0.4);
    charger2.addShape(shape);

    // Part: Colokan 2
    shape = new Shape(0, 0, 500, 500);
    shape.add(367, 227, 1.0, 1.0, 1.0);
    shape.add(408, 227, 0.8, 0.8, 0.8);
    shape.add(411, 233, 0.9, 0.9, 0.9);
    shape.add(409, 242, 0.82, 0.82, 0.82);
    shape.add(366, 243, 0.7, 0.7, 0.7);
    shape.add(367, 235, 1.0, 1.0, 1.0);
    charger2.addShape(shape);

    shape = new Shape(0, 0, 500, 500);
    shape.add(408, 227, 0.7, 0.7, 0.7);
    shape.add(438, 227, 1.0, 1.0, 1.0);
    shape.add(444, 234, 0.4, 0.4, 0.4);
    shape.add(438, 243, 0.4, 0.4, 0.4);
    shape.add(407, 244, 0.4, 0.4, 0.4);
    shape.add(410, 235, 0.4, 0.4, 0.4);
    charger2.addShape(shape);

    space.addShapeGroup(charger2);

    charger2.resize(0.5);
    charger2.translate(-0.5, 0.0);
    
    space.render();
}

window.onload = () => {
    main();
};