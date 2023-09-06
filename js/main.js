const form = document.querySelector('#novoItem');
const  listItems = document.querySelector('#lista');
const  itens = JSON.parse(localStorage.getItem('Itens')) || []

itens.forEach((element) => {
    criarElemento(element)
})

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputName = event.target.elements['nome'];
    const inputAmount = event.target.elements['quantidade']

    const exiteItem = itens.find( element => element.name === inputName.value);

    const item = {
        name: inputName.value,
        amount: inputAmount.value,
    };


    if(exiteItem){
        item.id = exiteItem.id;
        atualizarElemento(item)
    }else {
        item.id = itens.length;
        criarElemento(item)
        itens.push(item);
    }

    localStorage.setItem("Itens", JSON.stringify(itens));
    limpaInput([inputName, inputAmount]);
})

function criarElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.amount;
    numeroItem.dataset.id = item.id
    //appendChild - Adicionei um Objeto HTML em outro HTML
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.name;

    listItems.appendChild(novoItem)

}

function atualizarElemento(item) {
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount
}

function limpaInput(inputs = []) {

    inputs.forEach( (input) => {
        input.value = '';
    })
}