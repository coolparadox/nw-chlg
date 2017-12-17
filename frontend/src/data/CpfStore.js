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

  popHttpAlert(http) {
    alert(http.status + " " + http.statusText + "\n" + JSON.parse(http.responseText).data.message);
  }

  popHttpAlertIfNotStatus(http, status) {
    if (http.status != status) {
      this.popHttpAlert(http);
    }
  }

  getInitialState() {

    var answer = Immutable.OrderedMap();
    var http = new XMLHttpRequest();
    http.open("GET", theUrl, false);
    http.send();
    // console.log(http.status);
    if (http.status != 200) {
      this.popHttpAlert(http);
      return answer;
    }
    // console.log(http.responseText);
    const cpfs = JSON.parse(http.responseText);
    // console.log(cpfs);

    if (cpfs.data == null)
      return answer;
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
        if (!action.number) {
          return state;
        }
        var cpf = {
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
        this.popHttpAlertIfNotStatus(http, 201);
        return this.getInitialState();

      case CpfActionTypes.DELETE_CPF:
        const ok = confirm("Are you sure you want to delete this entry?");
        if (!ok)
          return this.getInitialState();
        var http = new XMLHttpRequest();
        http.open("DELETE", theUrl + "/" + action.id, false);
        http.send();
        this.popHttpAlertIfNotStatus(http, 204);
        return this.getInitialState();

      case CpfActionTypes.EDIT_CPF:
        console.log("CpfStore EDIT_CPF");
        return state.setIn([action.id, 'number'], action.number);

      case CpfActionTypes.STOP_EDITING_CPF:
        console.log("CpfStore STOP_EDITING_CPF");
        if (!action.number) {
          console.log("empty action number");
          return this.getInitialState();
        }
        // console.log("action number " + action.number);
        var cpf = {
          data: {
            cpf: action.number,
            is_cnpj: false,
            blacklisted: false,
          },
        };
        // console.log("action id " + action.id);
        var http = new XMLHttpRequest();
        http.open("PUT", theUrl + "/" + action.id, false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(cpf));
        this.popHttpAlertIfNotStatus(http, 200);
        return this.getInitialState();

      case CpfActionTypes.TOGGLE_BLACKLISTED:
        console.log("CpfStore TOGGLE_BLACKLISTED " + action.id);
        var http = new XMLHttpRequest();
        http.open("GET", theUrl + "/" + action.id, false);
        http.send();
        if (http.status != 200) {
          this.popHttpAlert(http);
          return this.getInitialState();
        }
        var cpf = JSON.parse(http.responseText);
        // console.log(cpf);
        cpf.data.blacklisted = !cpf.data.blacklisted;
        http.open("PUT", theUrl + "/" + action.id, false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(cpf));
        this.popHttpAlertIfNotStatus(http, 200);
        return this.getInitialState();

      default:
        return state;
    }
  }
}

export default new CpfStore();
