const showAvailableBooksBtn = document.getElementById('showAvailableBooks');
const showBorrowedBooksBtn = document.getElementById('showBorrowedBooks');
const bookContainer = document.getElementById('bookContainer');
const baseUrl = 'https://puzzled-prairie-bandicoot.glitch.me/Books';

// fuction to fetch books from the server

function fetchAndDisplayBooks(isAvailable){
    fetch(`${baseUrl}?isAvailable=${isAvailable}`)
    .then(response => {
        if(response.ok){
            throw new Error('Failed to fetch books');
        }
        return response.json();
    })
    .then(books => {
        bookContainer.innerHTML = '';
        books.forEach(book => {
            const bookCard = createBookCrd(book);
            bookContainer.appendChild(bookCard);
            const borrowBookBtn = bookCard.querySelector('#borrowBookBtn');
            if (borrowButton && isAvailable){
                borrowBookBtn.addEventListener('click',() => borrowBook(book));
}
const returnBookBtn = bookCard.querySelector('#returnBookBtn');
if(returnBookBtn && !isAvailable){
    returnBookBtn.addEventListener('click',() => returnBook(book));
}
        });
    })
.catch(error => {
    console.error('error fetching books',error);
alert('error fetching books.please try again later');
});
}

// function to create a book card
function createBookCrd(book){
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
    <img class="book-image" src ="${book.imageUrl}" alt="${book.title}">
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Category: ${book.category}</p>
    <p>${book.isAvailable ? 'Available' : 'Borrowed'}</p>
    ${book.isAvailable ? `<button id="borrowBookBtn">Borrow</button>` : `<button id="returnBookBtn">Return</button>`}

    `;
  return card;
}
// function to borrow a book
function borrowBook(book){
   const borrowingDuration = parseInt(prompt('Enter borrowing duration in days'));
    if(isNaN(borrowingDuration)|| borrowingDuration <= 0 || borrowingDuration > 10){
         alert('Invalid duration');
         return;
    }
    fetch(`${baseUrl}/${book.id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({isAvailable:false,borrowingDuration})
    })
    .then(response => {
        if(response.ok){
            alert('Book borrowed successfully');
            fetchAndDisplayBooks(true);
        } else{
            alert('Error borrowing book');
        }
    })
    .catch(error => {
        console.error('Error borrowing book',error);
        alert('Error borrowing book.please try again later');
    });
}
// function to return a book
function returnBook(book){
    if(confirm('Are you sure you want to return this book?${book.title}')){
        fetch(`${baseUrl}/${book.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({isAvailable:true,borrowingDuration:0})
        })
        .then(response => {
            if(response.ok){
                alert('Book returned successfully');
                fetchAndDisplayBooks(false);
            } else{
                alert('Error returning book');
            }
        })
        .catch(error => {
            console.error('Error returning book',error);
            alert('Error returning book.please try again later');
        });
    }
}

// event listeners for buttons
showAvailableBooksBtn.addEventListener('click',() => fetchAndDisplayBooks(true));
showBorrowedBooksBtn.addEventListener('click',() => fetchAndDisplayBooks(false));