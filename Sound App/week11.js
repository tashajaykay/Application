// myJavaScriptFile.js
// Sound Example - Simple Visualiser - A graph of the waveform / Time Domain. 

// *******************************
// Sound Visualisation variables.
// *******************************

//Set the width and height of the spectrogram canvas Visualisation.
var spectrogramCanvasWIDTH = 640;
var spectrogramCanvasHEIGHT = 360;

//The current x / draw pixel position of the spectrogram.
var spectrogramLeftPos = 0;

//A play / stopped flag. true = play. false = stopped.
var playing = false;

//Used for color distribution of the spectrogram.
//This example uses a library for the colour . Another example below uses HSL.
var myColor = new chroma.ColorScale({
	colors:['#000000', '#ff0000', '#ffff00', 'ffffff'],
	positions:[0, .25, .75, 1],
	mode:'rgb',
	limits:[0, 255]
});


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
function init() {
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
//------------------------------------------------------------------------------------------------------------------------



// Add events to document elements.
function addEvents() {
	// Add an event listener to the file input.
	document.getElementById("files").addEventListener('change', loadaSound, false);
}
//------------------------------------------------------------------------------------------------------------------------


// Load a file when a file is selected.
function loadaSound(evt) {
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
//------------------------------------------------------------------------------------------------------------------------


// Initalise the sound.
function initSound(arrayBuffer) {
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
//------------------------------------------------------------------------------------------------------------------------

// Play the sound.
function playSound(buffer) {
	aSoundSource = audioContext.createBufferSource(); // creates a sound source.
	aSoundSource.buffer = buffer; // tell the source which sound to play.

	aSoundSource.connect(analyser); // Connect the source to the analyser.
	analyser.connect(audioContext.destination); // Connect the analyser to the context's destination (the speakers).

	aSoundSource.start(0); // play the source now.

	//Set the playing flag
	playing = true;
	
	// Clear the spectrogram canvas.
	var canvas = document.getElementById("canvas2");
	var context = canvas.getContext("2d");
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect (0, 0, spectrogramCanvasWIDTH, spectrogramCanvasHEIGHT);
	
    // Start visualizer.
    requestAnimFrame(drawVisualisation);
}
//------------------------------------------------------------------------------------------------------------------------

// Stop the sound.
// Simple stop. Will only stop the last 
// sound if you press play more than once.
function stopSound() {
	if (aSoundSource) {
		aSoundSource.stop(0);
		
		// set the playing flag
		playing = false;
		
		// The spectrogram draw x position
		// back to the start.
		spectrogramLeftPos = 0;
	}
}
//------------------------------------------------------------------------------------------------------------------------

// *******************************
// Visualisation Functions.
// *******************************

// Function to initalise the analyser.
function initAnalyser() {
	//create a AnalyserNode
	analyser = audioContext.createAnalyser();
	
	/* avalue from 0-> 1 where 0 represents no time averaging with the last analysis frame
	the default value is 0.8 */
	analyser.smoothingTimeConstant = SMOOTHING; 
	// The size of the FFT used for frequency domain analysis.Must be a poser of 2.
	analyser.fftSize = FFT_SIZE;

}
//------------------------------------------------------------------------------------------------------------------------

// Draw the visualisation.
function drawVisualisation() {
	//first, get canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	//programmatically set the canvas width and height 
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	//FILL THE CANVAS WITH A DEFAULT COLOR
	context.fillStyle = "rgb(255,255,255)";
	//the fillRect() method draws a "filled" rectangle.
	context.fillRect (0, 0, WIDTH, HEIGHT);
	
	//draw frequency domain
	drawFrequencyDomainVisualisation(context);
	
	// Draw the time domain
	drawTimeDomainVisualisation(context);
	
	//Draw the spectrogram
	drawSpectrogramVisualisation();
	
	//request the next frame
	requestAnimFrame(drawVisualisation);
	
	//request the next frame if playing 
	if(playing){
		requestAnimFrame(drawVisualisation);
	}

}
//------------------------------------------------------------------------------------------------------------------------

// Draw the time domain visualisation.
function drawTimeDomainVisualisation(context) {
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
//------------------------------------------------------------------------------------------------------------------------


// Draw the frequency domain visualisation.
function drawFrequencyDomainVisualisation(context) {
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
//------------------------------------------------------------------------------------------------------------------------

//Draw the spectrogram
function drawSpectrogramVisualisation() {
	// First get the canvas 
	var canvas = document.getElementById("canvas2");
	var context = canvas.getContext("2d");
	
	// Store a temp copy of the canvas/
	// Create a temp canvas we use for copying
	var tempCanvas = document.createElement("canvas");
	tempCanvas.width = spectrogramCanvasWIDTH;
	tempCanvas.height = spectrogramCanvasHEIGHT;
	var tempCtx = tempCanvas.getContext("2d");
	
	//Copy the current canvas into the temp canvas .
	tempCtx.drawImage(canvas,0,0, spectrogramCanvasWIDTH, spectrogramCanvasHEIGHT);
	
	/*Typed Array - Uint*Array, can contain only Unsigned *-bit
	integers. Have values between 0 and 25.*/
	var freqDomain = new Uint8Array(analyser.frequencyBinCount);
	/*Copies the current time domain data for this sample/batch in to the passed unsigned byte array*/
	analyser.getByteFrequencyData(freqDomain);
	
	//Primitive frequency analysis - variables used for analysis.
	//Stores the highest value
	var highestValue = -1;
	//Stores the highestvalue index
	var highestValueIndex = -1;
	//Stores how many buckets this was seen
	var highestValueLength = 1;
	
	// Draw the spectrogram.
	if(spectrogramLeftPos == spectrogramCanvasWIDTH){
		// The canvas  is full... so draw on the right side and move the canvas left.
		for (var i = 0; i < analyser.frequencyBinCount; i++) {
			var value = freqDomain[i];
			
			//Primitive frequency analysis..
			if (value > highestValue){
				highestValue = value;
				highestValueIndex = i;
				highestValueLength = 1;
			} else {
				if (value == highestValue){
					if( (highestValueIndex + highestValueLength) == i){
						highestValueLength++;
					}
				}
			}
		//END- Primitive frequency analysis
			
			/*HSL stands for hue, saturation and lightness.
			An HSL color value is specified with: hsl(hue, saturation, lightness)*/
			// var hue = (value / 256) * 360;
			//tempCtx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
			
			tempCtx.fillStyle = myColor.getColor(value).hex();
			tempCtx.fillRect(spectrogramCanvasHEIGHT - 1,
			                                 (spectrogramCanvasHEIGHT - i), 1, 1);
											
		}
		
		context.translate(-1, 0);
		context.drawImage(tempCanvas,0,0, spectrogramCanvasWIDTH,
		                                                spectrogramCanvasHEIGHT);
		context.setTransform(1, 0, 0, 1, 0, 0);
	}else{
		//the canvas is not full yet.. so draw left to right
		for (var i = 0; i < analyser.frequencyBinCount; i++) {
			var value = freqDomain[i];
			
			//Primitive frequency analysis..
			if (value > highestValue){
				highestValue = value;
				highestValueIndex = i;
				highestValueLength = 1;
			} else {
				if (value == highestValue){
					if( (highestValueIndex + highestValueLength) == i){
						highestValueLength++;
					}
				}
			}
		//END- Primitive frequency analysis
			
			/*HSL stands for hue, saturation and lightness.
			An HSL color value is specified with: hsl(hue, saturation, lightness)*/
			// var hue = (value / 256) * 360;
			//tempCtx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
			
			tempCtx.fillStyle = tempCtx.fillStyle = myColor.getColor(value).hex();
			tempCtx.fillRect(spectrogramCanvasHEIGHT - 1,
			                                 (spectrogramCanvasHEIGHT - i), 1, 1);
											
		}
		
		context.drawImage(tempCanvas,0,0, spectrogramCanvasWIDTH,
		                                                spectrogramCanvasHEIGHT);
		spectrogramLeftPos++;
		
	}
	
	//Output some info.
	var highestValIdxStart = highestValueIndex;
	var highestValIdxEnd = highestValueIndex + (highestValueLength - 1);
	var tempIndex = Math.round( (highestValIdxStart + highestValIdxEnd) / 2 );
	
	var tmpFreq = getValueToFrequency(tempIndex);
	var tmpIndex = getFrequencyToIndex(tmpFreq);
	document.getElementById("debugInfo").innerHTML="freqDomain.length: " + freqDomain.length +
	                                  " / highestValue: " + highestValue +
									  " / highestValueIndex: " + highestValueIndex +
									  " / highestValueLength: " + highestValueLength +
									  " |----|  tempIndex: " + tempIndex +
									  " |----|  getValueToFrequency: " + tmpFreq +
									  " / getFrequencyToIndex: " + tmpIndex + "\n";
	
	
}	
//------------------------------------------------------------------------------------------------------------------------
	
	
	// Get the frequency of a value
	function getValueToFrequency(tmpValue) {
		// get the Nyquist frequency, 1/2 of the sampling rate
		var nyquistFrequency = audioContext.sampleRate / 2;
		// Map the index / bucket to a frequency.
		var freq = tmpValue * nyquistFrequency / analyser.frequencyBinCount;
		
		//return the corresponding frequency
		return freq;
	}
	
//------------------------------------------------------------------------------------------------------------------------
	
 // get the index value of a frequency.
 function getFrequencyToIndex(freq) {
	 //get the Nyquist frequency, 1/2 of the sampling  rate.
	 var nyquistFrequency = audioContext.sampleRate / 2;
	 // Map the index / bucket to a frequency.
     var index = Math.round(freq / nyquistFrequency * analyser.frequencyBinCount);
	 
		
	 //return the corresponding frequency
	 return index;
	 
 }
//------------------------------------------------------------------------------------------------------------------------
 
	
	
	










