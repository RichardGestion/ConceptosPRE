//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"Documento que detalla los procedimientos y acciones a seguir en caso de una situación de emergencia, ya sea natural, provocada por el hombre, o cualquier otra situación grave que amenace la vida.",
        op0:"plan de respuesta a emergencias (PRE)",
        op1:"Emergencia.",
        op2:"Desatre.",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"Situación inesperada y generalmente peligrosa que requiere atención inmediata debido a que representa un riesgo grave para la salud, la vida, la propiedad o el medio ambiente.",
        op0:"plan de respuesta a emergencias (PRE)",
        op1:"Emergencia.",
        op2:"Desatre.",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"Evento que causa daños significativos y que la comunidad afectada no puede manejar utilizando únicamente sus propios recursos.",
        op0:"plan de respuesta a emergencias (PRE)",
        op1:"Emergencia.",
        op2:"Desatre.",
        correcta:"2"
    },
    {
        id:3,
        pregunta:"Área designada y segura donde las personas se reúnen después de una evacuación por una emergencia.",
        op0:"Punto de encuentro.",
        op1:"Ruta de evacuación.",
        op2:"Evacuación.",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"Camino continuo y seguro, debidamente señalizado, que permite a las personas abandonar un edificio.",
        op0:"Punto de encuentro.",
        op1:"Ruta de evacuación.",
        op2:"Evacuación.",
        correcta:"1"
    },
    {
        id:5,
        pregunta:"Movimiento planificado y organizado de personas hacia un lugar seguro.",
        op0:"Punto de encuentro.",
        op1:"Ruta de evacuación.",
        op2:"Evacuación.",
        correcta:"2"
    },
    {
        id:6,
        pregunta:"Es una instalación o ubicación centralizada donde se coordinan las acciones de respuesta ante situaciones de crisis o desastres.",
        op0:"Centro de Gestión Emergencia.",
        op1:"Coordinador de Emergencia.",
        op2:"Organización de Respuesta Emergencia.",
        correcta:"0"
    },
    {
        id:7,
        pregunta:"Persona responsable de planificar, organizar y dirigir las acciones necesarias para responder a situaciones de emergencia.",
        op0:"Centro de Gestión Emergencia.",
        op1:"Coordinador de Emergencia.",
        op2:"Organización de Respuesta Emergencia.",
        correcta:"1"
    },
    {
        id:8,
        pregunta:"Grupo de personas, equipos y procedimientos diseñados para responder de manera efectiva ante situaciones de emergencia.",
        op0:"Centro de Gestión Emergencia.",
        op1:"Coordinador de Emergencia.",
        op2:"Organización de Respuesta Emergencia (ORE).",
        correcta:"2"
    },
    {
        id:9,
        pregunta:"Es un aviso oficial que busca proteger a la población ante situaciones de peligro, proporcionando información y directrices para actuar de manera segura.",
        op0:"Alerta.",
        op1:"Alarma",
        op2:"Sonido",
        correcta:"0"
    },
    {
        id:10,
        pregunta:"Es un sistema de sonido que está implementado y que se activa ante una emergencia, notificando al usuario que algo está pasando.",
        op0:"Alerta.",
        op1:"Alarma",
        op2:"Sonido",
        correcta:"1"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}