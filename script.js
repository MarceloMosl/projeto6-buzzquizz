let resposta;
function getQuizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(resQuizzes)
    promise.catch(errQuizzes)
    function resQuizzes(response){
         resposta = response.data
        const mostrar = document.querySelector(".todosQuizzes")
        for(i=0;i<resposta.length;i++){
            mostrar.innerHTML += `<div class="tQuizz" onclick="displayQuizz(this)"><img class="imgTQuizz" src="${resposta[i].image}" alt="">
                <span class="nomeTQuizz">${resposta[i].title}</span>
                <span class="escondido id-doQuizz">${resposta[i].id}</span>
            </div>`
        }
    }
    function errQuizzes(response){
        console.log("Erro ao Puxar os Quizzes")
        console.log(response)
        window.location.reload()
    }
}
getQuizzes();
function displayQuizz(quizzClicado){
    data = quizzClicado.children[2].innerHTML
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"+data)
    promise.then(returnQuizz)
    promise.catch(errIdQuizz)
    function returnQuizz(response){
        console.log(response)
        mostraQuizz = document.querySelector(".quizz")
        escondeFundo = document.querySelector(".main")
        
        testequizz = response.data
        mostraQuizz.innerHTML += `
        <div class="imagem-quiz-click">
            <img class="img-top-quizz" src="${testequizz.image}" width="100%" alt="">
            <div class="titulo-quizz-clicado">${testequizz.title}</div>
        </div>
        
        <div class="pergunta">
            <div class="pergunta-quizz-clicado">Em qual animal Olho-Tonto Moody transfigurou Malfoy?</div>
            <div class="opcoes">
                <div class="option1">
                    <img src="./assets/image 3.jpg" alt="">
                    <p>Gatineo</p>
                </div>
                <div class="option2">
                    <img src="./assets/image 4.jpg" alt="">
                    <p>Ratata</p>
                </div>
                <div class="option3">
                    <img src="./assets/image 7.jpg" alt="">
                    <p>Sapo Gordo</p>
                </div>
                <div class="option4">
                    <img src="./assets/image 8.jpg" alt="">
                    <p>Mustela putorius (o Furão)</p>
                </div>
            </div>
        </div>
        
        `

        
        mostraQuizz.classList.remove("escondido")
        escondeFundo.classList.add("escondido")
    }
    function errIdQuizz(response){
        console.log(response)
        console.log("Erro ao cliclar no QUIZZ")
    }
}