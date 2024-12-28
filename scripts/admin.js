async function addBook(event){
 event.preventDefault();
 const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    await fetch('https://puzzled-prairie-bandicoot.glitch.me/Books',{
        method:'POST',
        headers:{'Content-Type':'aplication/json' },
        body:JSON.stringify({title,author,category,
            isAvailable:true})
        });
        alert('Book added successfully');    
    };
