const library = [];
const display = document.getElementById('bookshelf-display');

addBookToLibrary('Hobbit', 'Tolkien', '342', false);
addBookToLibrary('Mistborn', 'Sanderson', '262', true);

displayLibrary();

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
}

function displayLibrary () {
    library.forEach(book => {
        book.createBookCard();
    });
}