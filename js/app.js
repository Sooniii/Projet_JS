const panierButton = document.querySelectorAll('.add-to-cart');
const tBody = document.querySelector('tbody');
let allArticle = [];

for(let i = 0; i < panierButton.length; i++) {
    panierButton[i].addEventListener('click', ajouterPanier);
}

//window.localStorage.clear();

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
        COURSES[attrib].stock -= 1;
        item.appendChild(img);
        item.appendChild(txt);
        tBody.appendChild(item);
        allArticle.push(item);
        console.log(window.localStorage.getItem(COURSES[attrib].title));
        if (window.localStorage.getItem(COURSES[attrib].title) == null) {
            window.localStorage.setItem(COURSES[attrib].title, 1);
        }else{
            let newQuantity = parseInt(window.localStorage.getItem(COURSES[attrib].title)) + 1;
            window.localStorage.setItem(COURSES[attrib].title, newQuantity);
        }
    }
}




