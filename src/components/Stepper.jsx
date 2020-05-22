import React, { Component } from "react";

// Material UI
import { Input, Typography } from "@material-ui/core";

/**
 * A numeric input with a value and up and down arrows
 */
class Stepper extends Component {
  updateValue = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <Typography id={this.props.labelId} variant="overline" display="block">
          {this.props.labelText}
        </Typography>
        <Input
          id={this.props.inputId}
          name={this.props.name}
          value={this.props.value}
          onChange={this.updateValue}
          disabled={this.props.isDisabled}
          fullWidth={true}
          margin="dense"
          inputProps={{
            step: this.props.step,
            min: this.props.min,
            max: this.props.max,
            type: "number",
          }}
        />
      </React.Fragment>
    );
  }
}

export default Stepper;
