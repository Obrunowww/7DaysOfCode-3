const menu = document.querySelector(".menu")
let MenuEstáAberto = false

const Modos = document.querySelector("select")







const mostrarMenu = () => {
    MenuEstáAberto = true

    const Off = () => {
        menuGrande.style.animation = `IrParaEsquerda ease 2s`
        setTimeout(() => {
            menuGrande.remove()
            MenuEstáAberto = false
            main.appendChild(menu)
        }, 1500);
    }


    const criarOpções = () => {

        const div = document.createElement('div')

        const label = document.createElement('label');
        label.setAttribute('for', 'modos');
        label.textContent = 'Modos:';
    
        const select = document.createElement('select');
        select.setAttribute('name', 'modos');
        select.setAttribute('id', 'modos');
    
        const optionFacil = document.createElement('option');
        optionFacil.setAttribute('value', '0');
        optionFacil.textContent = 'Fácil';
        select.appendChild(optionFacil);
    
        const optionMedio = document.createElement('option');
        optionMedio.setAttribute('value', '1');
        optionMedio.textContent = 'Médio';
        select.appendChild(optionMedio);
    
        const optionDificil = document.createElement('option');
        optionDificil.setAttribute('value', '2');
        optionDificil.textContent = 'Difícil';
        select.appendChild(optionDificil);

        div.appendChild(label)
        div.appendChild(select)
        menuGrande.appendChild(div)

        switch (jogo.modo) {
            case "fácil":
                select.value = 0
                break;
            case "normal":
                select.value = 1
                break;
            case "difícil":
                select.value = 2
                
                break;
        
            default:
                break;
        }

        select.addEventListener("change", () => {
            const PerguntaAtual = document.querySelector("section")
            PerguntaAtual.remove()
            carregarJogo(select.value)
        })
    }

    const menuGrande = document.createElement("div")
    menuGrande.classList.add("menuAberto")

    const fecharMenu = document.createElement("div")
    fecharMenu.innerHTML = "X"
    fecharMenu.classList.add("fechar")

    menuGrande.appendChild(fecharMenu)
    main.appendChild(menuGrande)

    const Acertos = document.createElement("h2")

    Acertos.innerText = "Acertos"
    const Acertosqtdd = document.createElement("p")
    Acertosqtdd.classList.add("Acerto")
    Acertosqtdd.innerHTML = `${player.acertos}`

    const Erros = document.createElement("h2")
    Erros.innerText = "Erros"
    const Errosqtdd = document.createElement("p")
    Errosqtdd.classList.add("Erros")
    Errosqtdd.innerHTML = `${player.erros}`

    const label = document.createElement("label")
    label.setAttribute("for", "modos")
    label.textContent = "Modos"

    const select = document.createElement('select');
    select.setAttribute('name', 'modos');
    select.setAttribute('id', 'modos');

    criarOpções();
    Acertos.appendChild(Acertosqtdd)
    Erros.appendChild(Errosqtdd)
    menuGrande.appendChild(Acertos)
    menuGrande.appendChild(Erros)
    fecharMenu.addEventListener("click", Off)
}

menu.addEventListener("click", () => {
    menu.remove()
    mostrarMenu()
})