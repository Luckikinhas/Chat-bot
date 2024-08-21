import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyBux_HqQeJBhQUHuix9NZa-rfaWHI3V_w4";

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
    chat.sendMessage(prompt_1);
    chat.sendMessage(prompt_2);
})