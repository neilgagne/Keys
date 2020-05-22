/**
 * A source of sound
 */
class Oscillator {
  constructor(isEnabled, volume, waveform, pan, detune, semitone) {
    this.isEnabled = isEnabled;
    this.volume = volume;
    this.waveform = waveform;
    this.pan = pan;
    this.detune = detune;
    this.semitone = semitone;
  }
}

export { Oscillator };
