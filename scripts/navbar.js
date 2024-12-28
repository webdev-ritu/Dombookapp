document.addEventListener('DOMContentLoaded',() =>{
    fetch('navbar.html')
    .then(response => response.text())
    .then(data=>{
        document.getElementById('navbar').innerHTML = data;
    });
});
function logout(){
    localStorage.removeItem('loginData');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}