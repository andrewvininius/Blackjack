document.addEventListener("DOMContentLoaded", function() {
    const maoJogador = document.getElementById("mao-jogador");
    const maoComputador = document.getElementById("mao-computador");
    const botaoIniciar = document.getElementById("botao-iniciar");
    const botaoComprar = document.getElementById("botao-comprar");
    const botaoParar = document.getElementById("botao-parar");
    const resultadoTexto = document.getElementById("resultado");

    let pontuacaoJogador = 0;
    let pontuacaoComputador = 0;
    let maoJogadorArray = [];
    let maoComputadorArray = [];
    let jogoFinalizado = false;

    function pegarCartaAleatoria() {
        const cartas = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        return cartas[Math.floor(Math.random() * cartas.length)];
    }

    function atualizarPontuacao(maoArray) {
        let pontuacao = 0;
        let numAses = 0;

        for (let carta of maoArray) {
            if (carta === "A") {
                numAses++;
                pontuacao += 11;
            } else if (carta === "K" || carta === "Q" || carta === "J") {
                pontuacao += 10;
            } else {
                pontuacao += parseInt(carta);
            }
        }

        while (pontuacao > 21 && numAses > 0) {
            pontuacao -= 10;
            numAses--;
        }

        return pontuacao;
    }

    function atualizarInterface() {
        maoJogador.textContent = `Mão do Jogador: ${maoJogadorArray.join(" | ")} (Pontuação: ${pontuacaoJogador})`;
        maoComputador.textContent = `Mão do Computador: ${maoComputadorArray[0]} | ?`;
    }

    function verificarResultado() {
        if (pontuacaoJogador > 21) {
            resultadoTexto.textContent = "Jogador Estourou! Computador Vence.";
        } else if (pontuacaoComputador > 21) {
            resultadoTexto.textContent = "Computador Estourou! Jogador Vence.";
        } else if (pontuacaoJogador === pontuacaoComputador) {
            resultadoTexto.textContent = "Empate!";
        } else if (pontuacaoJogador > pontuacaoComputador) {
            resultadoTexto.textContent = "Jogador Vence!";
        } else {
            resultadoTexto.textContent = "Computador Vence!";
        }
    }

    function reiniciarJogo() {
        pontuacaoJogador = 0;
        pontuacaoComputador = 0;
        maoJogadorArray = [];
        maoComputadorArray = [];
        jogoFinalizado = false;

        atualizarInterface();

        botaoIniciar.disabled = true;
        botaoComprar.disabled = false;
        botaoParar.disabled = false;
        resultadoTexto.textContent = "";
    }

    botaoIniciar.addEventListener("click", function() {
        if (jogoFinalizado) {
            reiniciarJogo();
        }

        maoJogadorArray = [pegarCartaAleatoria(), pegarCartaAleatoria()];
        maoComputadorArray = [pegarCartaAleatoria(), pegarCartaAleatoria()];
        pontuacaoJogador = atualizarPontuacao(maoJogadorArray);
        pontuacaoComputador = atualizarPontuacao(maoComputadorArray.slice(0, 1));

        atualizarInterface();

        botaoIniciar.disabled = true;
        botaoComprar.disabled = false;
        botaoParar.disabled = false;
    });

    botaoComprar.addEventListener("click", function() {
        if (!jogoFinalizado) {
            maoJogadorArray.push(pegarCartaAleatoria());
            pontuacaoJogador = atualizarPontuacao(maoJogadorArray);
            atualizarInterface();

            if (pontuacaoJogador >= 21) {
                botaoComprar.disabled = true;
                botaoParar.disabled = true;
                while (pontuacaoComputador < 17) {
                    maoComputadorArray.push(pegarCartaAleatoria());
                    pontuacaoComputador = atualizarPontuacao(maoComputadorArray);
                }
                atualizarInterface();
                verificarResultado();
                jogoFinalizado = true;
            }
        }
    });

    botaoParar.addEventListener("click", function() {
        if (!jogoFinalizado) {
            botaoComprar.disabled = true;
            botaoParar.disabled = true;
            while (pontuacaoComputador < 17) {
                maoComputadorArray.push(pegarCartaAleatoria());
                pontuacaoComputador = atualizarPontuacao(maoComputadorArray);
            }
            atualizarInterface();
            verificarResultado();
            jogoFinalizado = true;
        }
    });
});
