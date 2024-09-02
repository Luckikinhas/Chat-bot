let quantidadeLetrasDivResp = 0;
let quantidadeLetrasDivPerg = 0;
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyCkPVXNShiJ6p0R7zNeKypF9Kk-hpk02DQ";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const chat = model.startChat({ 
    history: [] 
})
let iconeAtual;
let contadorMensagens = 0;
let botaoIcones=document.querySelectorAll('.botaoIcones')
let escolhaIcone=document.getElementById('escolhaIcone')
botaoIcones.forEach(function(botao){
 botao.addEventListener('click',function(event){
    let botaoSelecionado=event.currentTarget
    
    let valor = botaoSelecionado.value 
    mostrarIconeUsuario(valor)
escolhaIcone.style.display="none"
   
 } )
})

async function mandar_mensagem(msg) {
    const result = await chat.sendMessage(msg);
    const response = await result.response;//response recebe a resposta do result
    const text = await response.text();//convert text
    quantidadeLetrasDivResp = text.length;
    if(contadorMensagens==0){
    carregarMensagemChatbot(text, 'question.gif');
    contadorMensagens++
    }
    else{
    carregarMensagemChatbot(text, 'default.gif');
    }

}

function ajusteTamanhoDiv (quantidade)
{
    console.log(quantidadeLetrasDivResp)
    console.log(quantidadeLetrasDivPerg)
    if(quantidade>400)
    {
        return '70%';
    }
    else 
    {
        return '180px';
    }
}

function mostrarIconeUsuario(value){
    iconeAtual = value
    alert(iconeAtual)
}
function carregarMensagemChatbot(resposta, sourceIcone){
    let divp = document.createElement('div');
    let containerTexto = document.createElement('div');
    let containerMensagens = document.getElementById('containerPerguntasERespostas');
    let containerIconeBotCarregando = document.createElement('div');
    let iconeBotCarregamento = document.createElement('img');
    let pontos = document.createElement('img');
    
    
    containerMensagens.appendChild(divp);
    divp.appendChild(containerIconeBotCarregando);
    divp.appendChild(containerTexto)
    containerIconeBotCarregando.appendChild(iconeBotCarregamento);
    containerTexto.appendChild(pontos)

    iconeBotCarregamento.src='loading.gif';
    pontos.classList.add('animacao3Pontos')
    pontos.src='animação de loading.gif'
    containerTexto.classList.add('RespostaDoChatBot')
    iconeBotCarregamento.classList.add('iconeImg');
    containerIconeBotCarregando.classList.add('conteinerIconeChat')
    divp.classList.add('divPaiRespostaDoChatBot');

    setTimeout(()=>{
        divp.remove();
        containerIconeBotCarregando.remove();
        mostrarRespostaChatbot(resposta,sourceIcone)},2000);




}

function mostrarRespostaChatbot(resposta, sourceIcone){
    let divp = document.createElement('div');
    
    let icone = document.createElement('img');
    
    let conteinerIconeChat = document.createElement('div');
    let novoContainerResposta = document.createElement('div');
    let tamanhoDivResp = ajusteTamanhoDiv(quantidadeLetrasDivResp);
    novoContainerResposta.style.width = tamanhoDivResp;
    let containerPerguntasERespostas = document.getElementById('containerPerguntasERespostas');
    let textoNovoContainerResposta = document.createElement('span')

    
    containerPerguntasERespostas.appendChild(divp);
    divp.appendChild(conteinerIconeChat);
    divp.appendChild(novoContainerResposta);
    conteinerIconeChat.appendChild(icone);
    novoContainerResposta.appendChild(textoNovoContainerResposta);

    divp.classList.add('divPaiRespostaDoChatBot');
    icone.src = sourceIcone;
    icone.classList.add('iconeImg');
    novoContainerResposta.classList.add('RespostaDoChatBot');
    conteinerIconeChat.classList.add('conteinerIconeChat');
    textoNovoContainerResposta.textContent = resposta;

}

    
function mostrarPerguntaUsuario(pergunta, sourceIcone){
   if(pergunta!=""){
    let divp = document.createElement('div');
    divp.className = 'divPaiPergunta';
    let icone = document.createElement('img');
    icone.src = sourceIcone
    icone.classList.add('iconeImg');
    let novoContainerPergunta = document.createElement('div');
    let tamanhoDivPerg =  ajusteTamanhoDiv(quantidadeLetrasDivPerg);
    novoContainerPergunta.style.width = tamanhoDivPerg;
    let conteinerIconeUsuario = document.createElement('div');
    let containerPerguntasERespostas = document.getElementById('containerPerguntasERespostas');
    let textoNovoContainerPerguntas = document.createElement('span');

    novoContainerPergunta.classList.add('PerguntasDousuario');
    conteinerIconeUsuario.classList.add('conteinerIconeUsuario');
    textoNovoContainerPerguntas.textContent = pergunta;

    
    containerPerguntasERespostas.appendChild(divp);
    divp.appendChild(novoContainerPergunta);
    novoContainerPergunta.appendChild(textoNovoContainerPerguntas);
    divp.appendChild(conteinerIconeUsuario);
    conteinerIconeUsuario.appendChild(icone);


   }
  else{
    alert("Erro! Digite algo para enviar")
  }
}

async function perguntarModelo() {
    const text = document.getElementById("pergunta");
    quantidadeLetrasDivPerg = text.value.length;
    mostrarPerguntaUsuario(text.value, iconeAtual)
    await mandar_mensagem(text.value)
    
    text.value = ""
}

document.addEventListener('DOMContentLoaded', async function comecar_cod(){
    const allPrompts = [];
    allPrompts.push('Vou passar algumas dicas e informações necessárias para você responder as perguntas:')
    allPrompts.push('seu nome vai ser Ifinho.')//pode mudar o nome se quiser era só um teste
    allPrompts.push('mande a mensagem de escolhar o icone depois que o usuario falar seu nome ')
    allPrompts.push('sempre que alguem perguntar qual sua missão aqui sua resposta vai ser: é fornecer informações sobre os biomas brasileiros para alunos.');
    allPrompts.push('fique atento a plurais, pois o usuário pode escrever incorretamente.');
    allPrompts.push('pesquise mais profundamente sobre cada bioma brasileiro e seus índices pluviométricos.');
    allPrompts.push('fique atento com os estados e cidades que possuem cada bioma e qual sua extensão.');
    allPrompts.push('foque um pouco nas caracteristicas de cada bioma e quais as principais dificuldades de preservação.');
    allPrompts.push('sempre que for perguntado quais estados possuem mais biomas a resposta é: os estados que possuem mais biomas são Mato Grosso, Mato Grosso do Sul, Bahia e Minas Gerais, cada um com três biomas.');
    allPrompts.push('Minas Gerais possui três biomas o cerrado, a mata Atlântica, e a Caatinga.');
    allPrompts.push('a Bahia possui três biomas Mata Atlântica, Cerrado e Caatinga.');
    allPrompts.push('Mato Grosso possui três biomas Amazônia, Cerrado e Pantanal.');
    allPrompts.push('Mato Grosso do Sul possui três biomas o Cerrado, a Mata Atlântica e o Pantanal.'); 

    console.log('Começo');
    await mandar_mensagem('Você pode se apresentar pra mim e dizer qual sua missão? Após isso, pergunte meu nome');
    await chat.sendMessage(allPrompts);

    


   
    console.log('Fim');

    const botao = document.getElementById("botao");
    botao.addEventListener("click", perguntarModelo);
})
function funcaoTeste(){
    carregarMensagemChatbot('isso é uma mensagem de teste', 'default.gif')
    mostrarPerguntaUsuario('isso é uma mensagem de teste', iconeAtual)
    
}

