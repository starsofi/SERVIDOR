
const serieImage = document.getElementById("serieImage");

const serieName = document.getElementById("serieName");

const randomBtn = document.getElementById("randomBtn");

const searchBtn = document.getElementById("searchBtn");

const serieInput = document.getElementById("serieInput");

const serieArea = document.querySelector(".serie-area");


const API = "http://localhost:3000/api/series";


async function buscarSerie(url) {
   
    serieArea.classList.add("loading");

    try {
       
        const response = await fetch(url);
      
        const data = await response.json();
        console.log("Resposta da API:", data);

      
        if (data.status === "error") {
            serieName.textContent = data.message;
            serieImage.src = "";
            return;
        }

        serieImage.src = data.message;

        const partes = data.message.split("/");
        
       
        const serie = decodeURIComponent(partes[partes.length - 2]);

        serieName.textContent = serie.charAt(0).toUpperCase() + serie.slice(1);

    } catch (erro) {
        
        console.error("Erro de conexão:", erro);
        serieName.textContent = "⚠️ Servidor offline! Por favor, inicie o servidor rodando 'node server.js'";
        serieImage.src = "";
    } finally {
      
        serieArea.classList.remove("loading");
    }
}


function serieAleatoria() {
    buscarSerie(`${API}/aleatorio`);
}


function buscarPorSerie() {
    const serie = serieInput.value.trim().toLowerCase();

    if (!serie) {
        alert("Digite o nome de uma série!");
        return;
    }

    buscarSerie(`${API}/${encodeURIComponent(serie)}`);
}


randomBtn.addEventListener("click", serieAleatoria);


searchBtn.addEventListener("click", buscarPorSerie);


serieImage.addEventListener("click", serieAleatoria);


serieInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buscarPorSerie();
    }
});


serieAleatoria();