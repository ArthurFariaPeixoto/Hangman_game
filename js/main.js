var palavras = [];
var palavra = "";
var palavraTemp ="";
var letrasCorretas = [];
var letrasIncorretas = [];

var estadoGame = 'null';

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
    xhr.open('GET', '../palavras.txt', true);
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
    if(estadoGame === 'null'){
        if (palavra.includes(letra)) {
            if (!letrasCorretas.includes(letra)) {
                letrasCorretas.push(letra);
                exibirPalavra();
                if (palavraCompleta()) {
                    estadoGame = 'vitoria';
                    renderVitoria();
                    console.log("Parabéns, você ganhou!");
                }
            }
        } else {
            if (!letrasIncorretas.includes(letra)) {
                letrasIncorretas.push(letra);
                console.log("Letra incorreta!");
                if (letrasIncorretas.length === 6) {
                    estadoGame = 'derrota';
                    renderDerrota();
                    console.log("Você perdeu!");
                }
            }
        }
    }
    renderErros();
    renderLetrasErradas();
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
    document.getElementById('imagem').src = '../img/' + letrasIncorretas.length + '.png';
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

function renderLetrasErradas(){
    document.getElementById('letrasErradas').innerHTML ='Tentativas: ' + letrasIncorretas.sort();
}

function reset(){
    palavras = [];
    palavra = "";
    palavraTemp ="";
    letrasCorretas = [];
    letrasIncorretas = [];
    estadoGame = 'null';

    lerPalavras();
    exibirPalavra();
    renderErros();
    renderImagemForca();

    document.getElementById('mensagem').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('letrasErradas').innerHTML ='Tentativas: ';

}

document.addEventListener("keypress", function(event) {
    const letra = event.key;
    processarEntrada(letra.toLowerCase());
});
