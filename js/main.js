const form = document.querySelector('#novoItem');
const  listItems = document.querySelector('#lista');
const  itens = JSON.parse(localStorage.getItem('Itens')) || [];
const  apagarLista = document.querySelector(".apagar");
const  tagTitulo = document.querySelector(".title");
const inputTitle = document.querySelector('#titulo')
const buttonTitulo = document.querySelector('.AddTitulo')
itens.forEach((element) => {
    criarElemento(element)
})

const  title = localStorage.getItem('Titulo');
criarTitulo(title);
inputTitle.value = title;

buttonTitulo.addEventListener("click", () => {
    localStorage.setItem("Titulo", inputTitle.value)
    criarTitulo(inputTitle.value)
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
        atualizarElemento(item);
        itens[itens.findIndex(elemento => elemento.id === exiteItem.id)] = item;

    }else {
        item.id = itens[itens.length-1] ? itens[itens.length-1].id + 1 : 0;
        criarElemento(item)
        itens.push(item);
    }

    localStorage.setItem("Itens", JSON.stringify(itens));
    limpaInput([inputName, inputAmount]);
})

function criarTitulo(itemTitulo) {
    tagTitulo.innerHTML = itemTitulo
}
apagarLista.addEventListener("click", () => {
    deleteList()
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
    novoItem.appendChild(Botaodeletar(item.id))

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

function deletarElemento(elemento, id) {
    elemento.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id),1 )
    localStorage.setItem("Itens", JSON.stringify(itens));
}

function Botaodeletar(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = 'X';

    elementoBotao.addEventListener("click", function () {
        deletarElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deleteList() {
    itens.splice(0, itens.length)
    localStorage.removeItem("Titulo");
    localStorage.removeItem("Itens");
    location.reload();


}