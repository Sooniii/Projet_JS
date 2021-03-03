const panierButton = document.querySelectorAll('.add-to-cart');
const list = document.querySelector('#cart');
let allArticle = [];


function ajouterPanier() {
    id = Date.now();
    const item = document.createElement('li');
    item.setAttribute('data-key', id);
    const txt = document.createElement('span');
    txt.innerText = 'test'
    item.appendChild(txt);
    list.appendChild(item);
    allArticle.push(item);
    console.log(allArticle);
}


panierButton[0].addEventListener('click', ajouterPanier);


