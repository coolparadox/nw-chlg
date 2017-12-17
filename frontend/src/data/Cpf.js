'use strict';

import Immutable from 'immutable';

const Cpf = Immutable.Record({
  id: '',
  blacklisted: false,
  text: '',
});

export default Cpf;
