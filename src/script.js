document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openModalButton = document.querySelector(".add-book");
    const closeModalButton = document.querySelector(".close-modal-btn");
    const containerCards = document.querySelector(".library-container");
    const myLibrary = [];

    // Fonction pour ouvrir le modal
    openModalButton.addEventListener("click", () => {
        modal.classList.remove("hide");
        modal.classList.add("show");
        modal.style.display = "block";
    });

    // Fonction pour fermer le modal
    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    });

    // Gestion du formulaire d'ajout de livre
    const form = modal.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formInputs = new FormData(form);
        const title = formInputs.get("title");
        const author = formInputs.get("author");
        const nbrPage = formInputs.get("nbrPage");
        const read = formInputs.get("read") === "on";

        const newBook = new Book(title, author, nbrPage, read);
        myLibrary.push(newBook);
        newBook.createCard();

        form.reset();

        modal.classList.remove("show");
        modal.classList.add("hide");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    });

    // Classe Book
    class Book {
        constructor(title, author, nbrPage, read) {
            this.title = title;
            this.author = author;
            this.nbrPage = nbrPage;
            this.read = read;
        }

        createCard() {
            const card = document.createElement("div");
            card.classList.add("book-card");

            const title = document.createElement("p");
            title.textContent = `Title: ${this.title}`;
            const author = document.createElement("p");
            author.textContent = `Author: ${this.author}`;
            const nbrPage = document.createElement("p");
            nbrPage.textContent = `Number of pages: ${this.nbrPage}`;

            const readBtn = document.createElement("button");
            readBtn.classList.add("read");
            readBtn.textContent = this.read ? "Read" : "Unread";
            this.read ? readBtn.classList.add('greenbtn') : readBtn.classList.add('redbtn');

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove";
            deleteBtn.classList.add("remove-card-btn");

            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(nbrPage);
            card.appendChild(readBtn);
            card.appendChild(deleteBtn);

            containerCards.appendChild(card);
        }
    }

    // Gestion de la suppression des cartes de livre
    containerCards.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-card-btn")) {
            event.target.parentElement.remove();
        }
    });

    // Gestion du bouton de lecture
    containerCards.addEventListener("click", function (event) {
        if (event.target.classList.contains("read")) {
            if (event.target.classList.contains("redbtn")) {
                event.target.classList.add("greenbtn");
                event.target.classList.remove("redbtn");
                event.target.textContent = "Read";
            } else {
                event.target.classList.add("redbtn");
                event.target.classList.remove("greenbtn");
                event.target.textContent = "Unread";
            }
        }
    });
});
