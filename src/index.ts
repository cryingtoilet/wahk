import EvdevReader, { Evdev } from "evdev";

require('../build/Release/addon.node'); 

const reader = new EvdevReader();

const pressedKeys: Set<string> = new Set();

function DoStuff() {
  if (!process.argv[2]) {
    console.log("No target provided.");
    return; // TODO: ban jan :3
  }

  const target_match = process.argv[2];
  console.log(target_match);

  reader.on("EV_KEY", function (data) {
    //console.log("key : ", data.code, data.value);
    
    if (data.value === 1) {
      pressedKeys.add(data.code);
    } else if (data.value === 0) {
      pressedKeys.delete(data.code);
    }

    //console.log(pressedKeys);
    
    checkKeybind();
  });

  reader.on("error", function (e) {
    console.log("reader error : ", e);
  });

  let device = reader.open(target_match);
}

function makeKeyBind(keys: string[], action: () => void) {
  return { keys, action };
}

function checkKeybind() {
  const keybinds = [
    makeKeyBind(["KEY_A", "KEY_B"], () => {
      console.log("A and B pressed");
    }),
  ];

  for (const keybind of keybinds) {
    if (keybind.keys.every(key => pressedKeys.has(key))) {
      keybind.action();
    }
  }
}

DoStuff();