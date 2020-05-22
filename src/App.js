import React, { Component } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinkedIn from "@material-ui/icons/LinkedIn";
import GitHub from "@material-ui/icons/GitHub";

// Components
import Keyboard from "./components/Keyboard";
import OscillatorContainer from "./components/OscillatorContainer";
import VolumeSlider from "./components/VolumeSlider";

// Models
import { NoteCollection } from "./models/note";
import { WaveformCollection } from "./models/waveform";

/**
 * Synth app containing two oscillators, a master volume control, and a keyboard
 */
class App extends Component {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  oscList = [
    {
      activeNotes: {},
    },
    {
      activeNotes: {},
    },
  ];
  notes = new NoteCollection().Notes;
  waveforms = new WaveformCollection().Waveforms;
  // TODO: Refactor to array of oscillator objects, to allow for n oscillators
  state = {
    masterVolume: 0.5,
    osc1_isEnabled: true,
    osc1_volume: 0.5,
    osc1_waveform: this.waveforms[0].value,
    osc1_pan: 0,
    osc1_detune: 0,
    osc1_semitone: 0,
    osc2_isEnabled: true,
    osc2_volume: 0.5,
    osc2_waveform: this.waveforms[0].value,
    osc2_pan: 0,
    osc2_detune: 0,
    osc2_semitone: 0,
  };

  /**
   * Used to set the master volume
   */
  setMasterVolume = (masterVolume) => {
    this.setState({ masterVolume });
  };

  /**
   * Used to turn the specified oscillator on or off
   */
  setOscillatorIsEnabled = (index, isEnabled) => {
    if (index === 0) {
      this.setState({ osc1_isEnabled: isEnabled });
    } else if (index === 1) {
      this.setState({ osc2_isEnabled: isEnabled });
    }
  };

  /**
   * Used to set the volume of the oscillator specified
   */
  setOscillatorVolume = (index, volume) => {
    if (index === 0) {
      this.setState({ osc1_volume: volume });
    } else if (index === 1) {
      this.setState({ osc2_volume: volume });
    }
  };

  /**
   * Used to set the pan of the oscillator specified
   */
  setOscillatorStereoPanner = (index, pan) => {
    if (index === 0) {
      this.setState({ osc1_pan: pan });
    } else if (index === 1) {
      this.setState({ osc2_pan: pan });
    }
  };

  /**
   * Used to set the waveform of the oscillator specified
   */
  setOscillatorWaveform = (index, waveform) => {
    if (index === 0) {
      this.setState({ osc1_waveform: waveform });
    } else if (index === 1) {
      this.setState({ osc2_waveform: waveform });
    }
  };

  /**
   * Used to set the semitone of the oscillator specified
   */
  setOscillatorSemitone = (index, semitone) => {
    if (index === 0) {
      this.setState({ osc1_semitone: semitone });
    } else if (index === 1) {
      this.setState({ osc2_semitone: semitone });
    }
  };

  /**
   * Used to set the detune of the oscillator specified
   */
  setOscillatorDetune = (index, detune) => {
    if (index === 0) {
      this.setState({ osc1_detune: detune });
    } else if (index === 1) {
      this.setState({ osc2_detune: detune });
    }
  };

  /**
   * Used to return a gain node connected to the audio context
   */
  getGainNode = (audioContext, gain) => {
    let gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(gain, this.audioContext.currentTime);
    gainNode.connect(audioContext.destination);
    return gainNode;
  };

  /**
   * Used to return a pan node connected to the audio context
   */
  getPanNode = (audioContext, pan) => {
    let panNode = audioContext.createStereoPanner();
    panNode.pan.setValueAtTime(pan, this.audioContext.currentTime);
    panNode.connect(audioContext.destination);
    return panNode;
  };

  /**
   * Used to trigger a note to begin playing and record it to be stopped later on
   */
  notePressed = (note) => {
    let self = this;
    this.oscList.forEach(function (oscillator, index) {
      // Check to see if oscillator is enabled
      if (index === 0 ? self.state.osc1_isEnabled : self.state.osc2_isEnabled) {
        let volume =
          index === 0
            ? self.state.osc1_volume * self.state.masterVolume
            : self.state.osc2_volume * self.state.masterVolume;
        let pan = index === 0 ? self.state.osc1_pan : self.state.osc2_pan;
        let waveform =
          index === 0 ? self.state.osc1_waveform : self.state.osc2_waveform;
        let detune =
          index === 0 ? self.state.osc1_detune : self.state.osc2_detune;
        let semitone =
          index === 0 ? self.state.osc1_semitone : self.state.osc2_semitone;
        console.log("semitone: " + semitone);

        // Frequency of note pressed
        let notePressedFrequency = note.frequency;
        // Frequency of tone (may differ from note pressed after applying semitone)
        let outputFrequency = note.frequency;

        if (
          semitone !== null &&
          typeof semitone !== "undefined" &&
          semitone !== 0
        ) {
          let noteIndex = self.notes.findIndex(
            (singleNote) => singleNote.frequency === note.frequency
          );
          if (
            noteIndex !== null &&
            typeof noteIndex !== "undefined" &&
            noteIndex > 0
          ) {
            outputFrequency =
              self.notes[Number(noteIndex) + Number(semitone)].frequency;
          }
        }

        // Begin playing tone
        oscillator.activeNotes[notePressedFrequency] = self.playTone(
          outputFrequency,
          volume,
          pan,
          waveform,
          detune
        );
      }
    });
  };

  /**
   * Used to begin playing a tone
   */
  playTone = (frequency, volume, pan, waveform, detune) => {
    let osc = this.audioContext.createOscillator();
    osc.connect(this.getGainNode(this.audioContext, volume));
    osc.connect(this.getPanNode(this.audioContext, pan));
    osc.type = waveform;
    osc.detune.value = detune;
    osc.frequency.value = frequency;
    osc.start();
    return osc;
  };

  /**
   * Used to stop an active note
   */
  noteReleased = (note) => {
    // Stop and remove note specified from the list of active notes
    this.oscList.forEach((oscillator) => {
      if (typeof oscillator.activeNotes[note.frequency] !== "undefined") {
        oscillator.activeNotes[note.frequency].stop();
        delete oscillator.activeNotes[note.frequency];
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Grid
          style={{ minHeight: "100vh" }}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={10} md={8}>
            <Box m={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <OscillatorContainer
                    oscillatorIndex={0}
                    oscillatorNumber={1}
                    isEnabled={this.state.osc1_isEnabled}
                    enabledOnChange={this.setOscillatorIsEnabled}
                    volumeValue={this.state.osc1_volume}
                    volumeOnChange={this.setOscillatorVolume}
                    panValue={this.state.osc1_pan}
                    panOnChange={this.setOscillatorStereoPanner}
                    waveformValue={this.state.osc1_waveform}
                    waveformOnChange={this.setOscillatorWaveform}
                    semitoneValue={this.state.osc1_semitone}
                    semitoneOnChange={this.setOscillatorSemitone}
                    detuneValue={this.state.osc1_detune}
                    detuneOnChange={this.setOscillatorDetune}
                  />
                </Grid>
                <Grid item xs={6}>
                  <OscillatorContainer
                    oscillatorIndex={1}
                    oscillatorNumber={2}
                    isEnabled={this.state.osc2_isEnabled}
                    enabledOnChange={this.setOscillatorIsEnabled}
                    volumeValue={this.state.osc2_volume}
                    volumeOnChange={this.setOscillatorVolume}
                    panValue={this.state.osc2_pan}
                    panOnChange={this.setOscillatorStereoPanner}
                    waveformValue={this.state.osc2_waveform}
                    waveformOnChange={this.setOscillatorWaveform}
                    semitoneValue={this.state.osc2_semitone}
                    semitoneOnChange={this.setOscillatorSemitone}
                    detuneValue={this.state.osc2_detune}
                    detuneOnChange={this.setOscillatorDetune}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <Box p={2}>
                      <VolumeSlider
                        id={"master-volume"}
                        name={"Master Volume"}
                        labelId="master-volume-label"
                        labelText="Volume"
                        valueLabelDisplay="auto"
                        isDisabled={false}
                        defaultValue={0.5}
                        min={0}
                        max={1}
                        step={0.01}
                        value={this.state.masterVolume}
                        onChange={this.setMasterVolume}
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Keyboard
                    onMouseDown={this.notePressed}
                    onMouseUp={this.noteReleased}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div m={2} style={{ textAlign: "center" }}>
                    <Typography variant="body2" display="block" gutterBottom>
                      Created by Neil Gagne using React, Material UI, and Web
                      Audio API.
                    </Typography>
                  </div>
                  <div m={2} style={{ textAlign: "center" }}>
                    <IconButton
                      href="#"
                      onClick={() => {
                        window.location.href =
                          "https://www.linkedin.com/in/neilgagne/";
                      }}
                    >
                      <LinkedIn />
                    </IconButton>
                    <IconButton
                      href="#"
                      onClick={() => {
                        window.location.href = "https://github.com/neilgagne";
                      }}
                    >
                      <GitHub />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
