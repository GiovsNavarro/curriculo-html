const API_URL = "http://localhost:3000/usuarios";

/* ========= CADASTRAR ========= */
function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "" || idade === "") {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = "Cadastro realizado com sucesso!";
    mensagem.style.color = "green";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
}
/* ========= LISTAR ========= */
function listarUsuarios() {
    fetch(API_URL)
        .then(res => res.json())
        .then(usuarios => {
            const lista = document.getElementById("lista");
            if (!lista) return; // evita erro no index.html

            lista.innerHTML = "";

            usuarios.forEach(user => {
                const li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.marginBottom = "8px";

                const texto = document.createElement("span");
                texto.textContent = `${user.nome} - ${user.email} - ${user.idade} anos`;

                const botoes = document.createElement("div");

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.style.marginRight = "6px";
                btnEditar.onclick = () => editarUsuario(user);

                const btnExcluir = document.createElement("button");
                btnExcluir.textContent = "Excluir";
                btnExcluir.onclick = () => excluirUsuario(user.id);

                botoes.appendChild(btnEditar);
                botoes.appendChild(btnExcluir);

                li.appendChild(texto);
                li.appendChild(botoes);
                lista.appendChild(li);
            });
        });
}

/* ========= EXCLUIR ========= */
function excluirUsuario(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => listarUsuarios());
}

/* ========= EDITAR ========= */
function editarUsuario(user) {
    const novoNome = prompt("Novo nome:", user.nome);
    const novoEmail = prompt("Novo email:", user.email);
    const novaIdade = prompt("Nova idade:", user.idade);

    if (!novoNome || !novoEmail || !novaIdade) return;

    fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: novoNome,
            email: novoEmail,
            idade: Number(novaIdade)
        })
    })
    .then(() => listarUsuarios());
}

/* ========= UTIL ========= */
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("idade").value = "";
}
function toggleSecao(elemento) {
    const conteudo = elemento.nextElementSibling;
    const seta = elemento.querySelector(".seta");

    if (conteudo.style.display === "block") {
        conteudo.style.display = "none";
        seta.textContent = "▶";
    } else {
        conteudo.style.display = "block";
        seta.textContent = "▼"; }
}

/* ========= INICIAR ========= */

listarUsuarios();
