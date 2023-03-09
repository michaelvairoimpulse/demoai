const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

mostrarTextoAleatorio();

function mostrarTextoAleatorio() {
  const saludos = [
    "Asistente: Hola en que te puedo ayudar?",
    "Asistente: Hola en soy el asistente virtual de Impulse en que te podemos ayudar?",
    "Asistente: Hola que información necesitas?",
  ];
  
  function generarNumeroAleatorio() {
    return Math.floor(Math.random() * saludos.length);
  }
  
  function seleccionarTextoAleatorio() {
    const indice = generarNumeroAleatorio();
    return saludos[indice];
  }
  
  result.value = seleccionarTextoAleatorio();
}


var textareaScroll = document.getElementById("result");



inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") {
    SendQuestion();
    document.getElementById("inputQuestion").value = 'Respondiendo..';
    inputQuestion.disabled = true;
  }
    
});

const OPENAI_API_KEY = "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";

function SendQuestion(){

var pregunta = document.getElementById("inputQuestion").value;

const requestOptions = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'user', 'content': 'Interpreta el Rol que eres un asistente virtual de Impulse, das respuestas cortas y precisas, no des información si mi pregunta no se trata sobre Impulse. Si mi pregunta es un saludo respóndeme con un saludo corto. Si mi pregunta está relacionada sobre donde es que estoy menciona que en el blog de Impulse. Tu base de conocimiento es: Somos Impulse Consultor de Soluciones Digitales. Nuestros servicios están diseñados para que cada consultor tenga el tiempo para aportar valor de principio a fin. Nos unimos a tu equipo para ayudarte a tomar ventaja de la tecnología y generar resultados, no solo entregables. Contamos con profesionales con años de experiencia en negocios y 100% capacitados en el uso de HubSpot. Alineamos equipos y optimizamos los procesos que te generan ingresos con una mirada integral. La forma para contactarnos es llenando el formulario en nuestra web https://impulse.lat y puedes conocer nuestros casos de éxito en https://impulse.lat/casos-de-exito. La pregunta real es la siguiente: ' + pregunta + "."}]
  })
};

fetch('https://api.openai.com/v1/chat/completions', requestOptions)
  .then(response => response.json())
  .then(function(data){
  console.log(data.choices[0].message.content);
  document.getElementById("result").value = document.getElementById("result").value + "\n\nTú: " + pregunta + "\n\nAsistente: " + data.choices[0].message.content;
  }).then(function(){
    document.getElementById("inputQuestion").value = '';
    textareaScroll.scrollTo({
      top: textareaScroll.scrollHeight,
      behavior: "smooth"
    });
    inputQuestion.disabled = false;
    inputQuestion.focus();
  })
  .catch(error => console.log(error));

}


function sendBody(){

  var texto = document.getElementById("body-post").innerText;

const requestOptions = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'user', 'content': 'Realiza un resumen de: ' + texto}]
  })
};

fetch('https://api.openai.com/v1/chat/completions', requestOptions)
  .then(response => response.json())
  .then(function(data){
  console.log(data.choices[0].message.content);
    document.getElementById("modal-resumen-box").innerHTML = "<b>Resumen:</b> <p>" + data.choices[0].message.content + '</p>';
  })
  .catch(error => console.log(error));

}


$("#asist-ia").add("#cerrar-asist").click(function(){
  $("#box-asist-ia").toggleClass("active");
})

$("#ejecutar-resumen").click(function(){
  $("#modal-resumen").toggleClass("active");
  document.getElementById("modal-resumen-box").innerText = 'Generando resumen...';
  sendBody();
});

$("#refresh-resumen").click(function(){
  document.getElementById("modal-resumen-box").innerText = 'Generando resumen...';
  sendBody();
});

$("#close-resumen").click(function(){
  $("#modal-resumen").toggleClass("active");
});

$("#listening .dale-play").click(function(){
  play(document.getElementById("body-post").innerText);
});

$("#listening .dale-pause").click(function(){
  speechSynthesis.pause();
  $(this).hide();
  $("#listening .dale-resume").show();
});

$("#listening .dale-resume").click(function(){
  speechSynthesis.resume();
  $(this).hide();
  $("#listening .dale-pause").show();
});

$("#listening .dale-stop").click(function(){
  speechSynthesis.cancel();
  $("#listening .dale-resume").hide();
  $("#listening .dale-pause").show();
});

function play(texto){
  speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
}

/**/

$("#listening-modal .dale-play").click(function(){
  playResume(document.getElementById("modal-resumen-box").innerText);
});

$("#listening-modal .dale-pause").click(function(){
  speechSynthesis.pause();
  $(this).hide();
  $("#listening-modal .dale-resume").show();
});

$("#listening-modal .dale-resume").click(function(){
  speechSynthesis.resume();
  $(this).hide();
  $("#listening-modal .dale-pause").show();
});

$("#listening-modal .dale-stop").click(function(){
  speechSynthesis.cancel();
  $("#listening-modal .dale-resume").hide();
  $("#listening-modal .dale-pause").show();
});

function playResume(texto){
  speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
}