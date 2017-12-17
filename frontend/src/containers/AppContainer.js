'use strict';

import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import CpfActions from '../data/CpfActions';
import CpfDraftStore from '../data/CpfDraftStore';
import CpfEditStore from '../data/CpfEditStore';
import CpfStore from '../data/CpfStore';

function getStores() {
  return [
    CpfEditStore,
    CpfDraftStore,
    CpfStore,
  ];
}

function getState() {
  return {
    draft: CpfDraftStore.getState(),
    editing: CpfEditStore.getState(),
    cpfs: CpfStore.getState(),

    onAdd: CpfActions.addCpf,
    onDeleteCompletedCpfs: CpfActions.deleteCompletedCpfs,
    onDeleteCpf: CpfActions.deleteCpf,
    onEditCpf: CpfActions.editCpf,
    onStartEditingCpf: CpfActions.startEditingCpf,
    onStopEditingCpf: CpfActions.stopEditingCpf,
    onBlacklistAllCpfs: CpfActions.blacklistAllCpfs,
    onBlacklistCpf: CpfActions.blacklistCpf,
    onUpdateDraft: CpfActions.updateDraft,
  };
}

export default Container.createFunctional(AppView, getStores, getState);
