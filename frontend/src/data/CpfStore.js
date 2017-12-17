'use strict';

import Counter from './Counter';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Cpf from './Cpf';
import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

const theUrl = "http://cpf.mydomain.org/cpfs";

class CpfStore extends ReduceStore {

  constructor() {
    super(CpfDispatcher);
  }

  getInitialState() {

    var answer = Immutable.OrderedMap();
    var http = new XMLHttpRequest();
    http.open("GET", theUrl, false);
    http.send();
    // console.log(http.status);
    if (http.status != 200) {
      alert(http.status + " " + http.statusText + "\n" + JSON.parse(http.responseText).data.message);
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
        const cpf = {
          data: {
            cpf: action.number,
            is_cnpj: false,
            blacklisted: false,
          },
        };
        var http = new XMLHttpRequest();
        http.open("POST", theUrl, false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(cpf));
        if (http.status != 201) {
          console.log
          alert(http.status + " " + http.statusText + "\n" + JSON.parse(http.responseText).data.message);
        }
        return this.getInitialState();

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
