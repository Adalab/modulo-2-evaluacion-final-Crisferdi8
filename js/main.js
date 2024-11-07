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
const title = document.querySelector(".js-title");
const image = document.querySelector(".js-image");

inputSearch =

    fetch(" https://api.jikan.moe/v4/anime?q=naruto")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const animeTitle = data.data;
            console.log(animeTitle)

        })



