"use strict";

/*
1. ESTRUCTURA HTML(HECHO)
    -Crear un campo de texto y un botón de buscar
    -Lista de resultados con imagen y título
*/

/*
2. BUSCAR ANIMES
    -Cuando la usuaria haga click en el botón buscar, conectamos con la API(Evento)
   / -La URL hay que añadirle lo que la usuaria escribe en el campo de texto(Concatenar con lo que se escribe en el input)
    -Por cada serie hay que pintar una tarjeta con una imagen y el título de la serie(Bucle)
    -Si la serie no tiene imagen propia hay que poner una de relleno, detectar los caso(Condicional)

            -Seleccionar los elementos del HTML
 */

const inputSearch = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-button");
const list = document.querySelector(".js-list");


const inputValue = inputSearch.value;

let animeTitle = [];

function handleSearch() {
    const inputValue = inputSearch.value.toLowerCase();
    console.log(inputValue);

    // Filtrar las series según el nombre
    const filteredSeries = animeTitle.filter(anime => anime.title.toLowerCase().includes(inputValue));

    // Renderizar las series filtradas
    renderSeries(filteredSeries);
}

inputSearch.addEventListener("input", handleSearch);


function searchButton(event) {
    event.preventDefault()
    fetchSeries();
}
btnSearch.addEventListener("click", searchButton)

fetchSeries();


function fetchSeries() {
    const inputValue = inputSearch.value;

    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            animeTitle = data.data;  // Almacenar todas las series obtenidas en la variable global animeTitle


            // Renderizar todas las series obtenidas
            renderSeries(animeTitle);
            //guardar en el localStorage
            localStorage.setItem("seriesInfo", JSON.stringify(animeTitle));
        })
}
const seriesLocalStorage = JSON.parse(localStorage.getItem("seriesInfo"))
console.log(seriesLocalStorage)

if (seriesLocalStorage !== null) {
    renderSeries(seriesLocalStorage);
} else {
    fetchSeries();
}


// Función para mostrar las series en el HTML
function renderSeries(series) {
    list.innerHTML = '';  // Limpiar la lista antes de agregar nuevas series

    series.forEach(anime => {
        let imageUrl = anime.images.jpg.image_url;

        // Verificamos si la URL de la imagen es la que queremos reemplazar
        if (imageUrl === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";  // URL alternativa
        }

        // Crear el contenido HTML para cada serie
        let content = `
            <div class="container">
                <h5>${anime.title}</h5>
                <img src="${imageUrl}" alt="${anime.title}">
            </div>
        `;
        list.innerHTML += content;  // Agregar el contenido a la lista
    });
}