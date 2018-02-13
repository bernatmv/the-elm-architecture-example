import { SERIES, ACTORS } from './lib/constants';
import { registerEventHandlers } from './events';

export function render(el, state) {
    console.log('state', state);
    //const todoItems = state.todos.map(renderTodoItem).join('');

    el.innerHTML = renderApp(
        renderSearchResults(state.searchResults),
        renderFavorites(state.favorites)
    );
    document.getElementById('searchInput').focus();
}

function renderApp(searchResults, favorites) {
    return `
        <div>
            ${searchResults}
            ${favorites}
        </div>      
    `;
}

function renderSearchResults(list) {
    return `
        <ul class="panel-block search-results">
            ${list.map(item => renderListItem(item, false)).join('')}
        </ul>
    `;
}

function renderListItem(item, favorite) {
    const el = item.show ? item.show : item.person;
    const category = item.show ? SERIES : ACTORS;

    return `
        <li class="box${favorite ? ' favorites__item selectFavorite' : ''}${!!el.selected ? ' selected' : ''}" data-id="${el.id}" data-category="${category}">
            <article class="media">
                <div class="media-left cover">
                    <figure class="image cover__image">
                    <img src="${el.image ? el.image.medium : ''}" alt="${el.name}">
                    </figure>
                </div>
                <div class="media-content">
                    <p><strong>${el.name}</strong> <small>${el.network ? '(' + el.network.name + ')' : ''}</small></p>
                    ${el.genres ? el.genres.map(genre => `<span class="tag">${genre}</span>`).join(' ') : `<span class="tag">actors</span>`}
                </div>
                <div class="media-right">
                    <a class="button is-success is-outlined${favorite ? ' selectFavorite' : ' addFavorite'}" data-id="${el.id}" data-category="${category}">
                        <span class="${favorite ? ' selectFavorite' : ' addFavorite'}" data-id="${el.id}" data-category="${category}">${favorite ? 'Selected' : 'Save'}</span>
                        <span class="icon is-small${favorite ? ' selectFavorite' : ' addFavorite'}" data-id="${el.id}" data-category="${category}"><i class="fa ${favorite ? 'fa-check' : 'fa-heart'}"></i></span>
                    </a>
                </div>
            </article>
        </li>
    `;
}

function renderFavorites(favorites) {
    if (favorites.shows.length === 0 && favorites.persons.length === 0) {
        return '';
    }
    const selected = favorites.shows.filter(item => !!item.show.selected).length + favorites.persons.filter(item => !!item.person.selected).length;

    return `
        <p class="panel-heading">
            Favorites
        </p>
        <div  class="panel-block favorites">
        <ul>
            ${favorites.shows.map(item => renderListItem(item, true)).join('')}
            ${favorites.persons.map(item => renderListItem(item, true)).join('')}
        </ul>
        ${selected > 0 
            ? `
            <div class="media favorites__actions">
                <p class="media-content"><strong>${selected}</strong> items selected</p>
                <p class="media-right">
                    <span class="button is-danger is-outlined deleteSelected">
                        <span class="deleteSelected">Delete selected</span>
                        <span class="icon is-small deleteSelected"><i class="fa fa-times deleteSelected"></i></span>
                    </span>
                </p>
            </div>
                ` : ''}
    `;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;

    return `
        <li class="${todoClass}">
            <input type="checkbox" class="js_toggle_todo" data-id="${todo.id}"${todo.done ? ' checked' : ''} />
            ${todo.text}
        </li>
    `;
}
