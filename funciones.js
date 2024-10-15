const API_KEY = "72e22e3aa1fb08ae8db024bc0ac4bba8";

function consultarTiempo() {
    let ciudad = document.getElementById("ciudad").value;
    console.log("Ciudad: " + ciudad);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                console.log("Error: Ciudad no encontrada");
                return;
            }

            let longitud = data[0].lon;
            let latitud = data[0].lat;
            let nombreCiudad = data[0].name;
            let pais = data[0].country;
            console.log("Longitud: " + longitud);
            console.log("Latitud: " + latitud);
            document.getElementById("nombre").innerText = nombreCiudad;
            document.getElementById("pais").innerText = pais;
            document.getElementById("latitud").innerText = latitud;
            document.getElementById("longitud").innerText = longitud;

            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${API_KEY}`);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.cod !== 200) {
                console.log("Error: " + data.message);
                return;
            }

            let temperatura = data.main.temp;
            let sensacion = data.main.feels_like;
            let minima = data.main.temp_min;
            let maxima = data.main.temp_max;
            let presion = data.main.pressure;
            let humedad = data.main.humidity;
            let descripcion = data.weather[0].description;
            let icono = data.weather[0].icon;

            console.log("Temperatura: " + temperatura);
            console.log("Sensación térmica: " + sensacion);
            console.log("Temperatura mínima: " + minima);
            console.log("Temperatura máxima: " + maxima);
            console.log("Presión: " + presion);
            console.log("Humedad: " + humedad);
            console.log("Descripción: " + descripcion);
            console.log("Icono: " + icono);

            document.getElementById("temperatura").innerText = temperatura;
            document.getElementById("sensacion").innerText = sensacion;
            document.getElementById("minima").innerText = minima;
            document.getElementById("maxima").innerText = maxima;
            document.getElementById("presion").innerText = presion;
            document.getElementById("humedad").innerText = humedad;
            document.getElementById("descripcion").innerText = descripcion;
            document.getElementById("icono").src = `http://openweathermap.org/img/wn/${icono}.png`;
        })
        .catch(error => {
            console.log("Error: " + error.message);
        });

    return false;
}


function consultarTiempoExtra() {
    let ciudad = document.getElementById("ciudad").value;
    let dias = document.getElementById("dias").value;
    console.log("Ciudad: " + ciudad + ", Días: " + dias);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log("Error: Ciudad no encontrada");
                return;
            }

            let longitud = data[0].lon;
            let latitud = data[0].lat;

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&units=metric&appid=${API_KEY}&cnt=${dias}`);
        })
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                console.log("Error: " + data.message);
                return;
            }

            let temperatura = data.list[0].main.temp;
            let sensacion = data.list[0].main.feels_like;
            let minima = data.list[0].main.temp_min;
            let maxima = data.list[0].main.temp_max;
            let presion = data.list[0].main.pressure;
            let humedad = data.list[0].main.humidity;
            let descripcion = data.list[0].weather[0].description;
            let icono = data.list[0].weather[0].icon;

            console.log("Temperatura: " + temperatura);
            console.log("Sensación térmica: " + sensacion);
            console.log("Temperatura mínima: " + minima);
            console.log("Temperatura máxima: " + maxima);
            console.log("Presión: " + presion);
            console.log("Humedad: " + humedad);
            console.log("Descripción: " + descripcion);
            console.log("Icono: " + icono);

            document.getElementById("temperatura").innerText = temperatura;
            document.getElementById("sensacion").innerText = sensacion;
            document.getElementById("minima").innerText = minima;
            document.getElementById("maxima").innerText = maxima;
            document.getElementById("presion").innerText = presion;
            document.getElementById("humedad").innerText = humedad;
            document.getElementById("descripcion").innerText = descripcion;
            document.getElementById("icono").src = `http://openweathermap.org/img/wn/${icono}.png`;
        })
        .catch(error => {
            console.log("Error: " + error.message);
        });

    return false;
}

