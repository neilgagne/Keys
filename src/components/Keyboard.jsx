import React, { Component } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";

// Components
import Key from "./Key";

// Models
import { NoteCollection } from ".././models/note";

/**
 * A keyboard containing many Keys
 */
class Keyboard extends Component {
  notePressed = (note) => {
    this.props.onMouseDown(note);
  };

  noteReleased = (note) => {
    this.props.onMouseUp(note);
  };

  noteCollection = new NoteCollection();

  render() {
    return (
      <Paper elevation={3} style={{ display: "flex", overflow: "auto" }}>
        {this.noteCollection.Notes.map((note, index) => {
          return (
            <Key
              note={note}
              key={note.octave + "-" + note.label}
              onMouseDown={this.notePressed}
              onMouseUp={this.noteReleased}
              paddingTop={2}
              paddingBottom={2}
              paddingLeft={index === 0 ? 2 : 1}
              paddingRight={
                index === this.noteCollection.Notes.length - 1 ? 2 : 1
              }
            ></Key>
          );
        })}
      </Paper>
    );
  }
}

export default Keyboard;
