// An activator is a source of input
// which gets read from in real time to trigger things

// It has two modes
// - Transparent: snoops keys, but can't interrupt them.
// - Opaque: blocks all input, taking a whole device for itself.

// Only opaque activators will have a pass through option to repeat
// non-interrupted events to the output device(not written yet).

// While this maximizes AHK like functionality,
// it will introduce latency to scan every input event.

// For now we're limited to transparent 

import EvdevReader, { Evdev } from "evdev";

class Activator {
    reader: EvdevReader;

    constructor() {
        this.reader = new EvdevReader();

    }
}