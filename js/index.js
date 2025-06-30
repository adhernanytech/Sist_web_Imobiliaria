const imoveis = {
  talatona_apt: {
    titulo: "Apartamento T3 em Talatona",
    tipologia: "T3",
    localizacao: "Talatona",
    descricao:
      "Apartamento moderno com suíte e varanda, localizado em condomínio fechado.",
    imagem: "../imagens/apartamento1.webp",
    preco: "80.000.000 KZ",
    status: "disponivel",
    caracteristicas: [
      "3 Quartos (1 suíte)",
      "2 Casas de banho",
      "Cozinha equipada",
      "Estacionamento privativo",
    ],
  },
  miramar_vivenda: {
    titulo: "Vivenda Luxuosa em Miramar",
    tipologia: "T5",
    localizacao: "Miramar",
    descricao:
      "Casa espaçosa com jardim e piscina, ideal para famílias grandes.",
    imagem: "../imagens/apartamento-panamby.jpg",
    preco: "150.000.000 KZ",
    status: "disponivel",
    caracteristicas: [
      "5 Quartos",
      "Piscina e Jardim",
      "Garagem para 4 viaturas",
      "Área de lazer com churrasqueira",
    ],
  },
  benfica: {
    titulo: "Apartamento T2",
    tipologia: "T2",
    localizacao: "Benfica",
    descricao:
      "Casa espaçosa com jardim e piscina, ideal para famílias grandes.",
    imagem: "../imagens/findHouse.jpg",
    preco: "150.000.000 KZ",
    status: "disponivel",
    caracteristicas: [
      "2 Quartos",
      "1 Casa de banho",
      "Cozinha equipada",
      "Sala de estar ampla",
      "Varanda com vista",
    ],
  },
};

const lista = document.getElementById("lista-imoveis");
lista.innerHTML = "";

for (const [id, imovel] of Object.entries(imoveis)) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4 mb-5";

  col.innerHTML = `
  <div class="card h-100 shadow-sm">
    <img src="${imovel.imagem}" class="card-img-top" alt="${
    imovel.titulo
  }" onclick="abrirModal('${id}')">
    <div class="card-body">
      <h5 class="card-title">${imovel.titulo}</h5>
      <p class="card-text"><strong>Tipologia:</strong> ${imovel.tipologia}</p>
      <p class="card-text"><strong>Localização:</strong> ${
        imovel.localizacao
      }</p>
      <p class="card-text">${imovel.descricao.substring(0, 60)}...</p>
      <p class="fw-bold" style="color: rgba(231, 94, 2, 0.904)">Preço: ${imovel.preco}</p>
      <span class="badge ${
        imovel.status === "disponivel" ? "bg-success" : "bg-secondary"
      }">
        ${imovel.status === "disponivel" ? "Disponível" : "Vendido"}
      </span>
    </div>
  </div>
`;

  lista.appendChild(col);
}

// Filtro de pesquisa
const pesquisaInput = document.getElementById("pesquisaInput");
pesquisaInput?.addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const cards = document.querySelectorAll("#lista-imoveis .card");

  cards.forEach((card) => {
    const titulo = card.querySelector(".card-title").textContent.toLowerCase();
    const descricao = card
      .querySelector(".card-text")
      .textContent.toLowerCase();
    const visivel = titulo.includes(termo) || descricao.includes(termo);
    card.parentElement.style.display = visivel ? "block" : "none";
  });
});

function abrirModal(id) {
  const imovel = imoveis[id];
  document.getElementById("tituloModal").textContent = imovel.titulo;
  document.getElementById("descricaoModal").textContent = imovel.descricao;
  document.getElementById("imagemModal").src = imovel.imagem;
  document.getElementById("imagemModal").alt = "Imagem de " + imovel.titulo;
  document.getElementById("precoModal").textContent = "Preço: " + imovel.preco;
  document.getElementById("statusModal").textContent =
  "Status: " + (imovel.status === "disponivel" ? "Disponível" : "Vendido");

  const listaCaracteristicas = document.getElementById("caracteristicasModal");
  listaCaracteristicas.innerHTML = "";
  imovel.caracteristicas.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = item;
    listaCaracteristicas.appendChild(li);
  });

  const modal = new bootstrap.Modal(document.getElementById("modalDescricao"));
  modal.show();
}
