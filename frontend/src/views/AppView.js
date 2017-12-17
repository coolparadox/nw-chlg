'use strict';

import React from 'react';

import classnames from 'classnames';

function AppView(props) {
  return (
    <div>
      <Header {...props} />
      <Main {...props} />
    </div>
  );
}

function Header(props) {
  return (
    <header id="header">
      <h1>cpfs</h1>
      <NewCpf {...props} />
    </header>
  );
}

function Main(props) {
  if (props.cpfs.size === 0) {
    return null;
  }

  // If this were expensive we could move it to the container.
  const areAllBlacklisted = props.cpfs.every(cpf => cpf.blacklisted);

  return (
    <section id="main">
      <ul id="cpf-list">
        {[...props.cpfs.values()].reverse().map(cpf => (
          <CpfItem
            key={cpf.id}
            editing={props.editing}
            cpf={cpf}
            onDeleteCpf={props.onDeleteCpf}
            onEditCpf={props.onEditCpf}
            onStartEditingCpf={props.onStartEditingCpf}
            onStopEditingCpf={props.onStopEditingCpf}
            onBlacklistCpf={props.onBlacklistCpf}
          />
        ))}
      </ul>
    </section>
  );
}

const ENTER_KEY_CODE = 13;
function NewCpf(props) {
  const addCpf = () => props.onAdd(props.draft);
  const onBlur = () => addCpf();
  const onChange = (event) => props.onUpdateDraft(event.target.value);
  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      addCpf();
    }
  };
  return (
    <input
      autoFocus={true}
      id="new-cpf"
      placeholder="Enter new CPF / CNPJ"
      value={props.draft}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

function CpfItem(props) {
  const {editing, cpf} = props;
  const isEditing = editing === cpf.id;
  const onDeleteCpf = () => props.onDeleteCpf(cpf.id);
  const onStartEditingCpf = () => props.onStartEditingCpf(cpf.id);
  const onBlacklistCpf = () => props.onBlacklistCpf(cpf.id);

  // Construct the input for editing a task if necessary.
  let input = null;
  if (isEditing) {
    const onChange = (event) => props.onEditCpf(cpf.id, event.target.value);
    const onStopEditingCpf = props.onStopEditingCpf;
    const onKeyDown = (event) => {
      if (event.keyCode === ENTER_KEY_CODE) {
        onStopEditingCpf(cpf.id, event.target.value);
      }
    };
    input =
      <input
        autoFocus={true}
        className="edit"
        value={cpf.number}
        onBlur={onStopEditingCpf}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />;
  }

  return (
    <li
      className={classnames({
        blacklisted: cpf.blacklisted,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          className="blacklist"
          type="checkbox"
          checked={cpf.blacklisted}
          onChange={onBlacklistCpf}
        />
        <label onDoubleClick={onStartEditingCpf}>
          {cpf.number}
        </label>
        <button className="destroy" onClick={onDeleteCpf} />
      </div>
      {input}
    </li>
  );
}


export default AppView;
