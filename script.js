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
        mostraQuizz.classList.remove("escondido")
        escondeFundo = document.querySelector(".main")
        escondeFundo.classList.add("escondido")
    }
    function errIdQuizz(response){
        console.log(response)
        console.log("Erro ao cliclar no QUIZZ")
    }
}