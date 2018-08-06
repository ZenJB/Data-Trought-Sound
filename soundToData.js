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
function bin2string(input){
    var result = "";
    var arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;
}

print("DTSM Loaded");
print("Build 4");

var ultimoDetetado = null;
var conectado = false;

navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia;
navigator.getUserMedia({ video : false, audio : true }, callback, console.log);

var ultimoDado = null;
function callback(stream) {
    var ctx = new AudioContext();
    var mic = ctx.createMediaStreamSource(stream);
    var analyser = ctx.createAnalyser();

    mic.connect(analyser);

    var data = new Uint8Array(analyser.frequencyBinCount);
    function play() {
        analyser.getByteFrequencyData(data);
        // get fullest bin
        var idx = 0;
        for (var j=0; j < analyser.frequencyBinCount; j++) {
            if (data[j] > data[idx]) {
                idx = j;
            }
        }
        var frequency = idx * ctx.sampleRate / analyser.fftSize;

        //document.getElementById("debug").innerHTML = (frequency);


        if(frequency.toString()[0] == "8" && ultimoDado != 8 && conectado) {
            ultimoDado = 8;
            document.getElementById("conn").innerHTML = "Desconectado";
            var dados = document.getElementById("debug").innerHTML;
            document.getElementById("conn").innerHTML = "<p>Binario: "+dados+"</p>";
            document.getElementById("conn").innerHTML += "<p>Texto: "+ bin2string(dados) + "</p>";
            document.getElementById("registo").innerHTML += "<p>"+dados+" ("+bin2string(dados)+") "+"</p>";
            conectado = false;
        }
        else
        if(frequency.toString()[0] == "9" && ultimoDado != 9) {
            ultimoDado = 9;
            document.getElementById("conn").innerHTML = "Conectado";
            conectado = true;
        }
        else
        if(frequency.toString()[0] == "4" && ultimoDado != 4 && conectado) {
            document.getElementById("debug").innerHTML += "1";
            ultimoDado = 4;
        }
        else
        if(frequency.toString()[0] == "5" && ultimoDado != 5 && conectado) {
            ultimoDado = 5
        }
        else
        if(frequency.toString()[0] == "6" && ultimoDado != 6 && conectado) {
            document.getElementById("debug").innerHTML += "0";
            ultimoDado = 6
        }
        //print(frequency.toString()[0]);
        requestAnimationFrame(play);
    }
    play();
}