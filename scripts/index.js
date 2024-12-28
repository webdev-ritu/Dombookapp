function handleLogin(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === 'admin@empher.com' && password === 'empher@123'){
        localStorage.setItem('loginData',JSON.stringify({email}));
        alert('Logged in as Admin');

    }else  if (email === 'user@empher.com' && password === 'user@123'){
        localStorage.setItem('loginData',JSON.stringify({email}));
        alert('Logged in as User');
        window.location.href = 'books.html';
    }else {
        alert('Invalid Credentials');
    }
}