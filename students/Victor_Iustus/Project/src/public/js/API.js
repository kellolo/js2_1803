
function makeGETRequest(url) {
    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error(xhr.statusText));
            }
        };

        xhr.onerror = function() {
            reject(Error("makeGETRequest() Error"));
        };

        xhr.send();
    });
}

export function getCatalog() {
    return makeGETRequest(`/catalogData.json`).then( json => JSON.parse(json) )
}

export function getCart() {
    return makeGETRequest(`/getBasket.json`).then( json => JSON.parse(json) )
}

export function addCart() {
    return makeGETRequest(`/addToBasket.json`).then( json => JSON.parse(json) )
}

export function clearCart() {
    return makeGETRequest(`/deleteFromBasket.json`).then( json => JSON.parse(json) )
}

getCatalog().then( res => console.log(res))
getCart().then( res => console.log(res))
addCart().then( res => console.log(res))
clearCart().then( res => console.log(res))
