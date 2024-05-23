(function(){
    const send = document.querySelector(".send")
    const message = document.querySelector(".containeChat")
    const box = document.querySelector(".text")
    
    let ws
    const showMsg=(messag)=>{
        message.textContent+=`\n\n${messag}`
        message.scrollTop=message.scrollHeight
        box.value=""
    }
    const initWs=()=>{
        if (ws){
            ws.onerror=ws.onopen=ws.onclose=null
            ws.close()
        }
        ws = new WebSocket(`ws://localhost:8000`)
        ws.onopen=()=>{
            console.log("connection establish...")
        }
        ws.onmessage=({data})=>showMsg(data)
        ws.onclose=()=>{
            ws=null
            console.log("close ws...");
        }
    }
    send.onclick=()=>{
        if (!ws){
            showMsg("NO ws ...")
            return
        }
        ws.send(box.value)
        showMsg(box.value)
    }
    initWs()
})()