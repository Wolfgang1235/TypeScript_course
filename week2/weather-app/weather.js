// 3.d
// const {Navigator} = require("node-navigator");
// const navigator = new Navigator();
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// function getLocation(callback) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         callback(position);
//     });
// }

// function getWeather(coords, callback) {
//     const apiKey = "Key";
//     const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
//     const req = new XMLHttpRequest();
//     req.open('GET', url);
//     req.onload = function () {
//         if (req.status === 200) {
//             callback(JSON.parse(req.responseText));
//         } else {
//             callback(new Error(req.statusText));
//         }
//     };
//     req.send();
// }

// getLocation(function (coords) {
//     getWeather(coords, function (weather) {
//         console.log(weather)
//     })
// })

// 3.e
function getLocation() {
    return new Promise(function (resolve, reject) {
        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position);
            });
        } catch (e) {
            reject(new Error(e));
        }
    })
}

function getWeather(coords) {
    return new Promise(function (resolve, reject) {
        try {
            const apiKey = "Key";
            const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = function () {
                resolve(JSON.parse(req.responseText));
            };
            req.send();
        } catch (e) {
            reject(new Error(e))
        }
    })
}

// 3.f
// getLocation()
//     .then(coords => getWeather(coords))
//     .then(weather => console.log(weather))
//     .catch(err => console.log(err))

// 3.f
(async () => {
    try {
        const coords = await getLocation();
        const weather = await getWeather(coords);
        // 4.b
        document.getElementById('weather').innerHTML = weather.main.temp + ' ' + weather.weather[0].description;
    } catch (e) {
        console.log(e);
    }
})()

