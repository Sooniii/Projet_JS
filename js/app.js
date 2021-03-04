const panierButton = document.querySelectorAll('.add-to-cart');
const tBody = document.querySelector('tbody');
const notif = document.querySelector('.header')
let allArticle = [];

function ajouterPanier(event) {
    if (event.target.parentElement.querySelector('.stock').innerHTML > 0) {
        event.target.parentElement.querySelector('.stock').innerHTML -= 1;
        let src = event.target.parentElement.parentElement.querySelector('img').getAttribute('src');
        id = Date.now();
        const newDiv = document.createElement('div');
        newDiv.innerHTML = "Cours ajouter au panier <br>lolo";
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.width = 100;
        const item = document.createElement('li');
        item.setAttribute('data-key', id);
        const txt = document.createElement('span');
        let attrib = event.target.getAttribute('data-id');
        txt.innerHTML = COURSES[attrib].title + " " + COURSES[attrib].price;
        COURSES[attrib].stock -= 1;
        item.appendChild(img);
        item.appendChild(txt);
        tBody.appendChild(item);
        notif.appendChild(newDiv);
        setTimeout(function(){
            console.log('en attente');
            newDiv.innerHTML = "<br>";
            notif.removeChild(newDiv);
        }, 3000);
        allArticle.push(item);
    }
}

for(let i = 0; i < panierButton.length; i++) {
    panierButton[i].addEventListener('click', ajouterPanier);
}


