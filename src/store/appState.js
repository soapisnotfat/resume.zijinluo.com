import createHistory from 'history/createBrowserHistory';
import { observable } from 'mobx';

let appState = observable({
  featured: true,
  showSeal: false,
  info: {
    data: null
  },
  award: {
    data: null,
    show: true
  },
  coursework: {
    data: null,
    show: true
  },
  education: {
    data: null,
    show: true
  },
  experience: {
    data: null,
    show: true
  },
  skill: {
    data: null,
    show: true
  },
  project: {
    data: null,
    show: true
  },
  publication: {
    data: null,
    show: true
  },
  people: {
    data: null
  }
});

export const history = createHistory();
export default appState;
