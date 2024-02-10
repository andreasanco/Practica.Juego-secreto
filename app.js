//let numueroSecreto = generarNumeroSecreto();
let numueroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = []; // se crea la variable (al principio) de la lista
let numeroMaximo = 10;

console.log (numueroSecreto);

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    
    if (numeroDeUsuario === numueroSecreto){
        asignarTextoElemento("p",`Acertaste despues de ${intentos} ${(intentos === 1) ? "intento" : "intentos"}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
        //se usa getElementById porque si tiene id dentro del html
    } else {
        //el usuario no acertó
        if(numeroDeUsuario > numueroSecreto) {
            asignarTextoElemento("p","El número secreto es menor");
        } else{
            asignarTextoElemento("p","El número secreto es mayor");
        }
        intentos++;
        limpiarCaja (); //se pone en esta parte porque solo se va a limpiar la caja si el usuario no acierta
    }
    return;
}

function limpiarCaja () {
    // se usa document para obtener un elemento
    // la parte de querySelector tambien se pudo usar getElementById
    let valorCaja =document.querySelector("#valorUsuario");
    valorCaja.value ="";
    // tambien se puede poner: document.querySelector("#valorUsuario").value ="";
}

function generarNumeroSecreto() {   // se almacena en la función que ya existe
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;    
    
    console.log (numeroGenerado); // ver cual es el numero
    console.log (listaNumerosSorteados); // ir viendo toda la lista de numeros generados

    //si ya se sortearon todos los numeros, para mostrar un mensaje y cerrar el juego
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento("p","Ya se sortearon todos los número posibles");
    } else {

        //Si el numero generado esta en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            //si el numero no esta en la lista, se meterá en la lista
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){ //la función se creo para que sea más facil de especificar todas juntas y no poner todo de nuevo por separado
    asignarTextoElemento("h1","Juego del número secreto");
    asignarTextoElemento("p",`Indica un número del 1 al ${numeroMaximo}`);
    numueroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja ();
    //indicar mensaje de intervalo de numero, generar el número aleatorio e inicializar el número de intentos
    condicionesIniciales ();
    //deshabilitar el botón de nuevo juego hasta que el usuario le atine
    document.querySelector("#reinciar").setAttribute("disabled","true");
}

condicionesIniciales (); // como se creo la función, ya solo se llama