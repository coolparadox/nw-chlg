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
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case CpfActionTypes.ADD_CPF:
        // Don't add cpfs with no text.
        if (!action.text) {
          return state;
        }
        const id = Counter.increment();
        return state.set(id, new Cpf({
          id,
          text: action.text,
          complete: false,
        }));

      case CpfActionTypes.DELETE_COMPLETED_CPFS:
        return state.filter(cpf => !cpf.complete);

      case CpfActionTypes.DELETE_CPF:
        return state.delete(action.id);

      case CpfActionTypes.EDIT_CPF:
        return state.setIn([action.id, 'text'], action.text);

      case CpfActionTypes.TOGGLE_ALL_CPFS:
        const areAllComplete = state.every(cpf => cpf.complete);
        return state.map(cpf => cpf.set('complete', !areAllComplete));

      case CpfActionTypes.TOGGLE_CPF:
        return state.update(
          action.id,
          cpf => cpf.set('complete', !cpf.complete),
        );

      default:
        return state;
    }
  }
}

export default new CpfStore();
