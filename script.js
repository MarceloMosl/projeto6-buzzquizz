let resposta;
function getQuizzes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(resQuizzes)
    promise.catch(errQuizzes)

    function resQuizzes(response){
        console.log(response)
         resposta = response.data
        const mostrar = document.querySelector(".todosQuizzes")
        for(i=0;i<resposta.length;i++){

            mostrar.innerHTML += `<div class="tQuizz" onclick="displayQuizz(this)"><img class="imgTQuizz" src="${resposta[i].image}" alt="">
                <span class="nomeTQuizz">${resposta[i].title}</span>
            </div>
            `
        }
    }
    function errQuizzes(response){
        console.log("erro")
        console.log(response)
    }
}
getQuizzes();