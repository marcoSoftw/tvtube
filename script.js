/**
 * script.js - Versión Robusta Asíncrona para MarcoSoft
 */

let player;
let listaVideos = [];

// 1. Cargar el JSON primero que nada
async function inicializarApp() {
    try {
        const res = await fetch('fuentes.json');
        if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        listaVideos = await res.json();
        
        // Una vez que tenemos los datos, creamos los botones
        crearBotones();
        
        // Si la API de YouTube ya estaba lista, inicializamos el player ahora
        if (typeof YT !== 'undefined' && YT.loaded) {
            prepararReproductor();
        }
    } catch (e) {
        console.error("Error en la carga inicial:", e);
        document.getElementById('lista-botones').innerHTML = "<p>Error al cargar canales.</p>";
    }
}

// 2. Esta función la llama la API de YouTube al cargar
function onYouTubeIframeAPIReady() {
    // Si ya tenemos los videos del JSON, inicializamos
    if (listaVideos.length > 0) {
        prepararReproductor();
    }
    // Si no, la función inicializarApp se encargará cuando termine el fetch
}

// 3. Función centralizada para crear el player
function prepararReproductor() {
    if (player) return; // Evitar duplicados

    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: listaVideos[0].id,
        playerVars: { 
            'autoplay': 1, 
            'mute': 1, 
            'rel': 0,
            'origin': window.location.origin 
        },
        events: {
            'onReady': (event) => {
                event.target.playVideo();
                const primerBtn = document.querySelector('.btn-video');
                if (primerBtn) primerBtn.classList.add('active');
            }
        }
    });
}

// 4. Crear los botones de la interfaz
function crearBotones() {
    const contenedor = document.getElementById('lista-botones');
    contenedor.innerHTML = ''; 

    listaVideos.forEach((video) => {
        const btn = document.createElement('button');
        btn.className = 'btn-video';
        btn.innerText = video.titulo;
        
        btn.onclick = (e) => {
            e.preventDefault();
            if (player && player.loadVideoById) {
                player.loadVideoById(video.id);
                resaltarBoton(btn);
            }
        };
        contenedor.appendChild(btn);
    });
}

function resaltarBoton(btnActivo) {
    document.querySelectorAll('.btn-video').forEach(b => b.classList.remove('active'));
    btnActivo.classList.add('active');
}

// LANZAR LA CARGA
inicializarApp();
