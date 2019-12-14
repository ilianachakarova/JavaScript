import {post, get} from './vanuemasterRequester.js'
const html = {
    'getItemName':()=>document.getElementById('name-item'),
    'getVenuePrice':()=>document.getElementById('venue-price'),
    'getVenueInfo':()=>document.getElementById('venue-info')
}

const actions = {
    'performPostRequest': async function(){
        const date = document.getElementById('venueDate').value;
        const idArray = await post(date);
        idArray.forEach(id=>{
          actions['performGetRequest'](id)
          })
    },
    'performGetRequest': async function(id){
        const currentItem =  await get(id);
        const fragment = actions["createHtml"](currentItem);
        html['getVenueInfo']().appendChild(fragment)
        // html['getItemName']().textContent = currentItem["name"]
        // console.log(html['getVenuePrice']())
        // html['getVenuePrice']().textContent = currentItem["price"]
       
    },
    'createHtml': function(currentItem){
       
        const divVenue = document.createElement('div');
        divVenue.classList.add('venue');
        

        const spanVenue = document.createElement('span');
        spanVenue.classList.add('venue-name');
        spanVenue.textContent = currentItem['name']


        const moreInfoBtn = document.createElement('button');
        moreInfoBtn.classList.add('info');
        moreInfoBtn.textContent = 'More Info';
        moreInfoBtn.addEventListener('click',function(){
            table.style = "display: block";
            descriptionSpan.style = "display: block";
            descriptionParagraph.style = "display: block";
            startingHour.style = "display: block";
        })

        spanVenue.appendChild(moreInfoBtn);
        divVenue.appendChild(spanVenue)

        const table = document.createElement('table');
        table.style = 'display: none';
        const trHead = document.createElement('tr');
        const thPrice = document.createElement('th');
        thPrice.textContent = 'Ticket Price'
        const thQuantity = document.createElement('th');
        thQuantity.textContent = 'Quantity'

        trHead.append(thPrice,thQuantity);
        table.appendChild(trHead);

        const trTable = document.createElement('tr');
        const tdPrice = document.createElement('td');
        tdPrice.textContent = currentItem["price"];
        tdPrice.classList.add('venue-price');
        const tdQuantity = document.createElement('td');
        const selectEl = document.createElement('select');
        selectEl.classList.add('quantity');
        for(let i = 1; i<6;i++){
            const option = document.createElement('option')
            option.setAttribute("value",`${i}`);
            option.textContent = i;
            selectEl.appendChild(option)
        }
        tdQuantity.appendChild(selectEl)
        const tdPurchase = document.createElement('td');
        const purchaseBtn = document.createElement('button');
        purchaseBtn.classList.add('purchase');
        purchaseBtn.textContent = 'Purchase';
        tdQuantity.appendChild(purchaseBtn);
        trTable.append(tdPrice,tdQuantity,tdPurchase);
        table.appendChild(trTable);

        divVenue.appendChild(table)

        const descriptionSpan = document.createElement('span')
        descriptionSpan.classList.add('head');
        descriptionSpan.textContent = 'Venue description';
        descriptionSpan.style = 'display: none';

        divVenue.appendChild(descriptionSpan);

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.id = 'description';
        descriptionParagraph.textContent = currentItem["description"];
        descriptionParagraph.style = 'display: none'

        divVenue.appendChild(descriptionParagraph);

        const startingHour = document.createElement('p');
        startingHour.classList.add('description');
        startingHour.textContent = 'Starting hour '+ currentItem["startingHour"];
        startingHour.style = 'display: none';

        divVenue.appendChild(startingHour);

       return divVenue;
    }
}

function handleEvent(e){
    if(e.target.id === 'getVenues'){
        
        try{
            actions['performPostRequest']();
        }catch(err){
            console.log(err)
        }
       
    
    }
}

(function attachEvents(){
    document.addEventListener('click',handleEvent)
}())