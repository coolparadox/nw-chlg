'use strict';

import {ReduceStore} from 'flux/utils';
import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

class CpfDraftStore extends ReduceStore {
  constructor() {
    super(CpfDispatcher);
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case CpfActionTypes.ADD_CPF:
        return '';

      case CpfActionTypes.UPDATE_DRAFT:
        return action.number;

      default:
        return state;
    }
  }
}

export default new CpfDraftStore();
