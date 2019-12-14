function attachEvents() {
   const loadBtn = document.getElementById('btnLoad');
   const createBtn = document.getElementById('btnCreate');
   const personInput = document.getElementById('person');
   const phoneInput = document.getElementById('phone');
   const outputContainer = document.getElementById('phonebook');

   loadBtn.addEventListener('click',load);
   function load(){
    fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
    .then(res=>res.json())
    .then(data=>{
         Object.entries(data).forEach(([elementId,phoneBookData])=>{
             
             const li = document.createElement('li');
             li.textContent = `${phoneBookData["person"]}: ${phoneBookData["phone"]}\n`
             const delBtn = document.createElement('button');
             delBtn.setAttribute('data-target',elementId);
             delBtn.textContent = 'Delete';
             li.appendChild(delBtn)
             outputContainer.appendChild(li);
             delBtn.addEventListener('click',deletePhoneBook)
         })
    })
   }

   createBtn.addEventListener('click',function(){
       let person = personInput.value;
       let phone = phoneInput.value;

       const headers = {
           method:'POST',
           headers:{'Content-type':'application/json'},
           body: JSON.stringify({person,phone})
       }

       fetch('https://phonebook-nakov.firebaseio.com/phonebook.json',headers)
       .then(res=>res.json())
       .then(()=>{
        outputContainer.innerHTML = '';
        personInput.value = '';
        phoneInput.value = '';

        load();     
       })
   })

   function deletePhoneBook(){
      let currentID =  this.getAttribute('data-target');
     
      const headers = {
          method:'DELETE'
      }
      fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${currentID}.json`,headers)
      .then(()=>{
        outputContainer.removeChild(this.parentNode)
      }).catch(console.log('error'))
   }
}

attachEvents();