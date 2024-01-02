document.querySelector('button').addEventListener('click', getBooks)
// Set Shelf
const booksContainer = document.getElementById('booksContainer');

// Render books from localStorage immediately when the script loads:  IIFE (Immediately Invoked Function Expression)
(function renderBooks() {
  let books = JSON.parse(localStorage.getItem('books') || '[]');
  // loop through books and render on DOM
  books.forEach(book => {
    const bookItem = createBookItem(book);
    booksContainer.appendChild(bookItem)
  });
})();

// Setup book
function createBookItem(title) {
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-item');
  bookItem.textContent = title;  // Set book title
  return bookItem;
}

// Function to fetch book by ISBN: International Standard Book Number
function getBooks() {
  // Get book ISBN 
  const ISBN_NUMBER = document.getElementById('book-entry').value;
  
  // Books ISBN API url
  const url = `https://openlibrary.org/isbn/${ISBN_NUMBER}.json`

  // Fetch books via API
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.title)
    // Add book to bookshelf
    const newBookItem = createBookItem(data.title)
    booksContainer.appendChild(newBookItem);

    // Update in local Storage
    let books = JSON.parse(localStorage.getItem('books') || '[]'); // If 'books' doesn't exist
    books.push(data.title)
    // Add book to storage array
    localStorage.setItem("books", JSON.stringify(books))
    })
    .catch(err => {
      console.log('An error occurred:', err)
    })
}

// Condition if Local Storage is empty
// if (!localStorage.getItem('books')) {
//   localStorage.setItem('books', data.title)
// } else {

// }