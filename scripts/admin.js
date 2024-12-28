const baseUrl = 'https://puzzled-prairie-bandicoot.glitch.me/Books'; 

// Check if admin is logged in
const loginData = JSON.parse(localStorage.getItem('loginData'));
if (!loginData || loginData.role !== 'admin') {
    alert('Admin Not Logged In.');
    window.location.href = 'index.html';
}

// Add Book Form
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const newBook = {
        title,
        author,
        category,
        isAvailable: true,
        isVerified: false,
        borrowedDays: null,
        imageUrl: '' 
    };

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Book Added Successfully.');
        fetchAndDisplayBooks();
    })
    .catch(error => {
        console.error('Error adding book:', error);
        alert('Error adding book. Please try again later. Details:', error.message);
    });
});

// Fetch and display books
function fetchAndDisplayBooks() {
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(books => {
            const bookContainer = document.getElementById('bookContainer');
            bookContainer.innerHTML = '';

            books.forEach(book => {
                const bookCard = createBookCard(book);
                bookContainer.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            alert('Error fetching books. Please try again later. Details:', error.message);
        });
}


    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
    
        const title = document.createElement('h3');
        title.textContent = book.title;
        card.appendChild(title);
    
        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);
    
        const category = document.createElement('p');
        category.textContent = `Category: ${book.category}`;
        card.appendChild(category);
    
        const availability = document.createElement('p');
        availability.textContent = `Available: ${book.isAvailable ? 'Yes' : 'No'}`;
        card.appendChild(availability);
    
        const verified = document.createElement('p');
        verified.textContent = `Verified: ${book.isVerified ? 'Yes' : 'No'}`;
        card.appendChild(verified);
        
        // Verify Book button
        const verifyButton = document.createElement('button');
        verifyButton.textContent = 'Verify Book';
        verifyButton.disabled = book.isVerified; // Disable button if already verified

    verifyButton.addEventListener('click', () => {
        if (confirm(`Are you sure to Verify ${book.title}?`)) {
            fetch(`${baseUrl}/${book.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isVerified: true })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                verifyButton.disabled = true; // Disable button after verification
                fetchAndDisplayBooks();
            })
            .catch(error => {
                console.error('Error verifying book:', error);
                alert('Error verifying book. Please try again later. Details:', error.message);
            });
        }
    });

    // Delete Book button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Book';

    deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure to Delete ${book.title}?`)){
            fetch(`${baseUrl}/${book.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchAndDisplayBooks();
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert('Error deleting book. Please try again later. Details:', error.message);
            });
        }
    });

    // Append buttons to the card
    card.appendChild(verifyButton);
    card.appendChild(deleteButton);

    return card;
}

// Fetch and display books on page load
fetchAndDisplayBooks();