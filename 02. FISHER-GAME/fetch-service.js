const catches = function(){

    const baseUrl = 'https://fisher-game.firebaseio.com/catches/'

    const get = (data)=>{
        return fetch(baseUrl+'.json')
        .then(res=>res.json())
        .catch(e=>console.log(e));
    };

    
    const post = (data)=>{
       return fetch(baseUrl + ".json",{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/js'
            }
        }).then(res=>res.json());
    };

    
    const put = (data)=>{

    };

    
    const del = (id) => {
       
        return fetch(baseUrl + `${id}.json`, {
            method: 'DELETE'
        })
            .catch(console.err);
 
    };

    
    return{
        get,
        post,
        put,
        del
    }
}();