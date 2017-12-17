'use strict';

import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

const Actions = {
  addCpf(number) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.ADD_CPF,
      number,
    });
  },

  deleteCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.DELETE_CPF,
      id,
    });
  },

  editCpf(id, number) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.EDIT_CPF,
      id,
      number,
    });
  },

  startEditingCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.START_EDITING_CPF,
      id,
    });
  },

  stopEditingCpf(id, number) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.STOP_EDITING_CPF,
      id,
      number,
    });
  },

  blacklistCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.BLACKLIST_CPF,
      id,
    });
  },

  updateDraft(number) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.UPDATE_DRAFT,
      number,
    });
  },
};

export default Actions;
