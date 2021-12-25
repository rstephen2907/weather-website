const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loactionWeather = document.querySelector('#location-weather');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});

loactionWeather.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    loactionWeather.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        const url = `/locationweather?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                loactionWeather.removeAttribute('disabled');
                if (data.error) {
                    messageOne.textContent = data.error;
                    messageTwo.textContent = "";
                } else {
                    messageOne.textContent = data.forecast;
                    messageTwo.textContent = "";
                }
            })
        });
    });

});
