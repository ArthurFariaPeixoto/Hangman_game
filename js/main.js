var palavras = [];
var palavra = "";

const letrasCorretas = [];
const letrasIncorretas = [];

function lerPalavras() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            palavras = xhr.responseText.split(',');
            palavra = escolherPalavra();
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
    console.log(palavraExibida);
}

function processarEntrada(letra) {
    if (palavra.includes(letra)) {
        if (!letrasCorretas.includes(letra)) {
            letrasCorretas.push(letra);
            exibirPalavra();
            if (palavraCompleta()) {
                console.log("Parabéns, você ganhou!");
            }
        }
    } else {
        if (!letrasIncorretas.includes(letra)) {
            letrasIncorretas.push(letra);
            console.log("Letra incorreta!");
            if (letrasIncorretas.length === 6) {
                console.log("Você perdeu!");
            }
        }
    }
}

function palavraCompleta() {
    for (let letra of palavra) {
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

document.addEventListener("keypress", function(event) {
    const letra = event.key;
    processarEntrada(letra);
});
