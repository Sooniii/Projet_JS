const searchinput = document.getElementById('search-item')
searchinput.addEventListener('keyup', recherche);

    function recherche(event){
        const input = event.target.value.toUpperCase();

        let list = document.querySelectorAll('h4');
        let div = document.querySelectorAll('.course__item'); 

        for (let i = 0; i < list.length; i++){
            let nameCours = list[i].innerText.toUpperCase();
            if(!(nameCours.includes(input))){
                div[i].style.display = 'none';
            }else{
                div[i].style.display = 'flex';
            }
        } 
    }