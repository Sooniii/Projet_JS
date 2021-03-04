const panierButton = document.querySelectorAll('.add-to-cart');
const tBody = document.querySelector('tbody');
const notif = document.getElementById('notif');

let allArticle = [];

for(let i = 0; i < panierButton.length; i++) {
    panierButton[i].addEventListener('click', ajouterPanier);
}

window.localStorage.clear();

function ajouterPanier(event) {
    if (event.target.parentElement.querySelector('.stock').innerHTML > 0) {
        event.target.parentElement.querySelector('.stock').innerHTML -= 1;
        let src = event.target.parentElement.parentElement.querySelector('img').getAttribute('src');
        id = Date.now();
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.width = 100;
        const item = document.createElement('li');
        item.setAttribute('data-key', id);
        const txt = document.createElement('span');
        let attrib = event.target.getAttribute('data-id');
        txt.innerHTML = COURSES[attrib].title + " " + COURSES[attrib].price;
        let newDiv = document.createElement('div');
        newDiv.innerHTML = "<p>Cours : " + COURSES[attrib].title + " " + "Cours ajouter au panier</p>";
        newDiv.className = "content";
        COURSES[attrib].stock -= 1;
        item.appendChild(img);
        item.appendChild(txt);
        notif.appendChild(newDiv);
        setTimeout(function(){
            console.log('en attente');
            notif.removeChild(newDiv);
        }, 3000);
        tBody.appendChild(item);
        allArticle.push(item);
        if (window.localStorage.getItem(COURSES[attrib].title) == null) {
            window.localStorage.setItem(COURSES[attrib].title, 1);
        }else{
            let newQuantity = parseInt(window.localStorage.getItem(COURSES[attrib].title)) + 1;
            window.localStorage.setItem(COURSES[attrib].title, newQuantity);
        }
    }
}




