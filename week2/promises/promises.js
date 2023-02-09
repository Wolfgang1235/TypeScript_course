// 2.b
// function calculate(x,y,callback) {
//     return new Promise((resolve, reject) => {
//         try {
//             const result = callback(x,y)
//             resolve(result)
//         } catch (e) {
//             reject(new Error(e.message))
//         }
//     })
// }

function add(x,y) {
    return x + y;
}

function subtraction(x,y) {
    return x - y;
}

function multiplication(x,y) {
    return x * y;
}

function division(x,y) {
    return x / y;
}

// 2.c
// console.log(calculate(4,0,division))
// console.log(calculate(4,0,multiplication))


// 2.d
let nA = 10;
let nB = 5;

// calculate(nA,nB,add)
// .then(res => {
//     console.log(res)
//     calculate(nA,nB,subtraction)
//         .then(res => {
//             console.log(res)
//             calculate(nA,nB,multiplication)
//                 .then(res => {
//                     console.log(res)
//                     calculate(nA,nB,division)
//                         .then(res => {
//                             console.log(res)
//                         })
//                 })
//         })
// })


// 2.e
async function calculate(x,y,callback) {
    try {
        const data = await callback(x,y)
        return data;
    } catch (e) {
        throw new Error(e.message)
    }
}

(async () => {
    try {
        const data = await calculate(nA,nB,add)
        console.log(data)
    } catch (e) {
        console.log(e)
    }
})()