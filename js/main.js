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
const favoriteList = document.querySelector(".js-favorites");

let animeTitle = [];
let favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];

// Buscar series con el valor que escribe la usuaria
function handleSearch() {
    const inputValue = inputSearch.value.toLowerCase();
    const filteredSeries = animeTitle.filter(anime => anime.title.toLowerCase().includes(inputValue));
    renderSeries(filteredSeries);
}

inputSearch.addEventListener("input", handleSearch);

// Añadir a favoritos
function handleAddFavorite(event) {
    const idSeriesClicked = event.currentTarget.id;
    const serieSelected = animeTitle.find(serie => serie.mal_id === parseInt(idSeriesClicked));

    // Evita duplicados
    if (!favoriteSeries.some(fav => fav.mal_id === serieSelected.mal_id)) {
        favoriteSeries.push(serieSelected);
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoriteSeries", JSON.stringify(favoriteSeries));
    renderFavorites();
}

// Renderizar lista de series favoritas
function renderFavorites() {
    favoriteList.innerHTML = "";
    favoriteSeries.forEach(anime => {
        const imageUrl = anime.images.jpg.image_url || "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";
        const content = `
            <div class="container js-series" id="${anime.mal_id}">
                <h5>${anime.title}</h5>
                <img src="${imageUrl}" alt="${anime.title}">
            </div>
        `;
        favoriteList.innerHTML += content;
    });
}

// Click en el botón buscar
function searchButton(event) {
    event.preventDefault();
    fetchSeries();
}
btnSearch.addEventListener("click", searchButton);

// Fetch series desde API
function fetchSeries() {
    const inputValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            animeTitle = data.data;
            renderSeries(animeTitle);
        });
}

// Renderizar series de búsqueda
function renderSeries(series) {
    list.innerHTML = '';
    series.forEach(anime => {
        let imageUrl = anime.images.jpg.image_url;
        if (imageUrl === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";
        }

        const content = `
            <div class="container js-series" id="${anime.mal_id}">
                <h5>${anime.title}</h5>
                <img src="${imageUrl}" alt="${anime.title}">
            </div>
        `;
        list.innerHTML += content;
    });

    // Añadir evento de clic a cada serie para añadir a favoritos
    document.querySelectorAll(".js-series").forEach(seriesDOM => {
        seriesDOM.addEventListener("click", handleAddFavorite);
    });
}

// Cargar favoritos desde localStorage al iniciar la aplicación
renderFavorites();