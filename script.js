const library = [];
let idCount = 0;
const display = document.getElementById('bookshelf-display');
const addBookBtn = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const form = document.querySelector('form');
const submitBookBtn = document.getElementById('submit-form-btn');

addBookToLibrary('Hobbit', 'Tolkien', '342', false);
addBookToLibrary('Mistborn', 'Sanderson', '262', true);

addBookBtn.addEventListener('click', () => addBookModal.showModal());
closeModalBtn.addEventListener('click', () => addBookModal.close());

display.addEventListener('click', (e) => {
    const card = e.target.closest('.book-card');
    if (!card) return;

    const id = card.dataset.bookId;
    const book = library.find((book) => book.id == id);

    //console.log(e.target);

    if (e.target.matches('.edit-btn')) {
        // edit book logic
    } else if (e.target.matches('.book-card-isRead')) {
        book.toggleRead(e.target);
    }
})

submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Display error message if the input is invalid
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const title = document.getElementById('form-title').value;
    const author = document.getElementById('form-author').value;
    const pages = document.getElementById('form-pages').value;
    const isRead = document.getElementById('form-isRead').checked;

    if (!title || !author || !pages) {
        return;
    }

    addBookToLibrary(title, author, pages, isRead);
    form.reset();

    // Prevent the navigator from showing error messages when opening the form again
    form.classList.remove('was-validated');

    addBookModal.close();
})


function Book (title, author, pages, isRead) {
    this.id = idCount++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.createBookCard = function () {
        const container = document.createElement('div');
        container.classList.add('book-card');
        container.dataset.bookId = this.id;

        const header = document.createElement('div');

        const title = document.createElement('span');
        title.textContent = this.title;
        title.classList.add('book-card-title');

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>';
        editBtn.classList.add('edit-btn');

        const author = document.createElement('span');
        author.textContent = `By ${this.author}`
        author.classList.add('book-card-author');

        const pages = document.createElement('span');
        pages.textContent = `${this.pages} pages`;
        pages.classList.add('book-card-pages');

        const isRead = document.createElement('button');
        isRead.textContent = this.isRead ? 'Read' : 'Not read';
        isRead.classList.add('book-card-isRead');
        isRead.classList.add(this.isRead ? 'read' : 'unread');
        
        header.appendChild(title);
        header.appendChild(editBtn);
        display.appendChild(container);
        container.appendChild(header);
        container.appendChild(author);
        container.appendChild(pages);
        container.appendChild(isRead);
    }
    this.toggleRead = function (isReadBtn) {
        this.isRead = !this.isRead;
        isReadBtn.classList.remove(this.isRead ? 'unread' : 'read');
        isReadBtn.classList.add(this.isRead ? 'read' : 'unread')
        isReadBtn.textContent = this.isRead ? 'Read' : 'Not read';
    }
}

function addBookToLibrary (title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.push(book);
    displayLibrary();
}

function displayLibrary () {
    display.innerHTML = '';
    library.forEach(book => {
        book.createBookCard();
    });
}