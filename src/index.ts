import EvdevReader, { Evdev } from "evdev";

console.log("Hello World!");

const reader = new EvdevReader();

function DoStuff() {
  if (!process.argv[2]) {
    console.log("No target provided.");
    return; // TODO: ban jan :3
  }

  const target_match = process.argv[2];
  console.log(target_match);

  reader.on("EV_KEY", function (data) {
    console.log("key : ", data.code, data.value);
  });

  reader.on("error", function (e) {
    console.log("reader error : ", e);
  });

  let device = reader.open(target_match);
}

DoStuff();