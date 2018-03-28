'use strict'

{
    const API = {
        endpoints: {
            laureate: 'http://api.nobelprize.org/v1/laureate.json?',
            prize: 'http://api.nobelprize.org/v1/prize.json?'
        },
        queries: [{
            description: 'All female laureates',
            endpoint: 'laureate',
            queryString: 'gender=female'
        }]
    };

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {
            if (xhr.readyState < 400) {
                cb(null, xhr.response)

            } else {
                cb(new Error(xhr.statusText))

            }
        }
    };
    xhr.send();

}
const url = API.endpoints.laureate + API.queries[0].queryString;

function callBack(error, data) {
    if (error !== null) {

    }

}
fetchJSON(url, callBack);