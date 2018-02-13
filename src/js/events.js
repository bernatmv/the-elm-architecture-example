import { app } from './state';
import { listen } from './lib/functions';
import { addFavorite, deleteFavorites, searchByActor, searchBySerie, toggleselectFavorite } from './messages';
import { SERIES, ACTORS } from './lib/constants';

export function registerEventHandlers() {

    listen('click', '#searchButton', event => {
        const searchInput = document.getElementById('searchInput');
        const searchCategory = document.getElementById('searchCategory');

        if (searchCategory && searchCategory.value === SERIES) {
            app.dispatch(searchBySerie(searchInput.value));
        }
        if (searchCategory && searchCategory.value === ACTORS) {
            app.dispatch(searchByActor(searchInput.value));
        }
        event.stopPropagation();
    });

    listen('keyup', '#searchInput', event => {
        const searchInput = document.getElementById('searchInput');
        const searchCategory = document.getElementById('searchCategory');

        if (event.keyCode == 13) {
            if (searchCategory && searchCategory.value === SERIES) {
                app.dispatch(searchBySerie(searchInput.value));
            }
            if (searchCategory && searchCategory.value === ACTORS) {
                app.dispatch(searchByActor(searchInput.value));
            }
        }
    });

    listen('click', '.addFavorite', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        const category = event.target.getAttribute('data-category');
        app.dispatch(addFavorite({id: id, category: category}));
        event.stopPropagation();
    });

    listen('click', '.favorites__item', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        const category = event.target.getAttribute('data-category');
        app.dispatch(toggleselectFavorite({id: id, category: category}));
        event.stopPropagation();
    });

    listen('click', '.deleteSelected', event => {
        app.dispatch(deleteFavorites());
        event.stopPropagation();
    });
}