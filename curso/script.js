
var palavras = ["ARROZ", "FEIJAO", "MACARRAO", "BATATA", "CENOURA", "ABACAXI", "MELANCIA", "BANANA", "MANGA", "LARANJA"];

var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
var letrasUtilizadas = [];
var numTentativas = 6;
var letrasCertas = 0;


var palavraEscondida = [];
for (var i = 0; i < palavraSecreta.length; i++) {
    palavraEscondida.push("_");
}


document.getElementById('palavra').innerText = palavraEscondida.join(' ');


function checarLetra() {
    var letra = document.getElementById('letra').value.toUpperCase();

    
    if (!/^[A-Z]$/.test(letra)) {
        exibirMensagem("Digite apenas uma letra válida.");
        return;
    }

   
    if (letrasUtilizadas.includes(letra)) {
        exibirMensagem("Esta letra já foi utilizada.");
        return;
    }

    letrasUtilizadas.push(letra);
    document.getElementById('letrasUsadas').innerText = letrasUtilizadas.join(', ');

    var letraEncontrada = false;
    for (var i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            palavraEscondida[i] = letra;
            letraEncontrada = true;
            letrasCertas++;
        }
    }

   
    document.getElementById('palavra').innerText = palavraEscondida.join(' ');

   
    if (letrasCertas === palavraSecreta.length) {
        exibirMensagem("voce ganhou  deu sorte A palavra era: " + palavraSecreta);
        desabilitarEntrada();
        return;
    }

    if (!letraEncontrada) {
        numTentativas--;
        document.getElementById('numTentativas').innerText = numTentativas;
    }

    if (numTentativas === 0) {
        exibirMensagem("errou kkkkk A palavra era: " + palavraSecreta);
        desabilitarEntrada();
    }

    
    document.getElementById('letra').value = '';
}


function exibirMensagem(mensagem) {
    document.getElementById('mensagem').innerText = mensagem;
}


function desabilitarEntrada() {
    document.getElementById('entrada').style.display = 'none';
}
