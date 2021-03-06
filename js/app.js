//Récuperation d'éléments html
const panierButton = document.querySelectorAll('.add-to-cart');
const viderPanierButton = document.querySelector('#empty-cart')
const tBody = document.querySelector('tbody');
const notif = document.getElementById('notification_container');

let totalPrice = 0;

//Ajout d'event sur les boutons 
for(let i = 0; i < panierButton.length; i++) {
    panierButton[i].addEventListener('click', ajouterPanier);
}
viderPanierButton.addEventListener('click', viderPanier);

//Clear du storage quand on arrive sur le site
window.localStorage.clear();

//Fonction permettant d'ajouter un cours dans le panier
function ajouterPanier(event) {
    //Crée la balise qui affiche le prix total si aucun cours n'est dans le panier
    if (tBody.firstChild == null) {
        const priceLi = document.createElement('li');
        const priceTxt = document.createElement('span');
        priceTxt.innerHTML = 'Prix total du panier : ' + totalPrice + '€';
        priceLi.appendChild(priceTxt);
        tBody.appendChild(priceLi);
    }
    //Rajoute un article dans le panier si la quantité est disponible
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
        let buttonSuppr = document.createElement('button');
        buttonSuppr.innerHTML = 'supprimer';
        item.appendChild(img);
        item.appendChild(txt);
        item.appendChild(buttonSuppr);
        notif.appendChild(newDiv);
        setTimeout(function(){
            notif.removeChild(newDiv);
        }, 3000);
        tBody.appendChild(item);
        buttonSuppr.addEventListener('click', supprimerPanier);
        if (window.localStorage.getItem(COURSES[attrib].title) == null) {
            window.localStorage.setItem(COURSES[attrib].title, 1);
        }else{
            let newQuantity = parseInt(window.localStorage.getItem(COURSES[attrib].title)) + 1;
            window.localStorage.setItem(COURSES[attrib].title, newQuantity);
        }
        let priceArticle = (event.target.parentElement.querySelector('.discount').innerHTML)
        .slice(0, (event.target.parentElement.querySelector('.discount').innerHTML).length - 1);
        let priceArticleNumber = parseFloat(priceArticle);
        totalPrice += priceArticleNumber;
        const newPrice = tBody.querySelector('span');
        newPrice.innerHTML = 'Prix total du panier : ' + totalPrice + '€'
    }
}
//Supprime les articles
function supprimerPanier(event){
    event.target.parentElement.remove();
    totalPrice -= 9.99;
    const newPrice = tBody.querySelector('span');
    newPrice.innerHTML = 'Prix total du panier : ' + totalPrice + '€';

    let newDiv = document.createElement('div');
    newDiv.innerHTML = "<p>Cours retirer du panier</p>";
    newDiv.className = "content";


    notif.appendChild(newDiv);
setTimeout(function(){
    notif.removeChild(newDiv);
}, 3000);

}

//Vide la panier
function viderPanier(e){
    totalPrice = 0;
    window.localStorage.clear();
    while(tBody.firstChild ){
        tBody.removeChild(tBody.firstChild);
    }
    let stockList = document.querySelectorAll('.stock');
    for(let i = 0; i < stockList.length; i++){
        stockList[i].innerHTML = COURSES[i+1].stock;
    }

    let newDiv = document.createElement('div');
    newDiv.innerHTML = "<p>Votre panier a été vidé</p>";
    newDiv.className = "content";


    notif.appendChild(newDiv);
    setTimeout(function(){
        notif.removeChild(newDiv);
    }, 3000);
}