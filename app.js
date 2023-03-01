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

        const books = Store.getBooks();

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
       if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //we will insert it before form (its parent is container) insertBefore(insert this,before this)
        container.insertBefore(div,form);

        //vanish in 3seconds
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearFeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#auteur').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      } else {
        //JSON.parse = from string to array of objects
        books = JSON.parse( localStorage.getItem('books') );
      }

      return books;
    }

    static addBook(book){
       const books = Store.getBooks();

       books.push(book);

       localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
              books.splice(index, 1);
            }
          });

        localStorage.getItem('books',JSON.stringify(books));
    }
}

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

    //validate
    if(title === '' || autuer === '' || isbn === ''){
        UI.showAlert('Please fill in all the feilds','danger');
    }
    else {
     //instatiate book
    const book = new Book(title, autuer, isbn);
    //add book to UI
    UI.addBookToList(book);

    //add book to store
    Store.addBook(book);

    //show seccess message
    UI.showAlert('Book Added','success');

    //clear feilds
    UI.clearFeilds();
    }


});

//Event : remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //remove book from UI
    UI.deleteBook(e.target);
    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show success message
    UI.showAlert('Book Removed','success');
})