'use strict';



{

    function fetchJSON(url, cb) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status < 400) {
                    cb(null, xhr.response);

                } else {
                    cb(new Error(xhr.statusText));
                }
            }
        }
        xhr.send();


    }


    const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    // const url1 = 'https://api.github.com/repos/HackYourFuture/';

    fetchJSON(url, (error, data) => {

        if (error !== null) {

            console.error(error);

        } else {

            repsSelect(data);

        }

    });



    function repsSelect(data) {

        console.log(data);
        const firstRepo = console.log(data[0]);


        fetchJSON(data[0].contributors_url, (error, contributors) => {

            if (error !== null) {

                console.log(error.message);

            } else {

                contributorsSelect(contributors);

            }

        });

        const root = document.getElementById('root');

        const select = createAndAppend('select', root);

        select.addEventListener('change', () => repsSelect(select.value));

        data.forEach(element => {

            const option = createAndAppend('option', select);
            option.setAttribute('value', element.url);
            option.innerHTML = element.name;

        });

    }

    function contributorsSelect(contributors) {

        console.log(contributors);
    }

    function htmlBody(data) {
        const listContainer = createAndAppend('div', root);
        listContainer.setAttribute('class', list_container);

        const table = createAndAppend('table', listContainer);
        const table = createAndAppend('tbody', table);
        const table = createAndAppend('tr', tbody);
        const table = createAndAppend('td1', tr);
        const table = createAndAppend('td2', td1);


    }

    function createAndAppend(tagName, parent) {

        const element = document.createElement(tagName);

        parent.appendChild(element);

        return element;

    }



}