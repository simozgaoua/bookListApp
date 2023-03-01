//Book Class : Represents a Book
class Book {
    constructor(title, auteur, isbn) {
        this.title = title;
        this.auteur = auteur;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                auteur: 'simo zgaoua',
                isbn: '123456'
            },
            {
                title: 'Book Two',
                auteur: 'jane doe',
                isbn: '98765'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.auteur}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentEemnet.parentEemnet.remove();
        }
    }

    static clearFeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#auteur').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles Storage

//Event : display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const autuer = document.querySelector('#auteur').value;
    const isbn = document.querySelector('#isbn').value;

    //instatiate book
    const book = new Book(title, autuer, isbn);
    //add book to UI
    UI.addBookToList(book);
    //clear feilds
    UI.clearFeilds();

});

//Event : remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //remove book from UI
    UI.deleteBook(e.target);
})