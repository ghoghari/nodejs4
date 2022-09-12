var say = require("say");
var filename = "myaudio.wav"

say.export("I'm sorry, Dave.", 'Cellos', 0.75, filename, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log(`Text has been saved to ${filename}`);
});