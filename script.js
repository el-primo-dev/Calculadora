const temas = {
  "Festa Junina": ["quadrilha", "milho", "bandeirinha", "balao", "fogos"],
  "Tecnologia": ["javascript", "computador", "internet", "teclado", "software"],
  "Animais": ["cachorro", "elefante", "gato", "pinguim", "leopardo"],
  "Comidas": ["lasanha", "hamburguer", "sushi", "feijoada", "brigadeiro"]
};

const temaSelect = document.getElementById("tema");
Object.keys(temas).forEach(t => {
  const o = document.createElement("option"); o.value = t; o.textContent = t;
  temaSelect.appendChild(o);
});

let palavra, arrayPalavra, letrasMostradas, letrasChutadas, chances;

function novaPalavra() {
  const lista = temas[temaSelect.value];
  palavra = lista[Math.floor(Math.random()*lista.length)].toLowerCase();
  arrayPalavra = palavra.split("");
  letrasMostradas = Array(arrayPalavra.length).fill("_");
  letrasChutadas = [];
  chances = 6;
  atualizarUI();
}

function atualizarUI() {
  document.getElementById("palavra").textContent = letrasMostradas.join(" ");
  document.getElementById("chutadas").textContent = "Letras: " + (letrasChutadas.join(" ") || "-");
  document.getElementById("chances").textContent = "Chances: " + chances;
  document.getElementById("mensagem").textContent = "";
  document.getElementById("letra").value = "";
  document.getElementById("letra").focus();
}

document.getElementById("nova").addEventListener("click", novaPalavra);
document.getElementById("chutar").addEventListener("click", () => {
  const chute = document.getElementById("letra").value.toLowerCase();
  if (!chute || chute.length !== 1) return;
  if (letrasChutadas.includes(chute)) { document.getElementById("mensagem").textContent = "Você já tentou essa letra."; return; }
  letrasChutadas.push(chute);
  if (arrayPalavra.includes(chute)) {
    arrayPalavra.forEach((c,i) => { if (c === chute) letrasMostradas[i] = chute; });
  } else {
    chances--;
  }
  atualizarUI();
  if (!letrasMostradas.includes("_")) document.getElementById("mensagem").textContent = "🎉 Você venceu!";
  if (chances <= 0) document.getElementById("mensagem").textContent = `💀 Game over — palavra: ${palavra}`;
});

// Inicializa
novaPalavra();
