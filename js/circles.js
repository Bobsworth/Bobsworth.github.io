var circles = [];

function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

/*Define Complex Functions*/
function ComplexAdd(first, second) {
    return [first[0] + second[0], first[1] + second[1]];
}

function ComplexSub(first, second) {
    return [first[0] - second[0], first[1] - second[1]];
}

function ComplexMul(first, second) {
    return [(first[0] * second[0]) + ((first[1] * second[1]) * (-1)), (first[0] * second[1]) + (first[1] * second[0])];
}

function ComplexDiv(first, second) {
    var Con = [second[0], (-1) * second[1]];
    var Divi = (second[0] * Con[0]) + (second[0] * Con[1]) + (Con[0] * second[1]) + ((-1) * second[1] * Con[1]);
    return [(((first[0] * Con[0]) + ((-1) * first[1] * second[1])) / Divi), (((first[0] * Con[1]) + (Con[0] * first[1])) / Divi)];
}

function ComplexSqrt(first) {
    var asq = first[0];
    var bsq = first[1];
    var rmod = Math.sqrt(asq * asq + bsq * bsq);
    var ysq = Math.sqrt((rmod - asq) / 2);
    var xsq = 0;
    if (ysq === 0) {
        xsq = 0;
    } else {xsq = bsq / (2 * ysq); }
    return [xsq, ysq];
}

function ComplexSqrt2(first) {
    var asq = first[0];
    var bsq = first[1];
    var rmod = Math.sqrt(asq * asq + bsq * bsq);
    var ysq = (Math.sqrt((rmod - asq) / 2)) * (-1);
    var xsq = 0;
    if (ysq === 0) {
        xsq = 0;
    } else {xsq = (bsq / (2 * ysq)) * (-1); }
    return [xsq, ysq];
}

//function to draw the circle object. must be called each time//
function draw(circ) {
    var c = document.getElementById("circlecanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(circ.x, circ.y, circ.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(circ.name,circ.x,circ.y);
}


//second circles also set for this symmetry. later to make change from size of first,or symmertry chosen//    
function Circle(name,x, y, r, st, nd, rd) {
    this.name = name;
    this.st = st;
    this.nd = nd;
    this.rd = rd;
    this.x = x;
    this.y = y;
    this.r = r;
    this.k = (1 / r);
    this.kcom = [(1 / r), 0];
    this.z = [x, y];
    this.zk = ComplexMul(this.z, this.kcom);
}

function MakeOutside(a) {
    a.k = (-1) * (1 / a.r);
    a.kcom = [a.k,0];
    a.zk = ComplexMul(a.z, a.kcom);
}

var one = new Circle("one",250, 250, 250, 'none', 'none', 'none');
MakeOutside(one); /*set first circle to -ve k because outside circle*/
circles.push(one);
draw(circles[0]);
var two = new Circle("two",circles[0].x / 2 + ((circles[0].x - circles[0].r) / 2), circles[0].y, circles[0].r / 2, 'none', 'none', 'none');
circles.push(two);
draw(circles[1]);
var three = new Circle("three",(circles[0].x - circles[0].r) + circles[0].r / 2 + circles[0].r, circles[0].y, circles[0].r / 2, 'none', 'none', 'none');
circles.push(three);
draw(circles[2]);

function rofnew(a, b, c) {
    return 1 / (a.k + b.k + c.k + (2 * (Math.sqrt((a.k * b.k) + (b.k * c.k) + (c.k * a.k)))));
}

function zofnew1(a, b, c, d) {
    var ot = ComplexMul(a.zk, b.zk);
    var th = ComplexMul(b.zk, c.zk);
    var oh = ComplexMul(a.zk, c.zk);
    var beginning = ComplexAdd(ComplexAdd(a.zk, b.zk), c.zk);
    var middle = ComplexAdd(ComplexAdd(ot, th), oh);
    return ComplexDiv((ComplexAdd(beginning, (ComplexMul([2,0], ComplexSqrt(middle))))), d.kcom);
}

function zofnew2(a, b, c, d) {
    var onetwo = ComplexMul(a.zk, b.zk);
    var twothree = ComplexMul(b.zk, c.zk);
    var onethree = ComplexMul(a.zk, c.zk);
    var beginning = ComplexAdd(ComplexAdd(a.zk, b.zk), c.zk);
    var middle = ComplexAdd(ComplexAdd(onetwo, twothree), onethree);
    return ComplexDiv((ComplexAdd(beginning, (ComplexMul([2, 0], ComplexSqrt2(middle))))), d.kcom);
}

function setnew1(a) {
    a.r     = rofnew(a.st,a.nd,a.rd);
    a.k     = (1/a.r);
    a.kcom  = [a.k,0];
    a.z     = zofnew1(a.st, a.nd, a.rd,a);
    a.x     = a.z[0];
    a.y     = a.z[1];
    a.zk    = ComplexMul(a.z, a.kcom);
    //circles.push(a);
}

function setnew2(a) {
    a.r     = rofnew(a.st,a.nd,a.rd);
    a.k     = (1/a.r);
    a.kcom  = [a.k,0];
    a.z     = zofnew2(a.st, a.nd, a.rd,a);
    a.x     = a.z[0];
    a.y     = a.z[1];
    a.zk    = ComplexMul(a.z, a.kcom);
    //circles.push(a);
}


/*var four = new Circle("four",1,1,1,one,two,three);
setnew2(four);
draw(four);

var five = new Circle("five",1,1,1,one,two,three);
setnew1(five);
draw(five);

var six = new Circle("six",1,1,1,one,three,five);
setnew1(six);
draw(six);

var seven = new Circle("seven",1,1,1,one,two,four);
setnew1(seven);
draw(seven);

var eight = new Circle("eight",1,1,1,two,three,five);
setnew1(eight);
draw(eight);

var nine = new Circle("nine",1,1,1,eight,two,three);
setnew1(nine);
draw(nine);*/

for (var i=0;i<50;i++){
    for (var j=0;j<10;j++){
        for (var k=0;k<10;k++){
    circles.push ({
    name: String(i)+String(j)+String(k),
    st: circles[i],
    nd: circles[j],
    rd: circles[k],
    x: 1,
    y: 1,
    r: 1,
    k: (1 / 1),
    kcom: [(1 / 1), 0],
    z: [1, 1]
    //zk = ComplexMul(z,kcom);
})
}
}
}
/*
for (var l=3;l<circles.length;l++){
setnew1(circles[l]);
draw(circles[l]);
}*/

setnew1(circles[15]);
draw(circles[15]);

/*setnew1(circles[16]);
draw(circles[16]);*/

document.getElementById("head").innerHTML = circles[3].r;