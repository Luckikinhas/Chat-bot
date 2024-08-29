import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyCkPVXNShiJ6p0R7zNeKypF9Kk-hpk02DQ";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const chat = model.startChat({ 
    history: [] 
})

async function mandar_mensagem(msg) {
    const result = await chat.sendMessage(msg);
    const response = await result.response;//response recebe a resposta do result
    const text = await response.text();//convert text
    console.log(text);
}

async function perguntarModelo() {
    const text = document.getElementById("pergunta")
    await mandar_mensagem(text.value)
    text.value = ""
}

document.addEventListener('DOMContentLoaded', async function comecar_cod(){
    const allPrompts = [];
    allPrompts.push('Vou passar algumas dicas e informações necessárias para você responder as perguntas:')
    allPrompts.push('seu nome vai ser Ifinho.')//pode mudar o nome se quiser era só um teste
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

    console.log('Começo')
    let mandar_prompt = await chat.sendMessage(allPrompts);
    await mandar_prompt.response;
    await mandar_mensagem('Você pode se apresentar pra mim e dizer qual sua missão?')
    console.log('Fim')

    const botao = document.getElementById("botao")
    botao.addEventListener("click", perguntarModelo);
})
