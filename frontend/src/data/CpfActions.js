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

  toggleBlacklisted(id) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.TOGGLE_BLACKLISTED,
      id,
    });
  },

  updateDraft(number) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.UPDATE_DRAFT,
      number,
    });
  },

  updateFilter(filterText) {
    CpfDispatcher.dispatch({
      type: CpfActionTypes.UPDATE_FILTER,
      filterText,
    });
  },

};

export default Actions;
