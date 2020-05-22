import React, { Component } from "react";

// Material UI
import { Switch, Grid, FormGroup, Typography } from "@material-ui/core";

/**
 * A switch used to turn an oscillator on or off
 */
class OnOffSwitch extends Component {
  updateValue = (event, value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <FormGroup row>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{this.props.leftLabel}</Grid>
            <Grid item>
              <Switch
                id={this.props.inputId}
                name={this.props.name}
                labelid={this.props.labelId}
                defaultValue={true}
                value={this.props.isEnabled}
                defaultChecked={true}
                checked={this.props.isEnabled}
                onChange={this.updateValue}
                color={this.props.color}
                inputProps={this.props.inputProps}
              />
            </Grid>
            <Grid item>{this.props.rightLabel}</Grid>
          </Grid>
        </Typography>
      </FormGroup>
    );
  }
}

export default OnOffSwitch;
