let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    let page_word;
    let read_word;

    if (pages > 1) {
      page_word = "pages";
    } else {
      page_word = "page";
    }

    if (read) {
      read_word = "read";
    } else {
      read_word = "not read yet";
    }

    return `${title} by ${author}, ${pages} ${page_word}, ${read_word}`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function createBookElement(book, index) {
  // Create new div element
  const bookElement = document.createElement("div");

  const titleSection = document.createElement("div");
  const authorSection = document.createElement("div");
  const pagesSection = document.createElement("div");
  const readSection = document.createElement("div");
  const removeButton = document.createElement("div");

  // Set classes
  bookElement.classList.add("book");
  titleSection.classList.add("book__title");
  authorSection.classList.add("book__author");
  pagesSection.classList.add("book__pages");
  readSection.classList.add("book__read");
  removeButton.classList.add("book__remove");

  titleSection.textContent = book.title;
  authorSection.textContent = book.author;
  pagesSection.textContent = `${book.pages} pages`;
  readSection.textContent = book.read ? "Read" : "Not read yet";
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", () => {
    removeBookFromLibrary(index);
    displayBooks();
  });

  // Populate with info about books
  bookElement.append(titleSection);
  bookElement.append(authorSection);
  bookElement.append(pagesSection);
  bookElement.append(readSection);
  bookElement.append(removeButton);

  return bookElement;
}

function displayBooks() {
  const booksCollection = document.querySelector(".books");
  // Clear books in the page
  while (booksCollection.firstChild) {
    booksCollection.removeChild(booksCollection.lastChild);
  }

  // Iterate through myLibrary,
  myLibrary.forEach((book, index) => {
    // createBookElement, then push each to the books section in the page
    const bookElement = createBookElement(book, index);
    booksCollection.append(bookElement);
  });
}

const formOverlay = document.querySelector(".form-overlay");
const addForm = document.querySelector(".add-form");

// Bring up the new book form on click
document.querySelector(".add-book-button").addEventListener("click", () => {
  formOverlay.classList.add("visible");
})

// Exit the form when clicking on the dimmed background
formOverlay.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;

  e.target.classList.remove("visible");
  addForm.reset();
})

addForm.addEventListener("submit", (e) => {
  const data = Object.fromEntries(new FormData(e.target).entries());
  const newBook = new Book(data.title, data.author, data.pages, data.read);
  addBookToLibrary(newBook);
  displayBooks();
  e.target.reset();
})

function debugInit() {
  myLibrary.push(
    new Book("Learning How to Learn", "Barbara Oakley", "360", true),
    new Book("The C Programming Language", "Dennis Ritchie & Brian Kernighnan", "399", true),
    new Book("The Algorithm Design Manual", "Steven S. Skiena", "902", false),
    new Book("Python Crash Course", "Eric Matthes", "544", true)
  );

  displayBooks();
}
debugInit();
