const username = "Gosho";
const password = "pesho";

const appKey = 'kid_HJ8uX9Z2r';
const keySecret = '7805343bd2634b60ae886bc47fa7d789';

const baseUrl = 'https://baas.kinvey.com/'

function makeHeaders(httpMethod,data){
    const headers = {
        method: httpMethod,
        headers:{
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type":"application/json"
        }
    }

    if(httpMethod === "POST" || httpMethod === "PUT"){
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handleError(e){
    if(!e.ok){
        throw new Error(e.statusText);
    }
    return e;
}

function serializeData(x){
    return x.json();
}

function createPromise(kinveyModule,endPoint,headers){
    const url = `${baseUrl}${kinveyModule}/${appKey}/${endPoint}`

    return fetch(url,headers)
    .then(handleError)
    .then(serializeData);
}

export function get(kinveyModule,endPoint){
    const headers = makeHeaders("GET");
    return createPromise(kinveyModule,endPoint,headers)
}

export function post(kinveyModule,endPoint,data){
    const headers = makeHeaders("POST", data);
    return createPromise(kinveyModule,endPoint,headers);
}

export function put(kinveyModule,endPoint,data){
    const headers = makeHeaders("PUT", data);
    return createPromise(kinveyModule,endPoint,headers);
}

export function del(kinveyModule,endPoint){
    const headers = makeHeaders("DELETE");
    return createPromise(kinveyModule,endPoint,headers);
}

