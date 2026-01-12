# 📺 MarcoSoft - Reproductor de Video Dinámico

**MarcoSoft** es una aplicación web ligera y responsiva diseñada para centralizar tus canales o fuentes de video de YouTube favoritas en una sola interfaz personalizada. Ideal para tener acceso rápido a transmisiones en vivo, listas de música o contenido educativo sin distracciones.

## 🚀 Características Principales

* **Fuentes Dinámicas:** Los videos se cargan desde un archivo `fuentes.json` externo, lo que permite actualizar la lista sin tocar el código principal.
* **Diseño Responsivo:** Interfaz optimizada para PC (reproductor a la izquierda, lista a la derecha) y dispositivos móviles (reproductor fijo en la parte superior).
* **Reproducción Fluida:** Cambio de fuentes instantáneo sin recargar la página gracias a la API de IFrame de YouTube.
* **Sticky Player:** En celulares, el video permanece fijo mientras navegas por la lista de canales.
* **Autoplay Inteligente:** Inicia el primer video automáticamente (modo silenciado por políticas de navegador).

## 🛠️ Estructura del Proyecto

📂 MarcoSoft/
├── index.html     # Estructura principal y estilos (CSS)
├── script.js      # Lógica asíncrona y control del reproductor
└── fuentes.json   # Base de datos de videos (títulos e IDs)
