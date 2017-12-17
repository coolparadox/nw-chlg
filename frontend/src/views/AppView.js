'use strict';

import React from 'react';

import classnames from 'classnames';

function AppView(props) {
  return (
    <div>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
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
  const areAllComplete = props.cpfs.every(cpf => cpf.complete);

  return (
    <section id="main">
      <input
        checked={areAllComplete ? 'checked' : ''}
        id="blacklist-all"
        type="checkbox"
        onChange={props.onBlacklistAllCpfs}
      />
      <label htmlFor="blacklist-all">
        Mark all as complete
      </label>
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

function Footer(props) {
  if (props.cpfs.size === 0) {
    return null;
  }

  const remaining = props.cpfs.filter(cpf => !cpf.complete).size;
  const completed = props.cpfs.size - remaining;
  const phrase = remaining === 1 ? ' item left' : ' items left';

  let clearCompletedButton = null;
  if (completed > 0) {
    clearCompletedButton =
      <button
        id="clear-completed"
        onClick={props.onDeleteCompletedCpfs}>
        Clear completed ({completed})
      </button>
  }

  return (
    <footer id="footer">
      <span id="cpf-count">
        <strong>
          {remaining}
        </strong>
        {phrase}
      </span>
      {clearCompletedButton}
    </footer>
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
        onStopEditingCpf();
      }
    };
    input =
      <input
        autoFocus={true}
        className="edit"
        value={cpf.text}
        onBlur={onStopEditingCpf}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />;
  }

  return (
    <li
      className={classnames({
        completed: cpf.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          className="blacklist"
          type="checkbox"
          checked={cpf.complete}
          onChange={onBlacklistCpf}
        />
        <label onDoubleClick={onStartEditingCpf}>
          {cpf.text}
        </label>
        <button className="destroy" onClick={onDeleteCpf} />
      </div>
      {input}
    </li>
  );
}


export default AppView;
