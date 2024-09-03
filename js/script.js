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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("footer form");
    const emailInput = form.querySelector("input[type='email']");

    form.addEventListener("submit", function(event) {
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
