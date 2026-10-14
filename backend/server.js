const express = require("express");

const cors = require("cors");

const path = require("path");

const series = require("./data/series.json");


const app = express();

const PORT = 3000;

app.use(cors());

app.use(
  "/fotos",
  express.static(
    path.join(__dirname, "data/fotos")
  )
);


function sortear(array) {
  const indice = Math.floor(Math.random() * array.length);
  return array[indice];
}


app.get("/api/series/aleatorio", (req, res) => {

  const todasAsFotos = Object.values(series).flat();

  const item = sortear(todasAsFotos);


  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`
  });
});


app.get("/api/series/:categoria", (req, res) => {
 
  const categoria = req.params.categoria.toLowerCase();

 
  if (!series[categoria]) {
    res.status(404).json({
      status: "error",
      message: `Série "${categoria}" não encontrada. Categorias disponíveis: gilmore girls, o mentalista, smallville, stranger things.`
    });
    return; 
  }

  const item = sortear(series[categoria]);


  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`
  });
});



app.listen(PORT, () => {
  console.log(`🎬 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Ficheiros de imagem carregados em: data/fotos/`);
});