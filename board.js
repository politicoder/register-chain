const five = require("johnny-five");
var board = new five.Board();

board.on("ready", () => {

    /* Initialize the couple registers as one */
    let register = new five.ShiftRegister({
        pins: {
            data: 3,
            clock: 11,
            latch: 12
        }
    });

    /* Light the first LED in each register's output */
    register.send([0b00000001, 0b00000001]);

});
