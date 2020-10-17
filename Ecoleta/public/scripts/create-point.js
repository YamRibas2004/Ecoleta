
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {

                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {

                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }


            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id



    //verificar se existem items selecionados, se sim 
    //Pegar os items selecionados

    const alerySelected = selectefItems.findIndex(item => {
        const itemFound = item == itemId  //Isoo será true ou false
        return itemFound

    })

    //Se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar de selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiffrent = item != itemId // false
            return itemIsDiffrent
        })

        selectedItems = filteredItems

    } else {
        // se não estiver selecionado 
        // adicionar á seleção
        selectedItems.push(itemId)


    }

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems

}
