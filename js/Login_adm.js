// VERIFICAR SE O USUÁRIO ESTÁ LOGADO

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("nome_user").value.trim();
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    // Salva flag de login no localStorage
    localStorage.setItem("adminLogado", "true");
    window.location.href = "Admin_Imoveis.html";
  } else {
    alert("Credenciais inválidas. Tente novamente.");
  }
});
