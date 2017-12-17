'use strict';

import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

const Actions = {
  addCpf(text) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.ADD_CPF,
      text,
    });
  },

  deleteCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.DELETE_CPF,
      id,
    });
  },

  editCpf(id, text) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.EDIT_CPF,
      id,
      text,
    });
  },

  startEditingCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.START_EDITING_CPF,
      id,
    });
  },

  stopEditingCpf() {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.STOP_EDITING_CPF,
    });
  },

  blacklistCpf(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.BLACKLIST_CPF,
      id,
    });
  },

  updateDraft(text) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.UPDATE_DRAFT,
      text,
    });
  },
};

export default Actions;
