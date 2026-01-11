/**
 * script.js - Reproductor de YouTube Dinámico y Responsivo
 */

let player;
let listaVideos = [];

// 1. Cargar datos desde el archivo JSON externo
async function cargarDatos() {
    try {
        // Asegúrate de que el archivo se llame 'fuentes.json' y esté en la misma carpeta
        const res = await fetch('fuentes.json');
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        
        listaVideos = await res.json();
        crearBotones();
    } catch (e) {
        console.error("Error crítico al cargar el JSON:", e);
        document.getElementById('lista-botones').innerHTML = 
            '<p style="color:red; padding:10px;">Error al cargar las fuentes. Revisa la consola.</p>';
    }
}

// 2. Generar la lista de botones dinámicamente
function crearBotones() {
    const contenedor = document.getElementById('lista-botones');
    contenedor.innerHTML = ''; // Limpiar contenedor

    listaVideos.forEach((video) => {
        const btn = document.createElement('button');
        btn.className = 'btn-video';
        btn.innerText = video.titulo;
        
        btn.onclick = (e) => {
            // Prevenimos cualquier salto de scroll inesperado
            e.preventDefault();
            
            // Cambiamos el video usando el ID del JSON
            if (player && player.loadVideoById) {
                player.loadVideoById(video.id);
                resaltarBoton(btn);
            }
        };

        contenedor.appendChild(btn);
    });
}

// 3. Manejar el estado visual de los botones (active)
function resaltarBoton(btnActivo) {
    const botones = document.querySelectorAll('.btn-video');
    botones.forEach(b => b.classList.remove('active'));
    btnActivo.classList.add('active');
}

// 4. Inicializar el Reproductor cuando la API de YouTube esté lista
function onYouTubeIframeAPIReady() {
    cargarDatos().then(() => {
        if (listaVideos.length > 0) {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: listaVideos[0].id, // Carga el primer ID automáticamente
                playerVars: { 
                    'autoplay': 1, 
                    'mute': 1,      // Necesario para que el navegador permita el inicio automático
                    'rel': 0,       // No mostrar videos relacionados al final
                    'origin': window.location.origin // Mejora la compatibilidad con políticas de seguridad
                },
                events: {
                    'onReady': onPlayerReady,
                    'onError': onPlayerError
                }
            });
        }
    });
}

// Evento: El reproductor está listo
function onPlayerReady(event) {
    event.target.playVideo();
    
    // Activa visualmente el primer botón de la lista
    const primerBtn = document.querySelector('.btn-video');
    if (primerBtn) {
        primerBtn.classList.add('active');
    }
}

// Evento: Error en el reproductor (Video privado, borrado o error de red)
function onPlayerError(e) {
    console.warn("Aviso: El reproductor encontró un problema con el video o los anuncios, pero la aplicación sigue activa.", e);
}