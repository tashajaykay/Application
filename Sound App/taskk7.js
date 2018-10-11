// myJavaScriptFile.js
// Sound Example - Simple Visualiser - A graph of the waveform / Time Domain. 

// *******************************
// Sound Visualisation variables.
// *******************************

// Set the width and height of the canvas.
var WIDTH = 640;
var HEIGHT = 360;

// Smoothing - A value from 0 -> 1 where 0 represents no time averaging with the last analysis frame. The default value is 0.8.
var SMOOTHING = 0.8;

// FFT Size - The size of the FFT used for frequency-domain analysis. Must be a power of 2.
var FFT_SIZE = 2048;

// Analyser variables.
// *******************************

/* The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that 
the browser call a specified function to update an animation before the next repaint. The method takes as an argument 
a callback to be invoked before the repaint.
Here we use this method, or a fallback. */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
  				window.RequestAnimationFrame || 
  				window.mozRequestAnimationFrame    || 
  				window.oRequestAnimationFrame      || 
  				window.msRequestAnimationFrame     || 
  				function( callback ){
  					window.setTimeout(callback, 1000 / 60);
				};
})();

// The analyser node.
var analyser;

// Audio variables.
// *******************************

// Audio Context.
var audioContext;

// A sound.
var aSoundBuffer = null;

// A sound source.
var aSoundSource = null;

// Add an event to the the window. The load event will call the init function.
window.addEventListener('load', init, false);

// Function to initalise the audio context.
function init1() {
	try {
		// Check if the default naming is enabled, if not use the WebKit naming.
	    if (!window.AudioContext) {
	        window.AudioContext = window.webkitAudioContext;
	    }

		audioContext = new AudioContext();

		// Initalise the analyser.
		initAnalyser();
	}
	catch(e) {
		alert("Web Audio API is not supported in this browser");
  	}
}

// Add events to document elements.
function addEvents1() {
	// Add an event listener to the file input.
	document.getElementById("files").addEventListener('change', loadaSound, false);
}

// Load a file when a file is selected.
function loadaSound1(evt) {
	// Get the FileList object.
	var files = evt.target.files;

	// Get the first file in the list. 
	// This example only works with
	// the first file returned.
	var fileSelected = files[0];

    // Create a file reader.
	var reader = new FileReader();

	reader.onload = function(e) {
    	initSound(this.result);
  	};
  
	// Read in the image file as a data URL.
  	reader.readAsArrayBuffer(fileSelected);

}

// Initalise the sound.
function initSound1(arrayBuffer) {
	audioContext.decodeAudioData(arrayBuffer, 
			function(buffer) {
				// audioBuffer is global to reuse the decoded audio later.
				aSoundBuffer = buffer;
			}, 
			function(e) {
				console.log('Error decoding file', e);
			}
		); 
}

// Play the sound.
function playSound1(buffer) {
	aSoundSource = audioContext.createBufferSource(); // creates a sound source.
	aSoundSource.buffer = buffer; // tell the source which sound to play.

	aSoundSource.connect(analyser); // Connect the source to the analyser.
	analyser.connect(audioContext.destination); // Connect the analyser to the context's destination (the speakers).

	aSoundSource.start(0); // play the source now.

    // Start visualizer.
    requestAnimFrame(drawVisualisation);
}

// Stop the sound.
// Simple stop. Will only stop the last 
// sound if you press play more than once.
function stopSound1() {
	if (aSoundSource) {
		aSoundSource.stop(0);
	}
}

// *******************************
// Visualisation Functions.
// *******************************

// Function to initalise the analyser.
function initAnalyser1() {
	//create a AnalyserNode
	analyser = audioContext.createAnalyser();
	
	/* avalue from 0-> 1 where 0 represents no time averaging with the last analysis frame
	the default value is 0.8 */
	analyser.smoothingTimeConstant = SMOOTHING; 
	// The size of the FFT used for frequency domain analysis.Must be a poser of 2.
	analyser.fftSize = FFT_SIZE;

}

// Draw the visualisation.
function drawVisualisation1() {
	//first, get canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	//programmatically set the canvas width and height 
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	//FILL THE CANVAS EITH A DEFAULT COLOR
	context.fillStyle = "rgb(255,255,255)";
	//the fillRect() method draws a "filled" rectangle.
	context.fillRect (0, 0, WIDTH, HEIGHT);
	
	//draw frequency domain
	drawFrequencyDomainVisualisation(context);
	
	// Draw the time domain
	drawTimeDomainVisualisation(context);
	
	//request the next frame
	requestAnimFrame(drawVisualisation);


}

// Draw the time domain visualisation.
function drawTimeDomainVisualisation1(context) {
	var timeDomain = new Uint8Array(analyser.frequencyBinCount);
	
	analyser.getByteTimeDomainData(timeDomain);
	
	//loop through each bucket/bin in the timeDomain array
	for (var i = 0; i < analyser.frequencyBinCount; i++) {
		//get the amptitude of the audio for this bucket
		var value = timeDomain[i];
		/*determine the % for this value, convert the amptitude value(0- 255) into a % */
		var percent = value / 256;
		
		var height = HEIGHT  * percent;
		var offset = HEIGHT - height - 1;
		var barWidth = WIDTH/analyser.frequencyBinCount;
		
		//set the fill colour
		context.fillRect(i * barWidth, offset, 1, 1);
	}


}

// Draw the frequency domain visualisation.
function drawFrequencyDomainVisualisation1(context) {
	var freqDomain = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqDomain);
	
	//loop through each bucket/bin in the timeDomain array
	for (var i = 0; i < analyser.frequencyBinCount; i++) {
		
		var value = freqDomain[i];
		
		var percent = value / 256;
		
		var height = HEIGHT  * percent;
		var offset = HEIGHT - height - 1;
		var barWidth = WIDTH/analyser.frequencyBinCount;
		
		var hue = i/analyser.frequencyBinCount * 360;
		context.fillStyle = "hsl(" + hue + ", 100%, 50%)";
		
		context.fillRect(i * barWidth, offset, barWidth, height);
	}
	 

}
