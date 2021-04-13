let movieData = [];

function fetchMovies() {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes")

    promise.then(processPromise)

    function processPromise(response) {
        movieData = response.data
        renderMovies()
        console.log(response)
    }
}

fetchMovies()

function renderMovies() {
    const movies = document.querySelector('.movies')

    for(let i = 0; i < movieData.length; i++){
        movies.innerHTML += `
        <div class="movie">
            <img src=${movieData[i].imagem}>
            <div class="title">${movieData[i].titulo}</div>
            <button onclick="buyTickets(this)" data-id="${movieData[i].id}">
                Comprar
                <ion-icon name="cart-outline"></ion-icon>
            </button>
        </div>
    `
    }
}

function buyTickets(selected){
    const movieId = selected.dataset.id
    const buyerName = prompt("Qual seu nome?")
    const numberTickets = prompt("Quantos ingressos quer comprar?")

    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${movieId}/ingresso`, {nome: buyerName, quantidade: numberTickets})

    request.then(handleSucess)
    request.catch(handleError)
}

function handleSucess(response){
    alert("Ingresso comprado com sucesso!")
    console.log(response)
}

function handleError(response){
    alert("Os ingressos para este filme estão esgotados!")
    console.log(response)
}