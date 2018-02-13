import { app } from './state';
import { render } from './view';
import { registerEventHandlers } from './events';

const appHTML = document.getElementById('app');

app.subscribe(newState => render(appHTML, newState));

render(appHTML, app.getState());
registerEventHandlers();