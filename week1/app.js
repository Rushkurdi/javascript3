'use strict';
const url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

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
    };
    xhr.send();
}

function cb(error, data) {
    if (error !== null) {

    } else {
        renderRepo(data);
    }
}
fetchJSON(url, cb);

function renderRepo(repository) {
    let root = document.getElementById('root');
    let listItem = createAndAppend('div', root);
    listItem.id = 'listItem';
    let listItemName = createAndAppend('p', listItem);
    listItemName.innerHTML = 'HYF Repositories';
    let select = createAndAppend('select', listItem);
    let repositoryContainer = createAndAppend('div', root);
    repositoryContainer.id = 'repo-container';
    let contributorContainer = createAndAppend('div', root);
    contributorContainer.id = 'contribs-container';
    select.addEventListener("change", () => repositoryInfo(select.value));
    repository.forEach(repository => {
        let option = createAndAppend('option', select);
        option.innerHTML = repository.name;
        option.setAttribute('value', repository.name);
    });
    repositoryInfo(select.value);
}

function createAndAppend(tageName, parent) {
    let elemement = document.createElement(tageName);
    parent.appendChild(elemement);
    return elemement;
}

function repositoryInfo(repositoryName) {
    let urlContributor = 'https://api.github.com/repos/HackYourFuture/' + repositoryName + '/contributors';
    let repositoryUrl = 'https://api.github.com/repos/HackYourFuture/' + repositoryName;
    fetchJSON(urlContributor, listRenderContributor);
    fetchJSON(repositoryUrl, repositoryInfoData);
}

function listRenderContributor(err, dataContributor) {
    if (err !== null) {

    } else {
        renderContributors(dataContributor);
    }
}

function repositoryInfoData(err, dataContributor) {
    if (err !== null) {

    } else {
        renderRepositoryToHTML(dataContributor);
    }
}

function renderRepositoryToHTML(repositoryInfo) {
    let repositoryContainer = document.getElementById('repo-container');
    repositoryContainer.innerHTML = '';
    let p = createAndAppend('p', repositoryContainer);
    let repositoryName = createAndAppend('p', repositoryContainer);
    let forks = createAndAppend('p', repositoryContainer);
    let updated = createAndAppend('p', repositoryContainer);
    repositoryName.innerHTML = 'Repository: &nbsp;&nbsp;&nbsp;' + repositoryInfo.name;
    forks.innerHTML = 'Forks: &nbsp;&nbsp;&nbsp;' + repositoryInfo.forks_count;
    updated.innerHTML = 'Updated: &nbsp;&nbsp;&nbsp;' + repositoryInfo.updated_at;
    p.innerHTML = 'Description: &nbsp;&nbsp;&nbsp;' + repositoryInfo.description;
}

function renderContributors(contributors) {
    let container = document.getElementById('contribs-container');
    container.innerHTML = '';
    let contributions = createAndAppend('p', container);
    contributions.innerHTML = 'Contributions';
    let ul = createAndAppend1('ul', container);
    contributors.forEach(contributor => {
        let li = createAndAppend1('li', ul);
        li.innerHTML = "";
        let img = createAndAppend('img', li);
        li.innerHTML = contributor.login + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + contributor.contributions + "<img src=" + contributor.avatar_url + ">";
        img.setAttribute('src', contributor.avatar_url);
        li.setAttribute('value', contributor.login);
    });
}

function createAndAppend1(tageName, parent) {
    let element = document.createElement(tageName);
    parent.appendChild(element);
    return element;
}