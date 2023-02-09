// 1.b
function calculate(x,y,callback) {
    return callback(x,y)
}

// 1.c
function add(x,y) {
    return x + y;
}

// 1.d
// console.log(calculate(3, 2, add));

// 1.e
function subtraction(x,y) {
    return x - y;
}

function multiplication(x,y) {
    return x * y;
}

function division(x,y) {
    return x / y;
}

// 1.f
// console.log(calculate(3, 2, subtraction));
// console.log(calculate(3, 2, multiplication));
// console.log(calculate(3, 2, division));