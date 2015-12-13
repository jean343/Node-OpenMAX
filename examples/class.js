var Shape = function (sides, vertices) {
  this.sides = sides;
  this.vertices = vertices;
}
//var triangle = new Shape(3, 3);

var Triangle = function (angles, side_lengths) {
  this.angles = angles || [60, 60, 60];
  this.side_lengths = side_lengths || [5, 5, 5];
}
Triangle.prototype = new Shape(3, 3);

var isosceles_triangle = new Triangle([70, 70, 40], [5, 5, 10]);
var scalene_triangle = new Triangle([70, 60, 50], [5, 10, 13]);

console.log(isosceles_triangle.sides);
console.log(isosceles_triangle.vertices);
console.log(isosceles_triangle.angles);
console.log(isosceles_triangle.side_lengths);