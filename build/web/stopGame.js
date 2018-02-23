/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * En esta clase manipularemos todos nuestros elementos
 * creados en el archivo index.html, como por ejemplo el canvas,
 * aca se crearan los listener, metodos para obtener las coordenadas de sus
 * respectivos puntos, metodos para limpiar la pizarra, metodo para enviar 
 * informacion a las demas pizarras entro otros.
 * @type Element
 */

function calcularPuntaje(){
    var puntaje1 = 0;
    var puntaje2 = 0;
    var name1=document.getElementById("nombre").value;
    var name2=document.getElementById("nombreRes").value;
    var apellido1=document.getElementById("apellido").value;
    var apellido2=document.getElementById("apellidoRes").value;
    var ciudad1=document.getElementById("ciudad").value;
    var ciudad2=document.getElementById("ciudadRes").value;
    var alimento1=document.getElementById("alimento").value;
    var alimento2=document.getElementById("alimentoRes").value;
    var animal1=document.getElementById("animal").value;
    var animal2=document.getElementById("animalRes").value;
    var cosa1=document.getElementById("cosa").value;
    var cosa2=document.getElementById("cosaRes").value;
    if(name1 !== name2){
        if(name1 !== "" && name1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(name2 !== "" && name2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(name1===name2 && name1 !== "" && name1.startsWith(document.getElementById("letra").value)){
        puntaje1 = puntaje1 + 50;
        puntaje2 = puntaje2 + 50;
    }
     
    if(apellido1 !== apellido2){
        if(apellido1 !== "" && apellido1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(apellido2 !== "" && apellido2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(apellido1===apellido2 && apellido1 !== "" &&apellido1.startsWith(document.getElementById("letra").value)){
        puntaje1 = puntaje1 + 50;
        puntaje2 = puntaje2 + 50;
    }
     
    if(ciudad1 !== ciudad2){
        if(ciudad1 !== "" && ciudad1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(ciudad2 !== "" && ciudad2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(ciudad1===ciudad2 && ciudad1 !== "" && ciudad1.startsWith(document.getElementById("letra").value)){
        puntaje1 = puntaje1 + 50;
        puntaje2 = puntaje2 + 50;
    }
     
    if(alimento1 !== alimento2){
        if(alimento1 !== "" && alimento1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(alimento2 !== "" && alimento2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(alimento1===alimento2 && alimento1 !== "" && alimento1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 50;
            puntaje2 = puntaje2 + 50;
    }
     
    if(animal1 !== animal2){
        if(animal1 !== "" && animal1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(animal2 !== "" && animal2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(animal1===animal2 && animal1 !== "" && animal1.startsWith(document.getElementById("letra").value)){
        puntaje1 = puntaje1 + 50;
        puntaje2 = puntaje2 + 50;
    }
     
    if(cosa1 !== cosa2){
        if(cosa1 !== "" && cosa1.startsWith(document.getElementById("letra").value)){
            puntaje1 = puntaje1 + 100;
        }
        if(cosa2 !== "" && cosa2.startsWith(document.getElementById("letra").value)){
            puntaje2 = puntaje2 + 100;
        }
    }
    else if(cosa1===cosa2 && cosa1 !== "" && cosa1.startsWith(document.getElementById("letra").value)){
        puntaje1 = puntaje1 + 50;
        puntaje2 = puntaje2 + 50;
    }
    document.getElementById("total1").value = puntaje1;
    document.getElementById("total2").value = puntaje2;
    if(puntaje1 > puntaje2){
        alert("El ganador es el jugador local");
    }
    else if(puntaje2 > puntaje1){
        alert("El ganador es el jugador contrario");
    }
    else{
        alert("Empate!!");
    }
}

 
function stop(evt){
    var name = document.getElementById("nombre").value;
    sendData(evt,"datos");
}

function iniciar(evt){
    var abc = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    var letra = Math.floor(Math.random()*abc.length);
    document.getElementById("letra").value = abc[letra];
    limpiarCampos();
    sendData(evt,"letra");
}

function sendData(evt,methodName){
    //Creacion del json con la estructura especificada
    
    if(methodName === "datos"){
        websocket.send(JSON.stringify(
                {
                    name: document.getElementById("nombre").value,
                    apellido: document.getElementById("apellido").value,
                    ciudad: document.getElementById("ciudad").value,
                    alimento: document.getElementById("alimento").value,
                    animal: document.getElementById("animal").value,
                    cosa: document.getElementById("cosa").value,
                    methodName: methodName,
                    flag:"0"
                }
                ));
    }
    else if(methodName === "letra"){
        websocket.send(JSON.stringify({
            letra: document.getElementById("letra").value,
            methodName: methodName
        }));
        alert("Inicia el juego!");
    }
}

function mostrarLetra(json){
    console.log(json.letra);
    document.getElementById("letra").value = json.letra;
}

function mostrarDatos(json){  
    console.log("MostrarDatos1");
    document.getElementById("nombreRes").value = json.name;
    document.getElementById("apellidoRes").value = json.apellido;
    document.getElementById("ciudadRes").value = json.ciudad;
    document.getElementById("alimentoRes").value = json.alimento;
    document.getElementById("animalRes").value = json.animal;
    document.getElementById("cosaRes").value = json.cosa;
    calcularPuntaje();
    websocket.send(JSON.stringify(
            {
                name: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                ciudad: document.getElementById("ciudad").value,
                alimento: document.getElementById("alimento").value,
                animal: document.getElementById("animal").value,
                cosa: document.getElementById("cosa").value,
                methodName: "datos2"
            }
            ));
}
function mostrarDatos2(json){
    console.log("MostrarDatos2");
    document.getElementById("nombreRes").value = json.name;
    document.getElementById("apellidoRes").value = json.apellido;
    document.getElementById("ciudadRes").value = json.ciudad;
    document.getElementById("alimentoRes").value = json.alimento;
    document.getElementById("animalRes").value = json.animal;
    document.getElementById("cosaRes").value = json.cosa;
    console.log("Calcular puntaje de mostrarDatos2");
    calcularPuntaje();
}
function limpiarCampos(){
    document.getElementById("nombreRes").value = "";
    document.getElementById("apellidoRes").value = "";
    document.getElementById("ciudadRes").value = "";
    document.getElementById("alimentoRes").value = "";
    document.getElementById("animalRes").value = "";
    document.getElementById("cosaRes").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("alimento").value = "";
    document.getElementById("animal").value = "";
    document.getElementById("cosa").value = "";
}