const library = [];
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
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.createBookCard = function () {
        const container = document.createElement('div');
        container.classList.add('book-card');

        const header = document.createElement('div');

        const title = document.createElement('span');
        title.textContent = this.title;
        title.classList.add('book-card-title');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.classList.add('edit-btn');

        const author = document.createElement('span');
        author.textContent = this.author
        author.classList.add('book-card-author');

        const pages = document.createElement('span');
        pages.textContent = this.pages;
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