function expandirChat(e) {
    let chatbot = document.querySelector('.chatbot');
    if (chatbot.classList.contains('expandido')) {
        chatbot.classList.remove("expandido");
        e.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>';
    } else {
        chatbot.classList.add("expandido");
        e.innerHTML = '<i class="fa-solid fa-down-left-and-up-right-to-center"></i>';
    }
}