
const btn = document.getElementById('submit');


const weatherSymbols = {
    sunny: "☀",
    partlysunny: "⛅",
    overcast:"☁",
    rain:"☂",
    degrees:"°"
}

function attachEvents() {

    btn.addEventListener('click',function(){
        fetch('https://judgetests.firebaseio.com/locations.json')
        .then(res=>res.json())
        .then(data=>{
            const loc = document.querySelector("#location").value;
         let output =  data.find(d=>d.name === loc)
            let code = output.code;
            currentConditions(code);
        })
    })

}

const containerCurrent = document.getElementById('current');
function currentConditions(code){
    fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
    .then(res=>res.json())
    .then(data=>{
    
        const {condition, high, low} = data.forecast;
        const symbol = getNormaliziedSymbol(condition);
       
        document.getElementById('forecast').style.display = 'block';
        const divForecastWrapper = createHTMLElements('div',['forecasts']);
        const spanSymbol = createHTMLElements('span',['condition','symbol'],weatherSymbols[symbol]);
        divForecastWrapper.appendChild(spanSymbol)
        containerCurrent.appendChild(divForecastWrapper)

        const spanWrapper = createHTMLElements('span',['condition']);
        const spanName = createHTMLElements('span', ['forecast-data'],data.name)

        const degreesInfo = `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`
        const spanDegrees = createHTMLElements('span', ['forecast-data'],degreesInfo)
        const spanCondition = createHTMLElements('span', ['forecast-data'],condition)
        spanWrapper.appendChild(spanName);
        spanWrapper.appendChild(spanDegrees);
        spanWrapper.appendChild(spanCondition)
        divForecastWrapper.appendChild(spanWrapper)
        upcomingConditions(code)
    })
}

function upcomingConditions(code){
    fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
    .then(res=>res.json())
    .then(data=>{
        const {forecast,name} = data
        const divWrapper = createHTMLElements('div',['forecast-info'])
       
       
       forecast.forEach(entry=>{
        const spanWrapper = createHTMLElements('span',["upcoming"]);
        const innerText =  getNormaliziedSymbol(entry.condition);
        const symbol2 = createHTMLElements('span',["symbol"],weatherSymbols[innerText]);
        const degreesInfo = `${entry.low}${weatherSymbols.degrees}/${entry.high}${weatherSymbols.degrees}`
        const spanDegrees = createHTMLElements('span', ['forecast-data'],degreesInfo)
        const spanCondition = createHTMLElements('span', ['forecast-data'],entry.condition)
        spanWrapper.appendChild(symbol2);
        spanWrapper.appendChild(spanDegrees);
        spanWrapper.appendChild(spanCondition);
        //spanWrapper.append(symbol2,spanDegrees,spanCondition);
        divWrapper.appendChild(spanWrapper);
        document.getElementById('upcoming').appendChild(divWrapper)
       })
    })
}

function generateHTML(today,upcoming){
    
}

function getNormaliziedSymbol(symbol){
    return symbol.split('').filter((c)=> c !== " ").map((c)=> c.toLowerCase()).join('');
}
/**
 * 
 * @param {String} tagName 
 * @param {Array} classNames 
 * @param {String} textContent 
 */

function createHTMLElements(tagName,classNames,textContent){
    const element = document.createElement(tagName);
    if(classNames){
        element.classList.add(...classNames);
    }
    if(textContent){
        element.textContent = textContent;
    }

    return element;
}

attachEvents();