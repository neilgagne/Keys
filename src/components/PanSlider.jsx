import React, { Component } from "react";

// Material UI
import { Typography, Slider } from "@material-ui/core";

/**
 * A slider used to adjust stereo pan of an oscillator
 */
class PanSlider extends Component {
  setValue = (event, value) => {
    this.props.onChange(value);
  };

  getValueText = (value) => {
    try {
      if (value !== -1 && value !== 0 && value !== 1) {
        return value > 0
          ? Math.round(value * 100) + " R"
          : Math.round(value * -100) + " L";
      }
      return value === -1 ? "L" : value === 1 ? "R" : "C";
    } catch (ex) {
      console.log("[PanSlider] getValueText() - Exception thrown: " + ex);
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
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          marks={this.props.marks}
          onChange={this.setValue}
          disabled={this.props.isDisabled}
          getAriaValueText={this.getValueText}
          aria-labelledby={this.props.ariaLabelledBy}
          valueLabelFormat={this.getValueText}
          valueLabelDisplay={this.props.valueLabelDisplay}
        />
      </React.Fragment>
    );
  }
}

export default PanSlider;
