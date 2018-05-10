'use strict';
let url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.send();
    });
}

function renderToolBar() {
    let root = document.getElementById('root');
    let listItem = createAndAppend('div', root);
    listItem.id = 'listItem';
    let listItemName = createAndAppend('p', listItem);
    listItemName.innerHTML = 'HYF Repositories';
    let select = createAndAppend('select', listItem);
    select.id = 'selectElement';
    let errorDiv = createAndAppend('div', root);
    errorDiv.id = 'error-container';
    let repositoryContainer = createAndAppend('div', root);
    repositoryContainer.id = 'repo-container';
    let contributorContainer = createAndAppend('div', root);
    contributorContainer.id = 'contribs-container';
    select.addEventListener("change", () => repositoryInfo(select.value));
}

function renderRepository(repository) {
    let select = document.getElementById('selectElement');
    repository.forEach(repository => {
        let option = createAndAppend('option', select);
        option.innerHTML = repository.name;
        option.setAttribute('value', repository.name);
    });
    repositoryInfo(select.value);
}

function createAndAppend(tageName, parent) {
    let element = document.createElement(tageName);
    parent.appendChild(element);
    return element;
}

async function repositoryInfo(repositoryName) {
    try {
        let repositoryUrl = 'https://api.github.com/repos/HackYourFuture/' + repositoryName;
        let repodata = await fetchJSON(repositoryUrl);
        let contributors = await fetchJSON(repodata.contributors_url);
        renderRepositoryToHTML(repodata);
        renderContributors(contributors);
    } catch (err) {
        let errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = err.message;
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
    let Contributions = createAndAppend('p', container);
    Contributions.innerHTML = 'Contributions';
    let ul = createAndAppend('ul', container);
    contributors.forEach(contributor => {
        let li = createAndAppend('li', ul);
        li.innerHTML = "";
        let img = createAndAppend('img', li);
        li.innerHTML = contributor.login + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + contributor.contributions + "<img src=" + contributor.avatar_url + ">";
        img.setAttribute('src', contributor.avatar_url);
        li.setAttribute('value', contributor.login);
    });
}

async function main() {
    try {
        renderToolBar();
        let repos = await fetchJSON(url);
        renderRepository(repos);
    } catch (err) {
        let errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = err.message;
    }
}
window.onload = main;