// Init Speech Synth
const message = new SpeechSynthesisUtterance();
// message.lang = "es-ES";
let voices = [];

// Get available voices
speechSynthesis.addEventListener("voiceschanged", () => {
    voices = speechSynthesis.getVoices();
    loadVoices(voices);
})

// DOM elements
const quotesElement = document.querySelector('.quotes');
const selectElement = document.querySelector('.custom_select');
const custom = document.querySelector(".custom");
const textareaElement = document.querySelector(".custom_textarea");

// Load select with voices
function loadVoices(voices) {
    voices.forEach(voice => {
        const {name, lang} = voice;
        const optionElement = document.createElement("option");
        optionElement.innerHTML = `${name} - ${lang}`;
        optionElement.value = name;
        selectElement.appendChild(optionElement);
    })
}

// Listen for change events on select
selectElement.addEventListener("change", (event) => {
    const name = event.target.value;
    const voice = voices.find(voice => voice.name === name);
    message.voice = voice;
})

// Listen for form submission
custom.addEventListener("submit", (event) => {
    event.preventDefault();
    const customText = textareaElement.value;
    message.text = customText;
    speechSynthesis.speak(message);
})

// App data
const quotes = [
    {
        text: "Te conviertes en lo que das tu atención",
        author: "Epictecto"
    },

    {
        text: "Las obras se tienen medio terminadas cuando se ha comenzado bien",
        author: "Séneca"
    },

    {
        text: "Es esencial que recuerdes que la atención que de les a cualqueir acción debe ser proporcional",
        author: "Marco Aurelio"
    },

    {
        text: "Si logras algo bueno con trabajo duro, el trabajo pasa rápido, pero el bien perdura. Si haces algo vergonzoso en busca del placer, el placer pasa rápidamente pero la verguenza perdura",
        author: "Musonio Rufo"
    },

    {
        text: "No es que tengamos poco tiempo, sino que perdemos mucho",
        author: "Séneca"
    },

    {
        text: "Lo innecesario, aunque cueste solo un poco, es caro",
        author: "Séneca"
    },

    {
        text: "«No nos atrevemos a muchas cosas porque son difíciles, pero son difíciles porque no nos atrevemos a hacerlas».",
        author: "Séneca",
    },

    {
        text: "«No te sabotees a ti mismo adoptando involuntariamente actitudes negativas e improductivas a través de tus relaciones con otros.»",
        author: "Epictecto",
    },

    {
        text: "«La mayoría de lo que hacemos y decimos no es esencial. Pregúntate en cada momento, ¿es esto necesario?» ",
        author: "Marco Aurelio",
    },

    {
        text: "«Toma este momento. Sumérgete en sus detalles. Responde a esta persona, este desafío, esta acción. Deja las evasiones.» ",
        author: "Epictecto",
    },
    
    {
        text: "«En cada momento mantén la atención en la tarea que tienes entre manos. Realiza cada tarea como si fuera la última, evitando la distracción, el drama, la vanidad y la queja por tu situación.» ",
        author: "Marco Aurelio",
    },

    {
        text: "«Que no te arrastren los accidentes exteriores; procúrate tiempo libre para aprender algo bueno y cesa ya de girar como un trompo.»  ",
        author: "Marco Aurelio",
    },

    {
        text: "«Largo es el camino de la enseñanza por medio de teorías; breve y eficaz por medio de la práctica»",
        author: "Séneca",
    },
];

// Load quotes in the DOM
quotes.forEach(quote => {
    const {text, author} = quote
    const quoteTemplate = `
    <section class="quote">
    <h2 class="quote_text">${text}</h2>
    <h5 class="quote_author">${author}</h5>
    </section>
    `
    quotesElement.innerHTML += quoteTemplate;
})

// Listen for clicks on quotes
const quotesCollection = document.querySelectorAll('.quote');
quotesCollection.forEach(quotesElement => {
    quotesElement.addEventListener('click', (event) => {
        message.text = event.target.innerHTML;
        speechSynthesis.speak(message);
    })
})

// Listen for errors
try{
    const name = "Carmen"
} catch(error){
    console.error(error.message);
    message.text = error.message;
    speechSynthesis.speak(message);
}

console.log(voices);
