console.log('client side JavaScript')



const inputValue = document.querySelector("form")
const search = document.querySelector("input")
const p1 = document.querySelector("#message1")
const p2 = document.querySelector("#message2")

inputValue.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(search.value)
    p1.textContent = 'loading'
    p2.textContent = 'loading'
    locFore(search.value, (error, { forecast, location } = {}) => {
        if (error) {
            p1.textContent = error;
        } else {
            p1.textContent = location;
            p2.textContent = forecast;

        }
    });


})
const locFore = (location, callback) => {
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        if (response.error) {
            callback(response.error, undefined)
        }
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined)
            } else {
                callback(undefined, {
                    forecast: data.forecast,
                    location: data.location,
                })

            }
        })
    })
}
