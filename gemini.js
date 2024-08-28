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
    history.push(response);//SO UM TESTE PLM DE DEUS
    console.log(text);
}

async function perguntarModelo() {
    const text = document.getElementById("pergunta")
    await mandar_mensagem(text.value)
    text.value = ""
}
const botao = document.getElementById("botao")
botao.addEventListener("click", perguntarModelo);

document.addEventListener('DOMContentLoaded', async function comecar_cod(){
    const allPrompts = [];
    allPrompts.push('Vou passar algumas dicas e informações necessárias para você responder as perguntas: ')
    allPrompts.push('você vai fornecer informações sobre os biomas brasileiros para alunos de uma sala de aula, ');
    allPrompts.push('fique atento a plurais, pois o usuário pode escrever incorretamente, ');
    allPrompts.push('pesquise mais aprofundado sobre cada bioma brasileiro e seus índices pluviométricos, ');
    allPrompts.push('fique atento com os estados e cidades que possuem cada bioma e qual sua extensão, ');
    allPrompts.push('foque um pouco nas caracteristicas de cada bioma e quais as principais dificuldades de preservação, ');
    allPrompts.push('os estados que possuem mias biomas são Mato Grosso, Mato Grosso do Sul, Bahia e Minas Gerais, cada um com três biomas, ');
    allPrompts.push('Minas  Gerais possui tres biomas o cerrado, a mata Atlântica, e a Caatinga, não possui pantanal e pampa, ');
    allPrompts.push('a Bahia possui tres biomas Mata Atlântica, Cerrado e Caatinga, não possui amazonia, ');
    allPrompts.push('Mato Grosso possui tres biomas Amazônia; Cerrado; Pantanal, ');
    allPrompts.push('Mato Grosso do Sul possui tres biomas o Cerrado, a Mata Atlântica e o Pantanal, '); 

    console.log('Começo')
    let mandar_prompt = await chat.sendMessage(allPrompts);//TESTE
    await mandar_prompt.response;//TESTE
    console.log('Fim')

    document.createElement('button');

})
