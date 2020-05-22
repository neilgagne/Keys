/**
 * A single note
 */
class Note {
  constructor(octave, label, frequency, color) {
    this.octave = octave;
    this.frequency = frequency;
    this.label = label;
    this.color = color;
  }
}

/**
 * A collection of of notes
 */
class NoteCollection {
  Notes = [
    new Note(0, "A", 27.5, "primary"),
    new Note(0, "A#", 29.135235094880619, "secondary"),
    new Note(0, "B", 30.867706328507756, "primary"),
    new Note(1, "C", 32.703195662574829, "primary"),
    new Note(1, "C#", 34.647828872109012, "secondary"),
    new Note(1, "D", 36.708095989675945, "primary"),
    new Note(1, "D#", 38.890872965260113, "secondary"),
    new Note(1, "E", 41.203444614108741, "primary"),
    new Note(1, "F", 43.653528929125485, "primary"),
    new Note(1, "F#", 46.249302838954299, "secondary"),
    new Note(1, "G", 48.999429497718661, "primary"),
    new Note(1, "G#", 51.913087197493142, "secondary"),
    new Note(1, "A", 55.0, "primary"),
    new Note(1, "A#", 58.270470189761239, "secondary"),
    new Note(1, "B", 61.735412657015513, "primary"),
    new Note(2, "C", 65.406391325149658, "primary"),
    new Note(2, "C#", 69.295657744218024, "secondary"),
    new Note(2, "D", 73.41619197935189, "primary"),
    new Note(2, "D#", 77.781745930520227, "secondary"),
    new Note(2, "E", 82.406889228217482, "primary"),
    new Note(2, "F", 87.307057858250971, "primary"),
    new Note(2, "F#", 92.498605677908599, "secondary"),
    new Note(2, "G", 97.998858995437323, "primary"),
    new Note(2, "G#", 103.826174394986284, "secondary"),
    new Note(2, "A", 110.0, "primary"),
    new Note(2, "A#", 116.540940379522479, "secondary"),
    new Note(2, "B", 123.470825314031027, "primary"),
    new Note(3, "C", 130.812782650299317, "primary"),
    new Note(3, "C#", 138.591315488436048, "secondary"),
    new Note(3, "D", 146.83238395870378, "primary"),
    new Note(3, "D#", 155.563491861040455, "secondary"),
    new Note(3, "E", 164.813778456434964, "primary"),
    new Note(3, "F", 174.614115716501942, "primary"),
    new Note(3, "F#", 184.997211355817199, "secondary"),
    new Note(3, "G", 195.997717990874647, "primary"),
    new Note(3, "G#", 207.652348789972569, "secondary"),
    new Note(3, "A", 220.0, "primary"),
    new Note(3, "A#", 233.081880759044958, "secondary"),
    new Note(3, "B", 246.941650628062055, "primary"),
    new Note(4, "C", 261.625565300598634, "primary"),
    new Note(4, "C#", 277.182630976872096, "secondary"),
    new Note(4, "D", 293.66476791740756, "primary"),
    new Note(4, "D#", 311.12698372208091, "secondary"),
    new Note(4, "E", 329.627556912869929, "primary"),
    new Note(4, "F", 349.228231433003884, "primary"),
    new Note(4, "F#", 369.994422711634398, "secondary"),
    new Note(4, "G", 391.995435981749294, "primary"),
    new Note(4, "G#", 415.304697579945138, "secondary"),
    new Note(4, "A", 440.0, "primary"),
    new Note(4, "A#", 466.163761518089916, "secondary"),
    new Note(4, "B", 493.883301256124111, "primary"),
    new Note(5, "C", 523.251130601197269, "primary"),
    new Note(5, "C#", 554.365261953744192, "secondary"),
    new Note(5, "D", 587.32953583481512, "primary"),
    new Note(5, "D#", 622.253967444161821, "secondary"),
    new Note(5, "E", 659.255113825739859, "primary"),
    new Note(5, "F", 698.456462866007768, "primary"),
    new Note(5, "F#", 739.988845423268797, "secondary"),
    new Note(5, "G", 783.990871963498588, "primary"),
    new Note(5, "G#", 830.609395159890277, "secondary"),
    new Note(5, "A", 880.0, "primary"),
    new Note(5, "A#", 932.327523036179832, "secondary"),
    new Note(5, "B", 987.766602512248223, "primary"),
    new Note(6, "C", 1046.502261202394538, "primary"),
    new Note(6, "C#", 1108.730523907488384, "secondary"),
    new Note(6, "D", 1174.659071669630241, "primary"),
    new Note(6, "D#", 1244.507934888323642, "secondary"),
    new Note(6, "E", 1318.510227651479718, "primary"),
    new Note(6, "F", 1396.912925732015537, "primary"),
    new Note(6, "F#", 1479.977690846537595, "secondary"),
    new Note(6, "G", 1567.981743926997176, "primary"),
    new Note(6, "G#", 1661.218790319780554, "secondary"),
    new Note(6, "A", 1760.0, "primary"),
    new Note(6, "A#", 1864.655046072359665, "secondary"),
    new Note(6, "B", 1975.533205024496447, "primary"),
    new Note(7, "C", 2093.004522404789077, "primary"),
    new Note(7, "C#", 2217.461047814976769, "secondary"),
    new Note(7, "D", 2349.318143339260482, "primary"),
    new Note(7, "D#", 2489.015869776647285, "secondary"),
    new Note(7, "E", 2637.020455302959437, "primary"),
    new Note(7, "F", 2793.825851464031075, "primary"),
    new Note(7, "F#", 2959.955381693075191, "secondary"),
    new Note(7, "G", 3135.963487853994352, "primary"),
    new Note(7, "G#", 3322.437580639561108, "secondary"),
    new Note(7, "A", 3520.0, "primary"),
    new Note(7, "A#", 3729.310092144719331, "secondary"),
    new Note(7, "B", 3951.066410048992894, "primary"),
    new Note(8, "C", 4186.009044809578154, "primary"),
  ];
}

export { Note, NoteCollection };
