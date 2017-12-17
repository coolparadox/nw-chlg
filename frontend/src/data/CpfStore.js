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
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.onreadystatechange=function() {
      if (xhttp.readyState==4 && xhttp.status==200) {
        console.log(xhttp.status);
        console.log(xhttp.responseText);
      }
    }
    xhttp.send();

    return Immutable.OrderedMap();
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
