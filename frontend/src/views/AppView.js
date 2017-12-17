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
      <h1>cpfs!!</h1>
      <CpfFilter {...props} />
      <NewCpf {...props} />
    </header>
  );
}

function Main(props) {
  if (props.cpfs.size === 0) {
    return null;
  }

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
            onToggleBlacklisted={props.onToggleBlacklisted}
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

function CpfFilter(props) {
  const onChange = (event) => props.onUpdateFilter(event.target.value);
  return (
    <input
      autoFocus={true}
      id="filter-cpf"
      placeholder="Search by"
      value={props.filter}
      onChange={onChange}
    />
  );
}

function formatCpf(text) {
  console.log ("formatCpf " + text + ", length " + text.length);
  switch (text.length) {
    case 11:
      // Assume it's a CPF number
      return text.substr(0, 3) + "." + text.substr(3, 3) + "." + text.substr(6, 3) + "-" + text.substr(9);
    case 14:
      // Assume it's a CNPJ number
      return text.substr(0, 2) + "." + text.substr(2, 3) + "." + text.substr(5, 3) + "/" + text.substr(8, 4) + "-" + text.substr(12);
    default:
      return text;
  }
}

function CpfItem(props) {
  const {editing, cpf} = props;
  const isEditing = editing === cpf.id;
  const onDeleteCpf = () => props.onDeleteCpf(cpf.id);
  const onStartEditingCpf = () => props.onStartEditingCpf(cpf.id);
  const onToggleBlacklisted = () => props.onToggleBlacklisted(cpf.id);

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
          onChange={onToggleBlacklisted}
        />
        <label onDoubleClick={onStartEditingCpf}>
          {formatCpf(cpf.number)}
        </label>
        <button className="destroy" onClick={onDeleteCpf} />
      </div>
      {input}
    </li>
  );
}


export default AppView;
