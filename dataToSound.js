/*

Variavel que guarda esta pagina web
<html>
<head><title>Teste</title></head>
<body><h1>Hello World</h1></body>
</html>
Que em binario é
00111100011010000111010001101101011011000011111000001010001111000110100001100101011000010110010000111110001111000111010001101001011101000110110001100101001111100101010001100101011100110111010001100101001111000010111101110100011010010111010001101100011001010011111000111100001011110110100001100101011000010110010000111110000010100011110001100010011011110110010001111001001111100011110001101000001100010011111001001000011001010110110001101100011011110010000001010111011011110111001001101100011001000011110000101111011010000011000100111110001111000010111101100010011011110110010001111001001111100000101000111100001011110110100001110100011011010110110000111110
*/
var paginaTeste = "00111100011010000111010001101101011011000011111000001010001111000110100001100101011000010110010000111110001111000111010001101001011101000110110001100101001111100101010001100101011100110111010001100101001111000010111101110100011010010111010001101100011001010011111000111100001011110110100001100101011000010110010000111110000010100011110001100010011011110110010001111001001111100011110001101000001100010011111001001000011001010110110001101100011011110010000001010111011011110111001001101100011001000011110000101111011010000011000100111110001111000010111101100010011011110110010001111001001111100000101000111100001011110110100001110100011011010110110000111110";

function print(texto){
    document.write("<p>"+texto+"</p>");
    window.scrollTo(0,document.body.scrollHeight);
    return;
}

function enviarNumero(numero){
    let audioCtx = new AudioContext();

    let oscillator = audioCtx.createOscillator();

    oscillator.frequency.value = (numero * 100) + 50;

    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime +0.5);
}

function enviarBinario(dados){
    var contador = 0;
    var velocidade = 1000;
    setTimeout(function(){enviarNumero(9);}, contador);
    contador += velocidade;
    for(var i = 0;i < dados.length;i++)
    {
        switch(dados.charAt(i)){
            case "0":
                setTimeout(function(){enviarNumero(6);}, contador);
                contador += velocidade;

                setTimeout(function(){enviarNumero(5);}, contador);
                contador += velocidade;
                break;
            case "1":
                setTimeout(function(){enviarNumero(4);}, contador);
                contador += velocidade;

                setTimeout(function(){enviarNumero(5);}, contador);
                contador += velocidade;
                break;
        }
    }
    setTimeout(function(){enviarNumero(8);}, contador);
    contador += velocidade;
}
function string2bin(input){
    var result = "";
    for (var i = 0; i < input.length; i++) {
        var bin = input[i].charCodeAt().toString(2);
        result += Array(8 - bin.length + 1).join("0") + bin;
    }
    return result;
}


print("DTSM Loaded");
print("Build 6");
/*
//1
setTimeout(function(){enviarNumero(4);}, 0);
//|
setTimeout(function(){enviarNumero(5);}, 1000);
//0
setTimeout(function(){enviarNumero(6);}, 2000);
*/
//0 1 1 0
var dado = "1";
print("A enviar "+string2bin(dado));
enviarBinario(string2bin(dado));