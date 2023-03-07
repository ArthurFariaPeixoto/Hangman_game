var palavras = [];
var palavra = "";
var palavraTemp ="";

const letrasCorretas = [];
const letrasIncorretas = [];

function lerPalavras() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            palavras = xhr.responseText.split(',');
            palavra = escolherPalavra();
            palavra.split('').forEach(function(){
                palavraTemp+= " _ ";
            });
            renderPalavraSecreta(palavraTemp);

        }
    };
    xhr.open('GET', 'palavras.txt', true);
    xhr.send();

}

function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

window.onload = function() {
    lerPalavras();
    exibirPalavra();
};

function exibirPalavra() {
    let palavraExibida = "";
    for (let letra of palavra) {
        if (letrasCorretas.includes(letra)) {
            palavraExibida += " "+letra+" ";
        } else {
            palavraExibida += " _ ";
        }
    }
    renderPalavraSecreta(palavraExibida);
    console.log(palavraExibida);
}

function processarEntrada(letra) {
    if (palavra.includes(letra)) {
        if (!letrasCorretas.includes(letra)) {
            letrasCorretas.push(letra);
            exibirPalavra();
            if (palavraCompleta()) {
                renderVitoria();
                console.log("Parabéns, você ganhou!");
            }
        }
    } else {
        if (!letrasIncorretas.includes(letra)) {
            letrasIncorretas.push(letra);
            console.log("Letra incorreta!");
            if (letrasIncorretas.length === 6) {
                renderDerrota();
                console.log("Você perdeu!");
            }
        }
    }
    renderErros();
    renderImagemForca();
}

function palavraCompleta() {
    for (let letra of palavra) {
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function renderImagemForca() {
    document.getElementById('imagem').src = './img/' + letrasIncorretas.length + '.png';
}

function renderPalavraSecreta(palavra){
    document.getElementById('palavraSecreta').innerHTML = palavra;
}

function renderErros(){
    document.getElementById('errosQnt').innerHTML = letrasIncorretas.length;
}

function renderVitoria(){
    document.getElementById('mensagem').innerHTML = 'Voc&ecirc ganhou!!!';
}

function renderDerrota(){
    document.getElementById('mensagem').innerHTML = 'Voc&ecirc perdeu!!!';
    document.getElementById('resultado').innerHTML = 'A palavra era: ' + palavra;
}

document.addEventListener("keypress", function(event) {
    const letra = event.key;
    processarEntrada(letra);
});
