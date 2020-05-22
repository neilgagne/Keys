import React, { Component } from "react";

// Material UI
import { Select, MenuItem, Typography } from "@material-ui/core";

/**
 * A select box used to set the waveform for the oscillator
 */
class InputSelect extends Component {
  updateValue = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <Typography id={this.props.labelId} variant="overline" display="block">
          {this.props.labelText}
        </Typography>
        <Select
          id={this.props.inputId}
          name={this.props.name}
          labelid={this.props.labelId}
          value={this.props.value}
          onChange={this.updateValue}
          disabled={this.props.isDisabled}
          fullWidth={true}
          margin="dense"
        >
          {this.props.waveforms.map((waveform) => {
            return (
              <MenuItem key={waveform.value} value={waveform.value}>
                {waveform.label}
              </MenuItem>
            );
          })}
        </Select>
      </React.Fragment>
    );
  }
}

export default InputSelect;
