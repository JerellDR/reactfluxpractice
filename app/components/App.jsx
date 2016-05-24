import Alt from 'alt';
import AltContainer from 'alt-container';
import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
          >

          <Notes
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
  addNote() {
    NoteActions.create({task: 'New task'});
  }
  deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  };
  editNote = (id, task) => {
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }
}
