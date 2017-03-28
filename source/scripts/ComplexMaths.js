/*for this, complex numbers are array of two:
a + bi = [a,b] = [Real Part,Imaginary Part] 
*/

class ComplexMaths {

    static checkIsComplex(complexNumber) {
        /*check it is an array of 2 numbers*/
    }

    static ComplexAdd(first, second) {
        return [first[0] + second[0], first[1] + second[1]]
    }

    static ComplexSub(minuend, subtrahend) {
        return [minuend[0] - subtrahend[0], minuend[1] - subtrahend[1]];
    }

    static ComplexMul(first, second) {
        return [(first[0] * second[0]) - (first[1] * second[1]), (first[0] * second[1]) + (first[1] * second[0])];
    }

    static ComplexDiv(dividend, divisor) {
        var Con = [divisor[0], (-1) * divisor[1]]; //Find complex conjugate of divisor
        var Divi = (divisor[0] * Con[0]) + (divisor[0] * Con[1]) + (Con[0] * divisor[1]) - (divisor[1] * Con[1]);
        return [((dividend[0] * Con[0]) - (dividend[1] * divisor[1])) / Divi, ((dividend[0] * Con[1]) + (Con[0] * dividend[1])) / Divi];
    }

    //Roots have +ve and -ve solutions
    //First solution
    static ComplexSqrt(first) {
        var Re = first[0];
        var Im = first[1];
        var r = Math.sqrt((Re * Re) + (Im * Im)); //complex modulus
        var newImPart = Math.sqrt((r - Re) / 2);
        var x;
        if (newImPart === 0) {
            newRePart = 0; //If the new imaginary part is 0 then the real is 0 too because calculating the newRe would involve divide by zero
        } else {
            newRePart = Im / (2 * newImPart);
        }
        return [newRePart, newImPart];
    }

    //Second solution with opposite sign of Re
    static ComplexSqrt2(first) {
        var a = ComplexSqrt(first);
        return [a[0] * (-1), a[1]];
    }

}

module.exports = ComplexMaths;