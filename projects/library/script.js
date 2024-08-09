
// While const prevents you from reassigning a variable to a different value, it doesn't make the array immutable. You can still modify its contents.
const myLibrary = [];

// Commenting this out to rewrite this plain constructor as a class
// function Book(title, author, totalPageCount, readStatus) {
//   this.title = title;
//   this.author = author;
//   this.totalPageCount = totalPageCount;
//   this.readStatus = readStatus;
// }

// Book.prototype.toggleReadStatus = function() {
//   if (this.readStatus === "Read") {
//     this.readStatus = "Not Read";
//   } else {
//     this.readStatus = "Read";
//   }
// };

// Rewriting Book as a class
class Book {
  constructor(title, author, totalPageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPageCount = totalPageCount;
    this.readStatus = readStatus;
  }

  toggleReadStatus() {
    if (this.readStatus === "Read") {
      this.readStatus = "Not Read";
    } else {
      this.readStatus = "Read";
    }
  }
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const totalPageCount = document.getElementById('page-count').value;
  const readStatus = document.getElementById('is-read').checked;

  const newBook = new Book(
    title,
    author,
    totalPageCount,
    readStatus === true ? 'Read' : 'Not Read'
  );
  myLibrary.push(newBook);
  dialog.close();
  displayLibrary();
}

function displayLibrary() {
  const bookShelf = document.querySelector('.books');
  bookShelf.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = document.createElement('article');
    card.classList.add('book-card');

    const headerContainer = document.createElement('header');
    headerContainer.classList.add('book-header');
    card.appendChild(headerContainer);

    const title = document.createElement('h2');
    title.classList.add('title');
    title.innerText = book.title;
    headerContainer.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('author');
    author.innerText = book.author;
    headerContainer.appendChild(author);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('book-details');
    card.appendChild(detailsContainer);

    const totalPageCount = document.createElement('p');
    totalPageCount.classList.add('page-count');
    totalPageCount.innerText = book.totalPageCount;
    detailsContainer.appendChild(totalPageCount);

    const readStatus = document.createElement('button');
    readStatus.classList.add('read-tag');
    readStatus.innerText = book.readStatus;
    detailsContainer.appendChild(readStatus);
    readStatus.addEventListener('click', () => {
      changeReadStatus(book);
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('delete-btn');
    removeBtn.innerText = 'Remove';
    detailsContainer.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
      deleteBook(book);
    });

    bookShelf.appendChild(card);
  });
}

function deleteBook(bookToRemove) {
  const indexBookRemove = myLibrary.indexOf(bookToRemove);
  myLibrary.splice(indexBookRemove, 1);
  displayLibrary();
}

function changeReadStatus(bookToChangeStatus) {
  bookToChangeStatus.toggleReadStatus();
  displayLibrary();
}

const dialog = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');
const form = document.querySelector('form');
const closeDialogBtn = document.querySelector('.close-modal-btn');
addBookBtn.addEventListener('click', () => {
  form.reset();
  dialog.showModal();
});
closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});

const submitBtn = document.querySelector('.submit-new-book-btn');
submitBtn.addEventListener('click', (e) => {
  addBookToLibrary();
  e.preventDefault();
});
