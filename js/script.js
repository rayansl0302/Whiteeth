document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-menu-filtro");
    const productSections = document.querySelectorAll(".produtos");
    const noProductsMessage = document.querySelector(".no-products");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
  
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        let categoryFound = false;
  
        // Show/Hide sections based on filter
        productSections.forEach(section => {
          const sectionTitle = section.querySelector('h3').innerText.trim();
          if (filter === "all" || sectionTitle === filter) {
            section.style.display = "block";
            categoryFound = true;
          } else {
            section.style.display = "none";
          }
        });
  
        // Handle categories with no products
        if (!categoryFound && filter !== "all") {
          noProductsMessage.style.display = "block";
        } else {
          noProductsMessage.style.display = "none";
        }
      });
    });
  });