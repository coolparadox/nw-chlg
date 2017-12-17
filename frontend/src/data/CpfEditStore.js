/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import CpfActionTypes from './CpfActionTypes';
import CpfDispatcher from './CpfDispatcher';

class CpfEditStore extends ReduceStore {
  constructor() {
    super(CpfDispatcher);
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case CpfActionTypes.START_EDITING_CPF:
        return action.id;

      case CpfActionTypes.STOP_EDITING_CPF:
        return '';

      default:
        return state;
    }
  }
}

export default new CpfEditStore();
