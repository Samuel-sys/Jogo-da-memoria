
//Puxando os elementos do HTML pelas classes 
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form')

const validateInput = ({ target }) => {
    
    //Se o nome tiver mais de 1 caracter habilitar o butão, se não mantenha o botão desabilitado
    if(target.value.length > 1 ){ 
        
        //Remove a opção de desabilitado do botão de classe login_input da pagina
        button.removeAttribute('disabled');

        return; //Se o nome tiver menos de 2 carcters ele sai da função e retorna nulo além de não habilitar o botão
    }
    else{

        //adiciona o atribulo "disabled" (O primeiro campo e o nome do atributo depois o valor desse atributo)
        //Como o atributo disabled não precisa de nenhum valor colocamos uma string vazia
        button.setAttribute('disabled', '');
    }  


    //Pòdemos simplificar o codigo acima igual a essa linha caso queira
    //target.value.length > 1 ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
    
}

const handleSubmit = (event) =>{
    event.preventDefault();

    // Cria uma variavel no local storage com o nome do player e depois carrega a pagina de game
    localStorage.setItem("player", input.value);
    window.location = 'pages/game.html';
}

//Cria um vinculo de um evento no HTML com uma funcion no JS
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);