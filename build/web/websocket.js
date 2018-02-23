/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Esta archivo tendrá el objetivo de crear el websocket enlazandolo con el
 * websocket endpoint anteriormente creado, para esto deberemos definir una Uri
 * como se mostrará a continuacion
 * @type String
 */

var wsUri = "ws://" + document.location.host + "/STOPGame/STOPGameendpoint";
console.log("web socket uri: " + wsUri);
var websocket = new WebSocket(wsUri);

var procesado = false;
var conectados = 0;
/**
 * Los siguientes metodos, son los metodos que relacionaran este archivo con los metodos
 * del websocket endpoint, como pueden observar sus nombres son similares, sin embargo estos
 * deben ser en minisculas
 * @param {type} evt
 * @returns {undefined}
 */
websocket.onopen=function(evt){onOpen(evt);};
websocket.onmessage = function(evt) {onMessage(evt);};
websocket.onerror = function(evt) {onError(evt);};


//Varaible que representa la salida
var output = document.getElementById("output");

/**
 * A continuacion se definirá cada uno de los diferentes metodos nombramos en la
 * parte de arriba.
 * @param {type} evt
 * @returns {undefined}
 */

//se ejecutará si ocurre algun error en la conexion
websocket.onerror=function(evt){
    console.log("Ha sucedio un error "+evt.data);
};

//Se ejecuta cuando se ha establecido la conexion con el websocket endpoint
websocket.onopen=function(evt){
    console.log("Se ha conectado a "+wsUri);
};


//En este metido es donde se recibirá toda la informacion enviada por el websocket
//esta informacion será enviado en formato json, por ende debe parsearse una vez sea recibida
websocket.onmessage=function(evt){
    console.log("Se ha recibido un mensaje del servidor:");
    
    var json= JSON.parse(evt.data);

    //Dependiendo del methodName que llegue se ejecutará un metodo diferente
    if(json.methodName==="datos" ){
            mostrarDatos(json);
        }
    if(json.methodName==="datos2"){
            mostrarDatos2(json);
    }
    if(json.methodName==="letra"){
            limpiarCampos();
            alert("Inicia el juego!");
            mostrarLetra(json);
    }
};

