import React, { Component } from "react";

// Material UI
import { Typography, Slider } from "@material-ui/core";

/**
 * A slider used to adjust the volume of an oscillator
 */
class VolumeSlider extends Component {
  setValue = (event, value) => {
    this.props.onChange(value);
  };

  getValueText = (value) => {
    try {
      return Math.round(value * 100) + "%";
    } catch (ex) {
      console.log("[VolumeSlider] getValueText() - Exception thrown: " + ex);
      return value;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Typography id={this.props.labelId} variant="overline" display="block">
          {this.props.labelText}
        </Typography>
        <Slider
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          disabled={this.props.isDisabled}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          onChange={this.setValue}
          valueLabelFormat={this.getValueText}
          valueLabelDisplay={this.props.valueLabelDisplay}
        />
      </React.Fragment>
    );
  }
}

export default VolumeSlider;
