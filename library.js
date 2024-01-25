"use strict"

const booksContainer = document.getElementById("books");
// const openForm = document.getElementById("empty-book");
const addBookBtn = document.getElementById("add-book");

const bookLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
  new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, false),
  new Book("Treasure Island", "Robert Louis Stevenson", 292, true),
  new Book("The Jungle Book", "Rudyard Kipling", 0, false),
];

populateBooks();

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    const read = this.isRead ? "has been read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`
  }
}

function populateBooks() {
  bookLibrary.forEach(book => createBookElement(book));
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  const titleEl = document.createElement("h2");
  const authorEl = document.createElement("p");
  const pagesEl = document.createElement("span");
  let isReadEl = document.createElement("input");
  isReadEl.setAttribute("type", "checkbox");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  isReadEl.setAttribute("id", "isRead");
  deleteBtn.setAttribute("id", "delete");
  bookElement.setAttribute("id", "book");

  titleEl.textContent = book.title;
  authorEl.textContent = book.author;
  pagesEl.textContent = book.pages > 0 ? `${book.pages} pages` : "";
  isReadEl.checked = book.isRead;

  bookElement.appendChild(titleEl);
  bookElement.appendChild(authorEl);
  bookElement.appendChild(pagesEl);
  bookElement.appendChild(deleteBtn);
  bookElement.appendChild(isReadEl);
  booksContainer.prepend(bookElement);

  deleteBtn.addEventListener("click", function () {
    const ind = bookLibrary.indexOf(book);
    bookLibrary.splice(ind, 1);
    bookElement.remove();
  })

  isReadEl.addEventListener("change", function () {
    book.isRead = this.checked;
  })

  return [bookElement, titleEl, authorEl, pagesEl];
}

addBookBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  if (!title) return;

  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("is-read").checked;

  const book = new Book(title, author, pages, isRead);
  bookLibrary.push(book);

  createBookElement(book);
});