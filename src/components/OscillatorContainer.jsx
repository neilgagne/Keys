import React, { Component } from "react";

// Material UI
import { Grid, Typography, Paper, Box } from "@material-ui/core";

// Components
import OnOffSwitch from "./OnOffSwitch";
import InputStepper from "./Stepper";
import VolumeSlider from "./VolumeSlider";
import PanSlider from "./PanSlider";
import WaveformSelect from "./WaveformSelect";

// Models
import { WaveformCollection } from "../models/waveform";

/**
 * A single oscillator containing controls to modify its output
 */
class OscillatorContainer extends Component {
  setIsEnabled = (isEnabled) => {
    this.props.enabledOnChange(this.props.oscillatorIndex, isEnabled);
  };
  setVolume = (volume) => {
    this.props.volumeOnChange(this.props.oscillatorIndex, volume);
  };
  setPan = (pan) => {
    this.props.panOnChange(this.props.oscillatorIndex, pan);
  };
  setWaveform = (waveform) => {
    this.props.waveformOnChange(this.props.oscillatorIndex, waveform);
  };
  setSemitone = (semitone) => {
    this.props.semitoneOnChange(this.props.oscillatorIndex, semitone);
  };
  setDetune = (detune) => {
    this.props.detuneOnChange(this.props.oscillatorIndex, detune);
  };

  render() {
    return (
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container spacing={1}>
            {/* Header */}
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                id={"oscillator-" + this.props.oscillatorNumber + "-header"}
                variant="h5"
                component="h2"
                display="block"
              >
                {"Oscillator " + this.props.oscillatorNumber}
              </Typography>
            </Grid>
            {/* On/Off */}
            <Grid item xs={12} sm={12} md={6}>
              <OnOffSwitch
                id={"oscillator-" + this.props.oscillatorNumber + "-enabled"}
                name={"Oscillator " + this.props.oscillatorNumber + " Enabled"}
                oscillatorIndex={this.props.oscillatorIndex}
                labelId={
                  "oscillator-" + this.props.oscillatorNumber + "-enabled-label"
                }
                labelText={"Oscillator " + this.props.oscillatorNumber}
                checked={this.props.isEnabled}
                onChange={this.setIsEnabled}
                leftLabel={"Off"}
                rightLabel={"On"}
                color={"primary"}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            {/* Volume slider */}
            <Grid item xs={12} sm={6}>
              <VolumeSlider
                id={"oscillator-" + this.props.oscillatorNumber + "-volume"}
                name={"Oscillator " + this.props.oscillatorNumber + " Volume"}
                oscillatorIndex={this.props.oscillatorIndex}
                isDisabled={!this.props.isEnabled}
                labelId={
                  "oscillator-" + this.props.oscillatorNumber + "-volume-label"
                }
                labelText="Volume"
                defaultValue={0.5}
                value={this.props.volumeValue}
                step={0.01}
                min={0}
                max={1}
                marks={[]}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                onChange={this.setVolume}
              />
            </Grid>
            {/* Pan slider */}
            <Grid item xs={12} sm={6}>
              <PanSlider
                id={"oscillator-" + this.props.oscillatorNumber + "-pan"}
                name={"Oscillator " + this.props.oscillatorNumber + " Pan"}
                oscillatorIndex={this.props.oscillatorIndex}
                isDisabled={!this.props.isEnabled}
                labelId={
                  "oscillator-" + this.props.oscillatorNumber + "-pan-label"
                }
                labelText="Pan"
                defaultValue={0}
                value={this.props.panValue}
                step={0.01}
                min={-1}
                max={1}
                marks={[
                  {
                    value: 0,
                    label: "Center",
                  },
                ]}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                onChange={this.setPan}
                valueText={this.getPanText}
              />
            </Grid>
            {/* Waveform Select */}
            <Grid item xs={12}>
              <WaveformSelect
                id={"oscillator-" + this.props.oscillatorNumber + "-waveform"}
                name={"Oscillator " + this.props.oscillatorNumber + " Waveform"}
                oscillatorIndex={this.props.oscillatorIndex}
                isDisabled={!this.props.isEnabled}
                labelId={
                  "oscillator-" +
                  this.props.oscillatorNumber +
                  "-waveform-label"
                }
                labelText={"Waveform"}
                waveforms={new WaveformCollection().Waveforms}
                value={this.props.waveformValue}
                onChange={this.setWaveform}
              />
            </Grid>
            <Grid item xs={6}>
              <InputStepper
                isDisabled={!this.props.isEnabled}
                labelId={
                  "oscillator-" +
                  this.props.oscillatorNumber +
                  "-semitone-label"
                }
                labelText="Semitone"
                id={"oscillator-" + this.props.oscillatorNumber + "-semitone"}
                name={"Oscillator-" + this.props.oscillatorNumber + " Semitone"}
                defaultValue={0}
                value={this.props.semitoneValue}
                step={1}
                min={-12}
                max={12}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                onChange={this.setSemitone}
              />
            </Grid>
            <Grid item xs={6}>
              <InputStepper
                isDisabled={!this.props.isEnabled}
                labelId={
                  "oscillator-" + this.props.oscillatorNumber + "-detune-label"
                }
                labelText="Detune"
                id={"oscillator-" + this.props.oscillatorNumber + "-detune"}
                name={"Oscillator-" + this.props.oscillatorNumber + " Detune"}
                defaultValue={0}
                value={this.props.detuneValue}
                step={0.01}
                min={-100}
                max={100}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                onChange={this.setDetune}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
}

export default OscillatorContainer;
