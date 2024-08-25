import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAeTp_Gi1lOOr2f779NL3LjDjpifqMd8jk";

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
const botao = document.getElementById("botao")
botao.addEventListener("click", perguntarModelo);

document.addEventListener('DOMContentLoaded', () => {
    const prompt_1 = "Você vai fornecer informações sobre os biomas brasileiros para alunos de uma sala de aula";
    const prompt_2 = 'Fique atento a plurais, pois o usuário pode escrever incorretamente';
    const prompt_3 = 'Pesquise mais aprofundado sobre cada bioma brasileiro e seus índices pluviométricos ';
    const prompt_4 = 'Fique atento com os estados e cidades que possuem cada bioma e qual sua extensão ';
    const prompt_5 = 'Foque um pouco nas caracteristicas de cada bioma e quais as principais dificuldades de preservação  ';
    chat.sendMessage(prompt_1);
    chat.sendMessage(prompt_2);
    chat.sendMessage(prompt_3);
    chat.sendMessage(prompt_4);
    chat.sendMessage(prompt_5);
})
