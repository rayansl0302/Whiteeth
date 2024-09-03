// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll(".btn-menu-filtro");

    // Seleciona todas as seções de produtos
    const productSections = document.querySelectorAll(".produtos");

    // Seleciona a mensagem de "não há produtos" que já foi adicionada ao HTML
    const noProductsMessage = document.querySelector(".no-products");

    // Adiciona um evento de clique para cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Obtém o valor do filtro associado ao botão clicado
            const filter = button.dataset.filter;

            // Remove a classe "active" de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove("active"));

            // Adiciona a classe "active" ao botão clicado
            button.classList.add("active");

            let categoryFound = false; // Flag para verificar se a categoria foi encontrada

            // Exibe/esconde as seções de produtos com base no filtro selecionado
            productSections.forEach(section => {

                // Obtém o título da seção de produtos
                const sectionTitle = section.querySelector('h3').innerText.trim();

                // Se o filtro for "all" (todos) ou o título da seção corresponder ao filtro
                if (filter === "all" || sectionTitle === filter) {
                    section.style.display = "block"; // Exibe a seção
                    categoryFound = true; // Marca que a categoria foi encontrada
                } else {
                    section.style.display = "none"; // Esconde a seção
                }
            });

            // Se nenhuma categoria for encontrada e o filtro não for "all"
            if (!categoryFound && filter !== "all") {
                noProductsMessage.style.display = "block"; // Exibe a mensagem de "não há produtos"
            } else {
                noProductsMessage.style.display = "none"; // Esconde a mensagem de "não há produtos"
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("footer form");
    const emailInput = form.querySelector("input[type='email']");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne o envio real do formulário

        // Exibe o toast customizado
        const toast = document.createElement("div");
        toast.innerText = "Cadastro realizado com sucesso!";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.padding = "10px 20px";
        toast.style.backgroundColor = "rgba(0, 128, 0, 0.8)";
        toast.style.color = "white";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "1000";
        document.body.appendChild(toast);

        // Remove o toast após 3 segundos
        setTimeout(() => {
            toast.remove();
        }, 3000);

        // Limpa o campo de input após o envio
        emailInput.value = '';
    });
});


// Função para abrir a modal do carrinho
function abrirModalCarrinho() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';

    // Listar os produtos no carrinho
    listarProdutosCarrinho();
}

// Função para fechar a modal do carrinho
function fecharModalCarrinho() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// Função para listar os produtos do carrinho na modal
function listarProdutosCarrinho() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo antes de renderizar

    // Recupera o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    // Verifica se há produtos no carrinho
    if (carrinho['produto'] && carrinho['produto'] > 0) {
        // Renderiza o produto com botão de remoção
        const produtoElement = document.createElement('div');
        produtoElement.className = 'cart-item';
        produtoElement.innerHTML = `
        <p>Produto: ${carrinho['produto']} unidades</p>
        <button style=" width: 172px;
        height: 48px;
        padding: 12px 24px 12px 24px;
        gap: 8px;
        opacity: 0px;
        border: none;
        background-color: red;
        color: #fff;
        border-radius: 8px;
        cursor:pointer;" 
        onclick="removerProdutoDoCarrinho()">Remover Produto</button>
      `;
        cartItemsContainer.appendChild(produtoElement);
    } else {
        cartItemsContainer.innerHTML = '<p>Carrinho vazio.</p>';
    }
}

// Função para remover produto do carrinho
function removerProdutoDoCarrinho() {
    // Recupera o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

    if (carrinho['produto']) {
        carrinho['produto'] -= 1; // Decrementa a quantidade de produto

        // Se a quantidade for zero, remove o produto do carrinho
        if (carrinho['produto'] <= 0) {
            delete carrinho['produto'];
        }

        // Atualiza o localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualiza o contador de produtos no carrinho
        atualizarContadorCarrinho(carrinho['produto'] || 0);

        // Atualiza a lista de produtos na modal
        listarProdutosCarrinho();
    }
}

// Função de adicionar ao carrinho e atualizar contador e toast
function adicionarAoCarrinho() {
    let quantidade = 1;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    carrinho['produto'] = (carrinho['produto'] || 0) + quantidade;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    let totalProdutos = carrinho['produto'];

    atualizarContadorCarrinho(totalProdutos);
    mostrarToast('Produto adicionado com sucesso', totalProdutos);
}

// Função para atualizar o contador de produtos no carrinho
function atualizarContadorCarrinho(totalProdutos) {
    const cartCounterElement = document.querySelector('.cart-counter');
    if (cartCounterElement) {
        cartCounterElement.textContent = totalProdutos;
    }
}

// Função para exibir um toast na tela
function mostrarToast(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast';

    toast.innerHTML = `
      <div>${mensagem}</div>
      <button class="btn-ver-carrinho" onclick="abrirModalCarrinho()">Ver Carrinho</button>
    `;

    document.body.appendChild(toast);

    // Estilos do toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease-in-out';

    // Exibe o toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Esconde o toast após 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);

    // Adiciona evento de clique para o botão "Ver Carrinho"
    const btnVerCarrinho = toast.querySelector('.btn-ver-carrinho');
    btnVerCarrinho.addEventListener('click', () => {
        listarProdutosCarrinho(); // Abre o modal do carrinho
    });
}

// Evento de clique para adicionar produto ao carrinho
document.querySelector('.btn-assinar').addEventListener('click', adicionarAoCarrinho);

// Inicializa o contador do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    atualizarContadorCarrinho(carrinho['produto'] || 0);
});
