const superagent = require('superagent');
const fs = require("fs");

// CALLBACK-HELL
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//         .end((err, res) => {
//             if (err) return console.log(err);
//             console.log(res.body.message);
//
//             fs.writeFile('dog.img.txt', res.body.message, err => {
//                 if(err) return console.log(err);
//                 console.log("Dog image saved to file successfully");
//             });
//         });
// });

// THEN SYNTAX
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//         .then(res => {
//             console.log(res.body.message)
//             fs.writeFile('dog.img.txt', res.body.message, () => {
//                 console.log("Dog image saved to file successfully");
//             });
//         })
//         .catch(err => console.log('Error: ',err.message))
// });

// PROMISES
const readFileProm = (file) => {
    // executor function
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject("File not found");
            resolve(data);
        });
    });
};

const writeFileProm = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("dog.img.txt", data, err => {
            if (err) reject('File not found')
            resolve('Dog image saved')
        })
    })
}

// readFileProm(`${__dirname}/dog.txt`)
// .then(data => superagent.get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//     .then(res => writeFileProm(res.body.message))
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log("Now finished"))
// );

// ASYNC/AWAIT
// const getDogPics = async () => {
//     try {
//         const data = await readFileProm(`${__dirname}/dog.txt`)
//         const res = await superagent.get(
//             `https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`
//         );
//         const text = await writeFileProm(res.body.message)
//         return text;
//     } catch (e) {
//         throw new Error(e.message)
//     }
// }

// IIFE (Immediately Invoked Function Expression)
// (async () => {
//     try {
//         const data = await getDogPics();
//         console.log(data);
//     } catch (e) {
//         console.log(e);
//     }
// })()

// Waiting for multiple promises
const getDogPics = async () => {
    try {
        const data = await readFileProm(`${__dirname}/dog.txt`)
        const resA = await superagent.get(
            `https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`
        );
        const resB = await superagent.get(
            `https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`
        );
        const resC = await superagent.get(
            `https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`
        );
        const all = await Promise.all([resA, resB, resC]);
        const images = all.map(element => element.body.message);

        const text = await writeFileProm(images.join("\n"))

        return images;
    } catch (e) {
        throw new Error(e.message)
    }
}

(async () => {
    try {
        const data = await getDogPics();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
})()