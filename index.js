const caixaDEadivinhar = document.querySelector(".adivinha")
const main = document.querySelector("main")
const botõesDeModo = document.querySelectorAll(".SeleçãoDeModos button")

let tentativas = 0;
let jogo = {
    modo: "fácil",
    começou: false,
    numeroCerto: null,

}
let player = {
    numeroEscolhido: null,
    tentativas: 0,
    acertos: 0,
    erros: 0,
    vezesJogada: 0,
}

let mostrarAlerta = false;

const gerarNumero = (numeroMáximo, numeroMínimo) => {
    return Math.floor(Math.random() * (numeroMáximo - numeroMínimo + 1) + numeroMínimo)
}


const começarJogo = () => {



    const ResetarInput = document.querySelector("input")
    if (jogo.começou === false) {
        jogo.começou = true
    }





    const reset = () => {

        const monstruario = document.querySelectorAll(".mostruario p")
    monstruario.forEach(amostra =>{
        amostra.style.transform = "translateY(-0%)"
       
    })
        player.tentativas = 0
        ResetarInput.value = ""
        jogo.começou = false
        jogo.numeroCerto = null;
        player.numeroEscolhido = null;

        const NovaCaixaDeAdivinhar = document.querySelector(".adivinha")
        NovaCaixaDeAdivinhar.remove()
        setTimeout(() => {
            main.appendChild(NovaCaixaDeAdivinhar)
        }, 1000)



    }

    const verificar = () => {
        if (player.tentativas < 3) {
            if (player.numeroEscolhido == jogo.numeroCerto) {

                player.acertos = player.acertos + 1

                alertar(`Você acertou! o numero era ${jogo.numeroCerto}`)
                if (MenuEstáAberto) {
                    const mostrarAcertos = document.querySelector(".Acerto")
                    mostrarAcertos.innerHTML = `${player.acertos}`
                }
                reset()

            } else {
                player.tentativas = player.tentativas + 1
                player.erros = player.erros + 1;
                ResetarInput.value = ""

                if (MenuEstáAberto) {
                    const mostrarErros = document.querySelector(".Erros")
                    mostrarErros.innerHTML = `${player.erros}`
                }

                if (player.tentativas >= 3) {
                    alertar(`O jogo acabou você perdeu o numero era ${jogo.numeroCerto}`)
                    reset()
                } else {
                    alertar(`Você errou! tem mais ${3 - player.tentativas} tentativa(s)`)

                }

            }

        } else {
            alertar(`O jogo acabou você perdeu o numero era ${jogo.numeroCerto}`)
            reset()
        }
    }


    if (jogo.começou) {

        if (jogo.modo === "fácil") {
            if (player.tentativas == 0) {
                jogo.numeroCerto = gerarNumero(7, 1)
            }
            verificar();


        } else if (jogo.modo === "normal") {
            if (player.tentativas == 0) {
                jogo.numeroCerto = gerarNumero(10, 1)
            }
            verificar();



        } else if (jogo.modo === "difícil") {
            if (player.tentativas == 0) {
                jogo.numeroCerto = gerarNumero(13, 1)
            }
            verificar();
        }
    }

}



const carregarJogo = (valor) => {
    const caixaDoMonstruario = document.querySelector(".mostruario")
    caixaDoMonstruario.style.display = "block"
    caixaDEadivinhar.remove()
    const NovaCaixaDeAdivinhar = document.createElement("section")
    NovaCaixaDeAdivinhar.classList.add("adivinha")

    const h2 = document.createElement("h2")

    const div = document.createElement("div")
    div.classList.add("areaDoInput")

    const label = document.createElement("label")
    label.setAttribute("for", "numero")
    label.textContent = "Digite o numero"

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'numero');
    input.setAttribute('maxlength', '2');


    const button = document.createElement('button');
    button.classList.add('enviar');
    button.textContent = 'Enviar';

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(button);

    NovaCaixaDeAdivinhar.appendChild(h2)
    NovaCaixaDeAdivinhar.appendChild(div)

    main.appendChild(NovaCaixaDeAdivinhar)
    const textoDoh2 = NovaCaixaDeAdivinhar.querySelector("h2")
    if (valor == 0) {
        jogo.modo = "fácil"
        h2.innerHTML = "Estou pensando em um número de 1 a 7, tente adivinhar!"

    } else if (valor == 1) {
        jogo.modo = "normal"
        h2.innerHTML = "Estou pensando em um número de 1 a 10, tente adivinhar!"

    } else if (valor == 2) {
        jogo.modo = "difícil"
        h2.innerHTML = "Estou pensando em um número de 1 a 13, tente adivinhar!"

    }

    button.addEventListener("click", () => {
        const Input = input.value;

        if (!isNaN(Input)) {

            player.numeroEscolhido = +Input

            const monstruario = document.querySelectorAll(".mostruario p")
            monstruario.forEach(amostra => {
                if (player.tentativas == 0) {
                    amostra.style.transform = "translateY(-100%)"
                } else if (player.tentativas == 1) {
                    amostra.style.transform = "translateY(-200%)"
                } else if (player.tentativas> 1) {
                    amostra.style.transform = "translateY(-200%)"
                }
            })
            começarJogo()
        } else {
            input.value = ""
            alertar("Digite apenas números")
        }
    })
}

const alertar = (alerta) => {
    if (mostrarAlerta == false) {

        mostrarAlerta = true;
        const caixaDoAlerta = document.createElement("div")
        caixaDoAlerta.classList.add("caixaDoAlerta")

        const Alerta = document.createElement("h2")
        Alerta.innerHTML = alerta

        caixaDoAlerta.appendChild(Alerta)
        main.appendChild(caixaDoAlerta)

        setTimeout(() => {
            caixaDoAlerta.remove()
            mostrarAlerta = false;
        }, 2000);
    }

}




botõesDeModo.forEach((botão, index) => {
    botão.addEventListener("click", () => {

        carregarJogo(index)
        if (MenuEstáAberto) {
            const MODOS = document.querySelector("select")
            Modos.value = index
        }
    })
})
