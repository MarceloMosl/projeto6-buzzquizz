let resposta;
let acertos;
let quantOpcoes;
let contentQuizz;
let porcentagem;
let containerQuizzReinicio;
let displayResultado;
let firstScreen;
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
    containerQuizzReinicio =  quizzClicado;
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
        
        <button class="reiniciarQuizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
        <button class="reload" onclick="window.location.reload()">Voltar para Home</button>
        `
        }else if (porcentagem >= levels[i].minValue) {
            displayResultado.innerHTML = `<div class="acertos">${porcentagem.toFixed(0)}% de acerto: ${levels[i].title}</div>
        <div class="resultado">
            <img width="360px" src="${levels[i].image}" alt="">
            <p>${levels[i].text}</p>
        </div>
        
        <button class="reiniciarQuizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
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
function reiniciarQuizz(){    

    displayResultado.innerHTML = ""
        displayQuizz(containerQuizzReinicio);
        document.querySelector(".img-top-quizz").scrollIntoView();

}
function criarQuizz(){
    document.querySelector(".criandoQuizz").classList.remove("escondido")
    document.querySelector(".todosQuizzes").classList.add("escondido")

    firstScreen = document.querySelector(".primeira")

    firstScreen.innerHTML = `<h1>comece pelo começo</h1>
    <input class="title" type="text" placeholder="Titulo do seu Quizz">
    <input class="image" type="text" placeholder="URL da imagem do seu quizz">
    <input class="questions" type="number" placeholder="Quantidade de perguntas do quizz">
    <input class="levels" type="number" placeholder="Quantidade de níveis do quizz">

    <button class="irParaPerguntas" onclick="definirPerguntas()">Prosseguir para criar perguntas</button>
    `
}
function definirPerguntas(){
    titulodoQuizz = document.querySelector(".title").value
    imageQuizz = document.querySelector(".image").value
    questionsQuizz = document.querySelector(".questions").value
    levelsQuizz = document.querySelector(".levels").value
    
    firstScreen.classList.add("escondido")

    document.querySelector(".segunda").innerHTML = `<h1 class="criePerguntas">Crie suas perguntas</h1>`
    for(i=0; i<questionsQuizz; i++){
        document.querySelector(".segunda").innerHTML += `<div class="question">
        <h1>Pergunta ${String(i + 1)}</h1>
        <input class="question-title" type="text" placeholder="Texto da Pergunta">
        <input class="question-color" type="text" placeholder="cor de fundo da pergunta">

        <h2>Resposta Correta</h2>
        <input class="resposta-certa" type="text" placeholder="Resposta Correta">
        <input class="URL-correta" type="text" placeholder="URL da imagem">

        <h2>Respostas Incorretas</h2>
        <input class="resposta-errada${String(i + 1)}" type="text" placeholder="Resposta errada${String(i + 1)}">
        <input class="URL-errada${String(i + 1)}" type="text" placeholder="URL da imagem${String(i + 1)}">
        <input class="resposta-errada${String(i + 1)}" type="text" placeholder="Resposta errada${String(i + 1)}">
        <input class="URL-errada${String(i + 1)}" type="text" placeholder="URL da imagem${String(i + 1)}">
        <input class="resposta-errada${String(i + 1)}" type="text" placeholder="Resposta errada${String(i + 1)}">
        <input class="URL-errada${String(i + 1)}" type="text" placeholder="URL da imagem${String(i + 1)}">
    </div>`
    }
    document.querySelector(".segunda").innerHTML += `<button class="irParaNiveis" onclick="criarNiveis()">Prosseguir para criar niveis</button>`

}
function criarNiveis(){
    secondScreen = document.querySelector(".segunda")
    secondScreen.classList.add("escondido")

    document.querySelector(".terceira").innerHTML = `<h1>Agora, decida os niveis</h1>`
    for(i=0; i<levelsQuizz; i++){
        document.querySelector(".terceira").innerHTML += `<h1>Nível ${String(i + 1)}</h1>
        <input class="title-level" type="text" placeholder="Titulo do Nível ${String(i + 1)}">
        <input class="porcentagem-level" type="number" placeholder="% de acerto minima">
        <input class="image-level" type="URL" placeholder="URL da imagem do nivel ${String(i + 1)} ">
        <input class="desc-level" type="text" placeholder="descrição do nivel ${String(i + 1)}">
        `
    }
    document.querySelector(".terceira").innerHTML += `<button class="finalizarQuizz onclick="finalizarQuizz()">Finalizar Quizz</button>`

}