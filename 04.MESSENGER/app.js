function attachEvents() {
   const messageBox = document.getElementById('messages');
   const nameInput = document.getElementById('author');
   const contentInput = document.getElementById('content');
   const sendBtn = document.getElementById('submit');
   const refreshBtn = document.getElementById('refresh');

   sendBtn.addEventListener('click',function(){
       const headers = {
           method:'POST',
           headers:{'Content-type':'application/json'},
           body:JSON.stringify({
              author: nameInput.value,
               content:contentInput.value
           })
       }
       fetch(`https://rest-messanger.firebaseio.com/messanger.json`,headers)
       .then(res=>res.json())
       .then(()=>{
        nameInput.value = '';
        contentInput.value = '';
       })
   })

   refreshBtn.addEventListener('click',function(){
    fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
    .then(res=>res.json())
    .then((data)=>{
       (Object.entries(data)).forEach(([id, info])=>{
           messageBox.textContent += `${info["author"]}: ${info["content"]}\n`
       });
    })
   })
}

attachEvents();