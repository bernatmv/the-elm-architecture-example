import {SEARCH_BY_ACTOR, SEARCH_BY_SERIE, ADD_FAVORITE, DELETE_FAVORITE, SERIES, ACTORS, SELECT_FAVORITE} from './lib/constants';
import { createModel } from './lib/functions';
import http from 'http.min';

const API_URL = 'http://api.tvmaze.com/search/';

const initialState = {
    searchResults: [],
    favorites: {
        shows: [],
        persons: []
    }
};

function appChangeHandler(state, change) {
    switch (change.type) {
        case ADD_FAVORITE: {
            if (change.data.category === SERIES && !showExist(state.favorites.shows, change.data.id)) {
                const show = state.searchResults.find(item => item.show.id === change.data.id);
                if (show) {
                    state.favorites.shows.push(show);
                }
            }
            if (change.data.category === ACTORS && !actorExist(state.favorites.persons, change.data.id)) {
                const actor = state.searchResults.find(item => item.person.id === change.data.id);
                if (actor) {
                    state.favorites.persons.push(actor);
                }
            }
            break;
        }
        case SELECT_FAVORITE: {
            console.log('in', change, state);
            if (change.data.category === SERIES && showExist(state.favorites.shows, change.data.id)) {
                state.favorites.shows.forEach(item => {
                    if (item.show.id === change.data.id) {
                        item.show.selected = !item.show.selected;
                    }
                });
            }
            if (change.data.category === ACTORS && actorExist(state.favorites.persons, change.data.id)) {
                state.favorites.persons.forEach(item => {
                    if (item.person.id === change.data.id) {
                        item.person.selected = !item.person.selected;
                    }
                });
            }
            break;
        }
        case DELETE_FAVORITE: {
            let newShows = [];
            let newPersons = [];
            state.favorites.shows.forEach(item => {
                if (!item.show.selected) {
                    newShows.push(item);
                }
            });
            state.favorites.persons.forEach(item => {
                if (!item.person.selected) {
                    newPersons.push(item);
                }
            });
            state.favorites.shows = newShows;
            state.favorites.persons = newPersons;
            break;
        }
        case SEARCH_BY_ACTOR: {
            search(state, 'people', change.text);
            break;
        }
        case SEARCH_BY_SERIE: {
            search(state, 'shows', change.text);
            break;
        }
    }
}

function showExist(collection, id) {
    return collection.filter(item => item.show.id === id).length > 0;
}

function actorExist(state, id) {
    return collection.filter(item => item.person.id === id).length > 0;
}

function search(state, category, text) {
    http({
            uri: API_URL + category,
            json: true,
            query: {q: text}
        },)
        .then((response) => {
            if (response && response.data && response.data.length > 0) {
                state.searchResults = response.data;
            } else {
                state.searchResults = [];
            }
        });
}

export const app = createModel(appChangeHandler, initialState);