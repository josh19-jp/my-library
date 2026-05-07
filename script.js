const BASE_URL = 'http://localhost:3000/books';

async function getBooks() {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    renderCards(data);

}

function renderCards(books) {
    const grid = document.getElementById('booksGrid');

    books.forEach(book => {
        const col = document.createElement('div');
        

        col.innerHTML = `
        <div class="card h-100" style="width: 18rem;">
            <img class="card-img-top" src="${book.image}" alt="${book.title}">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class= "card-text">By: ${book.author}</p>
                <p class="card-text">${book.about}</p>
                <div>
                    <button class=" btn btn-success">Edit</button>
                    <button class=" btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
        `;

        grid.appendChild(col);

    })
};

getBooks();

//------POST----
async function addBook(newBook) {
    await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
    });
    getBooks();
}




// ------PUT/PATCH
async function editBook(id, currentTitle, currentAuthor) {
    const newTitle = prompt("Edit title:", currentTitle);
    const newAuthor = prompt("Edit author:", currentAuthor);
    if (newTitle && newAuthor) {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, author: newAuthor })
        });
        getBooks();
    }
}





//-------DELETE------
async function deleteBook(id) {
    if (confirm("Delete this book?")) {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        getBooks();
    }
}





//--------SEARCH------- 
function searchBooks() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.parentElement.style.display = title.includes(input) ? 'block' : 'none';
    });
}