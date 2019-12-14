function solve() {
    const[titleInput, yearInput, priceInput] = Array.from(document.querySelectorAll('form > input'));
    const addBtn = document.querySelector("body > form > button");
    const totalProfitHeader = Array.from(document.getElementsByTagName('h1'))[1];
    const [oldShelf,newShelf] = Array.from(document.getElementsByClassName('bookShelf'));
    let totalSum = 0;

    addBtn.addEventListener('click',function(e){
        e.preventDefault();

        const title = titleInput.value;
        const year = Number(yearInput.value);
        const price = Number(priceInput.value);

        if(title !== "" && year >0 && price >0){
            if(year>=2000){
               createBook(false,title,year,price,newShelf);
            }else{
                createBook(true,title,year,price,oldShelf);
            }
        }
    });
    function createBook(isOld,title,year,price,shelf){
        price = isOld ? price * 0.85 : price;
        const bookElement = document.createElement('div');
        const p = document.createElement('p');
        const buyBtn = document.createElement('button');
        const moveBtn = document.createElement('button');
        bookElement.classList.add('book');

        p.textContent = `${title} [${year}]`;
        buyBtn.textContent = `Buy it only for ${price.toFixed(2)} BGN`;

        bookElement.appendChild(p);
        bookElement.appendChild(buyBtn);

        if(!isOld){
        
            moveBtn.textContent = 'Move to old section';
            bookElement.appendChild(moveBtn);
        }

        buyBtn.addEventListener('click',function(e){
            totalSum += price;
            this.parentNode.parentNode.removeChild(this.parentNode);
            totalProfitHeader.textContent =`Total Store Profit: ${totalSum.toFixed(2)} BGN`;
        })

        moveBtn.addEventListener('click',function(){
            this.parentNode.parentNode.removeChild(this.parentNode);
            createBook(true,title,year,price,oldShelf)
        })

       shelf.appendChild(bookElement);
    }
}