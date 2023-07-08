const socket = io()

let user;
let textarea = document.querySelector('#textarea');
let message_area = document.querySelector('.message_area');

do{
    user = prompt("Enter your name to join")
    socket.emit('new-user',user);
}while(!user)

textarea.addEventListener('keyup',(e)=>{

    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: user,
        message:message.trim()
    }

    //Append
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom();

    //Send to server
    // socket.emit('Event',{
    //     user: user,
    //     message:message
    // })

    //Send to server object already created
    socket.emit('message',msg);
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');

    //which class incoming or outgoing
    let className = type;

    //adding classes into mainDiv
    mainDiv.classList.add(className,'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;

    message_area.appendChild(mainDiv);
}

//Recieving messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    message_area.scrollTop = message_area.scrollHeight;
}