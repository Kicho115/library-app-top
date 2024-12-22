function Book (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = `${this.title} by ${this.author}, ${this.pages} pages, and ${isRead ? "already read" : 'not read yet'}`;
}