//Definición de las variables

let mazo; //mazo
let oculto; //carta repartida
let cuentarepartir=0;
let jugador1, jugador2, jugador3, jugador4; //valores de las cartas de cada jugador

let pj1 = 0 //puntaje acumulado
let pj2 = 0 //puntaje acumulado
let pj3 = 0 //puntaje acumulado
let pj4 = 0 //puntaje acumulado

const puntosJ1_span = document.querySelector("#puntosJ1 > span");
const puntosJ2_span = document.querySelector("#puntosJ2 > span");
const puntosJ3_span = document.querySelector("#puntosJ3 > span");
const puntosJ4_span = document.querySelector("#puntosJ4 > span");

const mensaje_p = document.querySelector(".mensaje > p");



//JUEGO DE CARTAS

//Funciones que se cargan inicialmente
window.onload = function() {
    bienvenida();
    construirMazo(); //crea el mazo de cartas
    mezclarMazo(); //mezcla el mazo de cartas
    iniciarJuego(); //inicia el juego
}

//mensaje bienvenida
function bienvenida(){
    swal({
        title: "¡BIENVENIDO!",
        text: "Este es un sencillo simulador de un juego de cartas. Haz click en jugar para iniciar. El jugador con la carta mas alta gana un punto.",
    });
}

//Construimos el mazo
function construirMazo() {
    let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let tipos = ["C", "D", "H", "S"];
    mazo = [];

    for (let i = 0; i < tipos.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            mazo.push(valores[j] + "-" + tipos[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}

//Funcion de mezclar
function mezclarMazo() {
    for (let i = 0; i < mazo.length; i++) {
        let j = Math.floor(Math.random() * mazo.length); // (0-1) * 52 => (0-51.9999)
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
    console.log(mazo);
}

//Función para iniciar el JUEGO
function iniciarJuego() {

    //botón jugar
    const boton = document.getElementById("jugar").addEventListener("click", jugar);
    
}

function ocultarMazo(){
    const baraja = document.getElementById("oculto")
    baraja.remove();
}


//Función Repartir Cartas cada vez que se presione Jugar.
function jugar(){
        
        cuentarepartir++; 
        
        if(cuentarepartir==13){
            ocultarMazo();
            swal("¡Partida finalizada!");
        }

        if(cuentarepartir>=14){
            swal("¡Ya no quedan cartas!");
            boton.disabled = true;
            cardImg1.remove();
            

         }

        //repartir para jugador 1
        const cardImg1 = document.createElement("img");
        oculto = mazo.pop();
        cardImg1.src = "./cards/" + oculto + ".png";
        document.getElementById("jugador1-cards").append(cardImg1);
        jugador1 = obtenerValor(oculto); //Se obtiene el valor de la carta del Jugador 1

        //repartir para jugador 2
        let cardImg2 = document.createElement("img");
        oculto = mazo.pop();
        cardImg2.src = "./cards/" + oculto + ".png";
        document.getElementById("jugador2-cards").append(cardImg2);
        jugador2 = obtenerValor(oculto); //Se obtiene el valor de la carta del Jugador 2
        
        //repartir para jugador 3
        let cardImg3 = document.createElement("img");
        oculto = mazo.pop();
        cardImg3.src = "./cards/" + oculto + ".png";
        document.getElementById("jugador3-cards").append(cardImg3);
        jugador3 = obtenerValor(oculto); //Se obtiene el valor de la carta del Jugador 3

        //repartir para jugador 4
        let cardImg4 = document.createElement("img");
        oculto = mazo.pop();
        cardImg4.src = "./cards/" + oculto + ".png";
        document.getElementById("jugador4-cards").append(cardImg4);
        jugador4 = obtenerValor(oculto); //Se obtiene el valor de la carta del Jugador 4
        
     

        if(jugador1 > jugador2 && jugador1 > jugador3 && jugador1 > jugador4){
           pj1++;
           puntosJ1_span.innerHTML = pj1;
           mensaje_p.innerHTML =  "Jugador 1 es el ganador!";
           setTimeout(borrarMensaje,1500);
        }

        else if(jugador2 > jugador1 && jugador2 > jugador3 && jugador2 > jugador4){
            console.log("Jugador 2 es el ganador!")
            pj2++;
            puntosJ2_span.innerHTML = pj2;
            mensaje_p.innerHTML =  "Jugador 2 es el ganador!";
            setTimeout(borrarMensaje,1500);
        }
        else if(jugador3 > jugador1 && jugador3 > jugador2 && jugador3 > jugador4){
            console.log("Jugador 3 es el ganador!")
            pj3++;
            puntosJ3_span.innerHTML = pj3;
            mensaje_p.innerHTML =  "Jugador 3 es el ganador!";
            setTimeout(borrarMensaje,1500);
        }
        else if(jugador4 > jugador1 && jugador4 > jugador2 && jugador4 > jugador3){
            console.log("Jugador 4 es el ganador!")
            pj4++;
            puntosJ4_span.innerHTML = pj4;
            mensaje_p.innerHTML =  "Jugador 4 es el ganador!";
            setTimeout(borrarMensaje,1500);
        }
        else{
            mensaje_p.innerHTML =  "¡Empate!";
            setTimeout(borrarMensaje,1500);
        }
    
}


//Funcion borrar mensaje
function borrarMensaje(){
    mensaje_p.innerHTML =  "";

}

//Funcion para obtener el valor de la carta
function obtenerValor(card){
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)){
        if(value == "A"){
            return 14;
        }
        if (value == "K"){
            return 13;
        }
        if(value == "Q"){
            return 12;
        }
        if (value == "J"){
            return 11;
        }
    }
    return parseInt(value);
}


//API DEL CLIMA

//obtener informacion del clima
const apikey = "G9RB7qnAIEJ0o12KygrPCX2xiGkCsVdv";

const getWeather = async (id) => {
    const base = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${apikey}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];

}

//obtener informacion de la ciudad 

const getCity = async (city) => {
    const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apikey}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return (data[0]);
};



const cityForm = document.querySelector("form");
const card = document.querySelector(".clima");
const details = document.querySelector(".details");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    //update the details template
    details.innerHTML = 
    `<h6>${cityDets.EnglishName}</h6>
    <div>${weather.WeatherText}</div>
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>`;

    //cambiar img e icono
    const iconSrc = `img/iconos/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    //borrar display none
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    }
};


const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{ cityDets, weather};
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

})

