import {SEARCH_BY_ACTOR, SEARCH_BY_SERIE, ADD_FAVORITE, DELETE_FAVORITE, SELECT_FAVORITE} from './lib/constants';

export function searchByActor(text) {
    return {
        type: SEARCH_BY_ACTOR,
        text
    };
}

export function searchBySerie(text) {
    return {
        type: SEARCH_BY_SERIE,
        text
    };
}

export function addFavorite(data) {
    return {
        type: ADD_FAVORITE,
        data
    }
}

export function toggleselectFavorite(data) {
    return {
        type: SELECT_FAVORITE,
        data
    }
}

export function deleteFavorites(data) {
    return {
        type: DELETE_FAVORITE,
        data
    }
}