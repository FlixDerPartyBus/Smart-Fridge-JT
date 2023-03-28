var Gpio = require("onoff").Gpio;

var pin = new Gpio(19, 'out'); //use GPIO pin 19, and specify that it is output

module.exports = {
  openRelais: function () {
    pin.writeSync(1); //set pin state to 1 (open)
    setTimeout(() => {
        pin.writeSync(0); //set pin state to 0 (open)
    }, 7000);
  }
};