# Chaining multiple shift registers with [Johnny-Five](http://johnny-five.io/)

Johnny Five's [shift register documentation](http://johnny-five.io/api/shiftregister/) does a great job explaining how to use a single shift register, but I had a hard time finding examples of how to chain multiple registers together without using additional pins.

The process boils down to:

* The **first register**, the one receiving input from the controller through its DS pin, should be connected from its Q7' pin to the next register's DS pin, and so on for subsequent registers
* All registers must share the same **clock** and **latch** pins on the controller (see diagram)
* Signals are sent as an array of inputs in one `register.send()` call, with each input representing a shift register

### Diagram

Here we have a breadboard with two shift registers, each controlling eight LEDs. Wires are color coded as so:

* Red = 5v
* Black = GND
* Yellow = Register 1 output
* Orange = Register 2 output
* Green = Data
* Blue = Latch
* White = Clock

![Diagram](http://politicoder.com/img/github/multiple-registers-diagram.png)

Notice the blue and white wires connecting the two registers to share the clock and latch connections.

Initialize this setup as one shift register:

```javascript
const five = require("johnny-five");
var board = new five.Board();

board.on("ready", () => {
    let register = new five.ShiftRegister({
        pins: {
            data: 3,
            clock: 11,
            latch: 12
        }
    });
});
```

And send signals to each register independently in an array:
```javascript
/* Light the first LED in each register's output */
register.send([0b00000001, 0b00000001]);
```

The signals in the array are the reverse of the order the registers are chained in; the last signal in the array corresponds to the output of the first register receiving data directly from the controller.

That's it! Sixteen (or more) independent outputs from only three pins.