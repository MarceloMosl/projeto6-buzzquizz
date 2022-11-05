let resposta;
let acertos;
let quantOpcoes;
let contentQuizz;
let porcentagem;
function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(resQuizzes)
    promise.catch(errQuizzes)
    function resQuizzes(response) {
        resposta = response.data
        const mostrar = document.querySelector(".todosQuizzes")
        for (i = 0; i < resposta.length; i++) {
            mostrar.innerHTML += `<div class="tQuizz" onclick="displayQuizz(this)"><img class="imgTQuizz" src="${resposta[i].image}" alt="">
                <span class="nomeTQuizz">${resposta[i].title}</span>
                <span class="escondido id-doQuizz">${resposta[i].id}</span>
            </div>`
        }
    }
    function errQuizzes(response) {
        console.log("Erro ao Puxar os Quizzes")
        console.log(response)
        window.location.reload()
    }
}
getQuizzes();
function displayQuizz(quizzClicado) {
    data = quizzClicado.children[2].innerHTML
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + data)
    promise.then(returnQuizz)
    promise.catch(errIdQuizz)
    function returnQuizz(response) {
        mostraQuizz = document.querySelector(".quizz")
        escondeFundo = document.querySelector(".main")


        contentQuizz = response.data
        perguntasQuizz = contentQuizz.questions
        mostraQuizz.innerHTML = ""
        mostraQuizz.innerHTML = `
        <div class="imagem-quiz-click">
            <img class="img-top-quizz" src="${contentQuizz.image}" width="100%" alt="">
            <div class="titulo-quizz-clicado">${contentQuizz.title}</div>
        </div>`


        for (i = 0; i < perguntasQuizz.length; i++) {

            mostraQuizz.innerHTML += ` <div class="pergunta">
             <div class="pergunta-quizz-clicado">${perguntasQuizz[i].title}</div>
             <div class="opcoes"></div>
        </div>`
            quantOpcoes = document.querySelectorAll(".opcoes")
            mostrarOpcoes = document.querySelector(".opcoes")
            opcoesQuizz = perguntasQuizz[i].answers

            for (k = 0; k < opcoesQuizz.length; k++) {
                if (opcoesQuizz[k].isCorrectAnswer) {
                    quantOpcoes[i].innerHTML += `<div class="option${String(k)} certo" onclick="checkResposta(this)">
                     <img src="${opcoesQuizz[k].image}" width="332px" height="175px" alt="">
                     <p width="332px">${opcoesQuizz[k].text}</p>
                     <span class="escondido">${opcoesQuizz[k].isCorrectAnswer}</span>
                     <div class="escondido fundo-questao"></div> 
                 </div>
                `} else {
                    quantOpcoes[i].innerHTML += `<div class="option${String(k)} errado" onclick="checkResposta(this)">
                     <img src="${opcoesQuizz[k].image}" width="332px" height="175px" alt="">
                     <p width="332px">${opcoesQuizz[k].text}</p>
                     <span class="escondido">${opcoesQuizz[k].isCorrectAnswer}</span>
                     <div class="escondido fundo-questao"></div> 
                 </div>
                `
                }
            }

        }


        acertos = 0 
        mostraQuizz.classList.remove("escondido")
        escondeFundo.classList.add("escondido")
        document.querySelector(".overall").classList.remove("escondido");
        document.querySelector(".calcRespostas").classList.remove("escondido");
        document.querySelector("body").style.backgroundColor =("#E5E5E5");
    }
    function errIdQuizz(response) {
        console.log(response)
        console.log("Erro ao cliclar no QUIZZ")
    }
}
function displayPontuacao(){
    levels = contentQuizz.levels
    displayResultado = document.querySelector(".overall")
    document.querySelector(".calcRespostas").classList.add("escondido");
    porcentagem = (acertos / perguntasQuizz.length) * 100

    for(i=0;i<levels.length;i++){
        if(porcentagem == levels[i].minValue){
            displayResultado.innerHTML = `<div class="acertos"> ${porcentagem.toFixed(0)}% de acerto: ${levels[i].title}</div>
        <div class="resultado">
            <img width="360px" src="${levels[i].image}" alt="">
            <p>${levels[i].text}</p>
        </div>
        
        <button class="reiniciarQuizz">Reiniciar Quizz</button>
        <button class="reload" onclick="window.location.reload()">Voltar para Home</button>
        `
        }else if (porcentagem >= levels[i].minValue) {
            displayResultado.innerHTML = `<div class="acertos">${porcentagem.toFixed(0)}% de acerto: ${levels[i].title}</div>
        <div class="resultado">
            <img width="360px" src="${levels[i].image}" alt="">
            <p>${levels[i].text}</p>
        </div>
        
        <button class="reiniciarQuizz">Reiniciar Quizz</button>
        <button class="reload" onclick="window.location.reload()">Voltar para Home</button>`
        }
    }


}
function checkResposta(elemento) {
    aabb = elemento.parentElement
    bbcc = elemento
    elemento.classList.add("clicado")
    if (elemento.classList.contains("certo")) {
        elemento.style.color = ("green")
        acertos++;
    }else if (elemento.classList.contains("errado")) {
        elemento.style.color = ("red")
    }
    for (i = 0; i < aabb.children.length; i++) {
        if (aabb.children[i].classList.contains("clicado")) { } else {
            aabb.children[i].style.opacity = ("0.3")
        }
    }
        elemento.children[3].classList.remove("escondido")

}
