
// Redireciona se não estiver logado

if (localStorage.getItem("adminLogado") !== "true") { // a flag "adminLogado" salva no localStorage está a ser usada
  window.location.href = "../telas/Login_adm.html";
  alert("Acesso negado. Faça login primeiro.");
  window.location.href = "../telas/Login_adm.html";
}


// SAIR DA CONTA (LOGOUT)
function logout() {
  localStorage.removeItem("adminLogado");
  window.location.href = "../telas/Login_adm.html"; // volta para o login
}


function atualizarDashboard() {
  const imoveis = obterImoveis();
  const valores = Object.values(imoveis);

  const total = valores.length;
  const disponiveis = valores.filter(imovel => imovel.status === 'disponivel').length;
  const vendidos = valores.filter(imovel => imovel.status === 'vendido').length;

  document.getElementById("totalImoveis").textContent = total;
  document.getElementById("disponiveis").textContent = disponiveis;
  document.getElementById("vendidos").textContent = vendidos;
}


// Referências
const formCadastro = document.getElementById("formCadastro");
const listaAdmin = document.getElementById("listaAdmin");

// Recupera ou inicializa os imóveis do localStorage
function obterImoveis() {
  return JSON.parse(localStorage.getItem("imoveis")) || {};
}

// Salva o objeto de imóveis no localStorage
function salvarImoveis(imoveis) {
  localStorage.setItem("imoveis", JSON.stringify(imoveis));
}

// Gera um ID único
function gerarId() {
  return "imv_" + Date.now();
}

// Cadastra novo imóvel
function cadastrarImovel(e) {
  e.preventDefault();

  const imoveis = obterImoveis();
  const id = gerarId();

  const novoImovel = {
    id,
    titulo: formCadastro.titulo.value.trim(),
    tipologia: formCadastro.tipologia.value,
    localizacao: formCadastro.localizacao.value.trim(),
    preco: formCadastro.preco.value.trim(),
    status: formCadastro.status.value,
    imagem: "../imagens/" + formCadastro.imagem.value.trim(),
    descricao: formCadastro.descricao.value.trim(),
    caracteristicas: formCadastro.caracteristicas.value.trim().split(","),
  };

  imoveis[id] = novoImovel;
  salvarImoveis(imoveis);
  formCadastro.reset();

  carregarImoveis();
  alert("Imóvel cadastrado com sucesso!");
  atualizarDashboard();

}

// Renderiza a lista de imóveis no painel admin
function carregarImoveis() {
  const imoveis = obterImoveis();
  listaAdmin.innerHTML = "";

  const values = Object.values(imoveis);

  if (values.length === 0) {
    listaAdmin.innerHTML = "<p class='text-muted'>Nenhum imóvel cadastrado.</p>";
    return;
  }

  values.forEach((imovel) => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-4 mb-4";

    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imovel.imagem}" class="card-img-top" alt="${imovel.titulo}">
        <div class="card-body">
          <h5 class="card-title">${imovel.titulo}</h5>
          <p><strong>Tipologia:</strong> ${imovel.tipologia}</p>
          <p><strong>Localização:</strong> ${imovel.localizacao}</p>
          <p><strong>Preço:</strong> ${imovel.preco}</p>
          <p><strong>Estado:</strong> <span class="badge ${imovel.status === 'disponivel' ? 'bg-success' : 'bg-secondary'}">${imovel.status}</span></p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button class="btn btn-warning btn-sm" onclick="editarImovel('${imovel.id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="excluirImovel('${imovel.id}')">Excluir</button>
        </div>
      </div>
    `;
    listaAdmin.appendChild(div);
  });
}

// Inicia a página carregando os imóveis
document.addEventListener("DOMContentLoaded", () => {
  carregarImoveis();
  atualizarDashboard();
  formCadastro.addEventListener("submit", cadastrarImovel);
});


// Editar imóvel - preenche os campos no modal
function editarImovel(id) {
  const imoveis = obterImoveis();
  const imovel = imoveis[id];

  if (!imovel) return;

  document.getElementById("idEditar").value = id;
  document.getElementById("tituloEditar").value = imovel.titulo;
  document.getElementById("precoEditar").value = imovel.preco;
  document.getElementById("statusEditar").value = imovel.status;

  const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
  modal.show();
}

// Salvar as alterações após edição
function salvarEdicao(e) {
  e.preventDefault();

  const id = document.getElementById("idEditar").value;
  const imoveis = obterImoveis();

  if (!imoveis[id]) return;

  imoveis[id].titulo = document.getElementById("tituloEditar").value.trim();
  imoveis[id].preco = document.getElementById("precoEditar").value.trim();
  imoveis[id].status = document.getElementById("statusEditar").value;

  salvarImoveis(imoveis);
  carregarImoveis();
  atualizarDashboard();
  

  const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditar"));
  modal.hide();

  alert("Imóvel atualizado com sucesso!");
}

// Excluir imóvel
function excluirImovel(id) {
  const confirmacao = confirm("Deseja realmente excluir este imóvel?");
  if (!confirmacao) return;

  const imoveis = obterImoveis();
  delete imoveis[id];
  salvarImoveis(imoveis);
  carregarImoveis();
  atualizarDashboard();


  alert("Imóvel excluído com sucesso.");
}

// Evento do formulário de edição
document.getElementById("formEditar").addEventListener("submit", salvarEdicao);

console.log(JSON.parse(localStorage.getItem('imoveis')))