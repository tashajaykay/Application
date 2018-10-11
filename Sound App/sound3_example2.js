//audio context 
var audioContext;

//a sound oscillator. 
var oscillator = null;

//function to initialise the audio context
function init() {
	try {
		//check if the default maning is enabled , if not use the Webkit naming.
		if (!window.AudioContext) {
			window.AudioContext = window.webkitAudioContext;
		}
		
		audioContext = new AudioContext();
	}
	catch(e) {
		alert("Web Audio is not supported in this browse ");
	}
}
//-----------------------------------------------------------------------------------------------

//Play sound 
function playSound() {
	// Create the oscillator.
	oscillator = audioContext.createOscillator();
	
	/* connect the oscillator to the context's destination
	(the speakers) .*/
	oscillator.connect(audioContext.destination);
	
	//set the oscillator properties 
	oscillator.frequency.value = 440;
	oscillator.detune.value = 0;
	oscillator.type = "sawtooth";
	
	//play the sine wave now
	oscillator.start(0);
}

//Stop the sound
function stopSound() {
	if (oscillator) {
		oscillator.stop(0);
	}
}
//-----------------------------------------------------------------------------------------------