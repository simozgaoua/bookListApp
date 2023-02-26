//Book Class : Represents a Book
class Book{
    constractor(title,auteur,isbn){
       this.title = title;
       this.auteur = auteur;
       this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks

class UI{
    static displayBooks(){
        const StoredBooks = [
            {
                title : 'Book One',
                auteur : 'simo zgaoua',
                isbn : '123456'
            },
            {
                title : 'Book Two',
                auteur: 'jane doe',
                isbn : '98765'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
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
}

// Store Class: Handles Storage

//Event : display Book
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event : add Book

//Event : remove Book