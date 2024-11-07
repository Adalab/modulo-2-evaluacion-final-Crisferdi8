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
const title1 = document.querySelector(".js-title");
const image = document.querySelector(".js-image");


const inputValue = inputSearch.value;

fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const animeTitle = data.data;
        const anime = animeTitle[0];
        console.log(anime)


        let content = "";
        content +=
            `<div class="container"> 
        <h5>${anime.title}</h5>
        `
        for (const title of animeTitle)
            console.log(title.title);
        content = `<img src="${anime.images.jpg.image_url}" alt="${anime.title}"></img>`
        content += "</div >";
        list.innerHTML = content;

        let imageUrl = anime.images.jpg.image_url; // Supongamos que esta es la URL de la imagen obtenida de la API

        // Verificamos si la URL de la imagen es la que queremos reemplazar
        if (imageUrl === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            // Si coincide, asignamos una URL alternativa
            imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";
        }


    })



