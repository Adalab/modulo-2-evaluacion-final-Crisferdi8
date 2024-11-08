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

/*
3.AÑADIR A FAAVORITOS
    -Cuando la usuaria haga click en una serie de las que haya buscado, se añadirá a la lista de favoritos
    -La serie que elija la usuaria en el bloque de resultados se marcará de una manera distinta
    -He añadido también la funcionalidad de que si la serie ya está en favoritos, no vuelva a repetirse
 */

/*
4.GUARDAR FAVORITOS EN EL LOCAL STORAGE
    -Si es la primera vez que la usuaria accede a la página, la lista de favoritos estará vacia pero si ha entrado más veces debe arrancarse la página 
        con la lista de favoritos que tiene guardada en el localStorage
*/
const inputSearch = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-button");
const list = document.querySelector(".js-list");
const favoriteList = document.querySelector(".js-favorites");


//La lista de resultados de primeras está vacía
let animeTitle = [];
//Si la usuaria ha accedido a la página más veces mostrar su listado de favoritos, si no vacío
let favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];

// Buscar series con el valor que escribe la usuaria
function handleSearch() {
    const inputValue = inputSearch.value.toLowerCase();  //Añado tolowerCase para que no distiga entre may y min
    const filteredSeries = animeTitle.filter(anime => anime.title.toLowerCase().includes(inputValue));
    //Llamo a renderSeries para que me pinte las series que coincidan con algún valor
    renderSeries(filteredSeries);
}

inputSearch.addEventListener("input", handleSearch);

// Añadir a favoritos
function handleAddFavorite(event) {
    const idSeriesClicked = event.currentTarget.id;
    const serieSelected = animeTitle.find(serie => serie.mal_id === parseInt(idSeriesClicked));

    // Evitar duplicados en favoritos(EXTRA)
    if (!favoriteSeries.some(fav => fav.mal_id === serieSelected.mal_id)) {
        favoriteSeries.push(serieSelected);
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoriteSeries", JSON.stringify(favoriteSeries));
    renderFavorites();

    // Cambiar estilo del título de la serie seleccionada en resultados, añadiendole una clase
    const titleElement = event.currentTarget.querySelector("h5");
    titleElement.classList.add("selected");
}

// Pintar lista de series favoritas
function renderFavorites() {
    favoriteList.innerHTML = "";
    favoriteSeries.forEach(anime => {
        //Si no contiene su imagen añadirle el placeholder
        const imageUrl = anime.images.jpg.image_url || "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";
        const content = `
            <div class="container js-series" id="${anime.mal_id}">
                <h5>${anime.title}</h5>
                <img src="${imageUrl}" alt="${anime.title}">
                <button class="remove-favorite-btn" data-id="${anime.mal_id}">Eliminar</button>
            </div>
        `;
        favoriteList.innerHTML += content;
    });
}

// Click en el botón buscar y accedemos a la API
function searchButton(event) {
    event.preventDefault();
    fetchSeries();
}
btnSearch.addEventListener("click", searchButton);

// Fetch con el valor que escribe la usuaria en el input y esperamos respuesta del servidor y llamamos a renderseries para pintar las imágenes
function fetchSeries() {
    const inputValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            animeTitle = data.data;
            renderSeries(animeTitle);
        });
}

// Pintar las series, si no tiene imagen, añade placeholder
function renderSeries(series) {
    list.innerHTML = '';
    //El forEach itera sobre cada elemento
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

    // Añadir evento de click a cada serie para añadir a favoritos
    //El forEach itera sobre cada elemento, en este caso seriesDOM
    //Una vez ha oido el clik lo añade a lista de favoritos(handleAddFavorites)
    document.querySelectorAll(".js-series").forEach(seriesDOM => {
        seriesDOM.addEventListener("click", handleAddFavorite);
    });
}

// Carga favoritos desde localStorage al iniciar la página
renderFavorites();