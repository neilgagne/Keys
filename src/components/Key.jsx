import React, { Component } from "react";

// Material UI
import { Box, Button } from "@material-ui/core";

/**
 * A single key for a keyboard
 */
class Key extends Component {
  notePressed = () => {
    this.props.onMouseDown(this.props.note);
  };

  noteReleased = () => {
    this.props.onMouseUp(this.props.note);
  };

  render() {
    return (
      <Box
        pt={this.props.paddingTop}
        pb={this.props.paddingBottom}
        pl={this.props.paddingLeft}
        pr={this.props.paddingRight}
      >
        <Button
          disableElevation
          variant="contained"
          color={this.props.note.color}
          frequency={this.props.note.frequency}
          onMouseDown={this.notePressed}
          onMouseUp={this.noteReleased}
          onMouseLeave={this.noteReleased}
        >
          {this.props.note.label}
        </Button>
      </Box>
    );
  }
}

export default Key;
