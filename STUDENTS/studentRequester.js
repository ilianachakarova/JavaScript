const username = "guest";
const password = "guest";

const appKey = "kid_Sy8ZTBQhr";
const keySecret = "68ec906d673a4a5baadd90b7f68d3321";

const baseUrl = 'https://baas.kinvey.com/';

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

export function get(kinveyModule,endpoint){
    const headers = makeHeaders("GET")
   return createPromise(kinveyModule,endpoint,headers);
}

export function post(kinveyModule,endpoint,data){
    const headers = makeHeaders("POST",data)
   return createPromise(kinveyModule,endpoint,headers)
}

export function put(kinveyModule,endpoint,data){
    const headers = makeHeaders("PUT",data);
    return createPromise(kinveyModule,endpoint,headers)
}

export function del(kinveyModule,endpoint){
    const headers = makeHeaders("DELETE");
    return createPromise(kinveyModule,endpoint,headers)
}