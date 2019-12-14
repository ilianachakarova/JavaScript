const username = 'guest';
const password = 'pass';

const appKey = 'kid_BJ_Ke8hZg';

const baseUrl = 'https://baas.kinvey.com/';

function makeHeaders(httpMethod){
    const headers = {
        method: httpMethod,
        headers:{
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type":"application/json"
        }
    }
    return headers;
}

function handleError(e){
    if(!e.ok){
        throw new Error(e.statusText)
    }
    return e;
}

function serializeData(x){
    return x.json();
}

function createPromise(url,headers){
    
    return fetch(url,headers)
    .then(handleError)
    .then(serializeData)
}

export function post(date){
    const url = `${baseUrl}rpc/${appKey}/custom/calendar?query=${date}`;

    const headers = makeHeaders("POST")
    return createPromise(url,headers);
}

export function get(id){
    const url = `${baseUrl}appdata/${appKey}/venues/${id}`;
    const headers = makeHeaders("GET");
    return createPromise(url,headers)
}