const panierButton = document.querySelectorAll('.add-to-cart');
const viderPanierButton = document.querySelector('#empty-cart')
const tBody = document.querySelector('tbody');
const notif = document.getElementById('notification_container');

let totalPrice = 0;

for(let i = 0; i < panierButton.length; i++) {
    panierButton[i].addEventListener('click', ajouterPanier);
}
viderPanierButton.addEventListener('click', viderPanier);

window.localStorage.clear();

function ajouterPanier(event) {
    if (tBody.firstChild == null) {
        const priceLi = document.createElement('li');
        const priceTxt = document.createElement('span');
        priceTxt.innerHTML = 'Prix total du panier : ' + totalPrice + '€';
        priceLi.appendChild(priceTxt);
        tBody.appendChild(priceLi);
    }
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
        item.appendChild(img);
        item.appendChild(txt);
        notif.appendChild(newDiv);
        setTimeout(function(){
            notif.removeChild(newDiv);
        }, 3000);
        tBody.appendChild(item);
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

function viderPanier(e){
    window.localStorage.clear();
    while(tBody.firstChild ){
        tBody.removeChild(tBody.firstChild);
    }
    let stockList = document.querySelectorAll('.stock');
    for(let i = 0; i < stockList.length; i++){
        console.log(COURSES[i+1].stock);
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




