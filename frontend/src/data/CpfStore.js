'use strict';

import Counter from './Counter';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Cpf from './Cpf';
import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

class CpfStore extends ReduceStore {
  constructor() {
    super(CpfDispatcher);
  }

  getInitialState() {

    const url = "http://cpf.mydomain.org/cpfs";
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.send();
    var answer = Immutable.OrderedMap();
    // console.log(http.status);
    if (http.status != 200) {
      alert("Server error " + http.status + " " + http.statusText);
      return answer;
    }
    // console.log(http.responseText);
    const cpfs = JSON.parse(http.responseText);
    // console.log(cpfs);
    for (const cpf of cpfs.data) {
      // console.log(cpf);
      answer = answer.set(cpf.id, new Cpf({
        id: cpf.id,
        number: cpf.cpf,
        blacklisted: cpf.blacklisted,
      }));
    }
    return answer;
  }

  reduce(state, action) {
    switch (action.type) {
      case CpfActionTypes.ADD_CPF:
        // Don't add cpfs with no number.
        if (!action.number) {
          return state;
        }
        const id = Counter.increment();
        return state.set(id, new Cpf({
          id,
          number: action.number,
          blacklisted: false,
        }));

      case CpfActionTypes.DELETE_CPF:
        return state.delete(action.id);

      case CpfActionTypes.EDIT_CPF:
        return state.setIn([action.id, 'number'], action.number);

      case CpfActionTypes.BLACKLIST_CPF:
        return state.update(
          action.id,
          cpf => cpf.set('blacklisted', !cpf.blacklisted),
        );

      default:
        return state;
    }
  }
}

export default new CpfStore();
