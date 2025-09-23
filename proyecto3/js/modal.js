// =============================================
// MODAL DE IMÁGENES AUTOMÁTICO - MEJORADO
// =============================================
document.addEventListener("DOMContentLoaded", function () {
    // Array de imágenes (usando placeholders, reemplazar con tus propias imágenes)
    const images = [
        {
            url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            caption: "Dashboard de Gestión de Entregas",
        },
        {
            url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            caption: "Control de Inventarios",
        },
        {
            url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            caption: "Reportes y Estadísticas",
        },
        {
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            caption: "Gestión de Beneficiarios",
        },
    ];

    let currentImageIndex = 0;
    const rotatingImage = document.getElementById("rotatingImage");
    const imageCaption = document.getElementById("imageCaption");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const trigger = document.getElementById("imageModalTrigger");

    // Inicializar la primera imagen
    updateImage(0);

    // Función para cambiar la imagen
    function updateImage(index) {
        rotatingImage.src = images[index].url;
        rotatingImage.alt = images[index].caption;
        imageCaption.textContent = images[index].caption;
    }

    // Cambiar imagen automáticamente cada 5 segundos
    let imageInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage(currentImageIndex);
    }, 5000);

    // Abrir modal al hacer clic en la imagen
    trigger.addEventListener("click", () => {
        modal.classList.add("show");
        modalImage.src = images[currentImageIndex].url;
        modalCaption.textContent = images[currentImageIndex].caption;
        document.body.style.overflow = "hidden"; // Prevenir scroll

        // Detener el intervalo cuando el modal está abierto
        clearInterval(imageInterval);
    });

    // Cerrar modal
    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Permitir scroll nuevamente

        // Reanudar el intervalo cuando el modal se cierra
        imageInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateImage(currentImageIndex);
        }, 5000);
    }

    closeBtn.addEventListener("click", closeModal);

    // Navegación en el modal
    nextBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].url;
        modalCaption.textContent = images[currentImageIndex].caption;
        updateImage(currentImageIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentImageIndex =
            (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex].url;
        modalCaption.textContent = images[currentImageIndex].caption;
        updateImage(currentImageIndex);
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }

        // Navegación con teclado
        if (modal.classList.contains("show")) {
            if (event.key === "ArrowRight") {
                nextBtn.click();
            } else if (event.key === "ArrowLeft") {
                prevBtn.click();
            }
        }
    });

    // Animación de elementos al hacer scroll
    function checkScroll() {
        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("load", checkScroll);
});