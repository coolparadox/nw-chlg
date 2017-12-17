'use strict';

import Immutable from 'immutable';

const Cpf = Immutable.Record({
  id: '',
  blacklisted: false,
  number: '',
});

export default Cpf;
