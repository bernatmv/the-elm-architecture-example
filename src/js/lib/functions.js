export function listen(eventName, selector, handler) {

    document.body.addEventListener(eventName, event => {
        if (event.target.matches(selector)) {
            return handler(event);
        }
    });
}

export function createModel(reducer, initial = {}) {
    const listeners = [];
    let state = initial;

    return {
        dispatch(change) {
            state = reducer(state, change) || state;

            for (let listener of listeners) {
                listener(state);
            }
        },

        getState() {
            return state;
        },

        subscribe(listener) {
            listeners.push(listener);
        }
    };
}
