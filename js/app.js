const panierButton = document.querySelectorAll('.fa fa-cart-plus');
const list = document.querySelector('#cart');
let allArticle = [];


function ajouterPanier() {
    id = Date.now();
    const item = document.createElement('li');
    item.setAttribute('data-key', id);
    const txt = document.createElement('span');
    txt.innerText = 'test'
    list.appendChild(item);
    allArticle.push(item);
    console.log(allArticle);
}


panierButton.addEventListener('click', ajouterPanier);


