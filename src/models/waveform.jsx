/**
 * A single waveform
 */
class Waveform {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}

/**
 * A collection of waveforms
 */
class WaveformCollection {
  Waveforms = [
    new Waveform("sine", "Sine"),
    new Waveform("square", "Square"),
    new Waveform("triangle", "Triangle"),
    new Waveform("sawtooth", "Saw"),
  ];
}

export { Waveform, WaveformCollection };
