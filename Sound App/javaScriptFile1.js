//javaScriptFile1.js
//sound exaple 1 

//audio context 
var audioContext;

//a sound
var aSoundBuffer = null;

//a sound source 
var aSoundSource = null;

// add an event to the window .the load event will load the init function.
window.addEventListener('load', init, false);

//function to initialise the audio context
function init() {
	try{
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

//Add events to documents elements.
function addEvents() {
	//add an event listener to the file input.
	document.getElementById("files").addEventListener('change', loadaSound, false);
}

//load a file when the file is selected.
function loadaSound(evt) {
	//get the file list object.
	var files = evt.target.files;
	
	//get the first file in the list.
	//this example only works 
	//with the fist file returned.
	var fileSelected = files[0];
	
	//create a file reader.
	var reader = new FileReader();
	
	reader.onload = function(e) {
		initSound(this.result);
	};
	
	//read in the image file as a data url.
	reader.readAsArrayBuffer(fileSelected);
	
}

//initialise the sound.
function initSound(arrayBuffer) {
	audioContext.decodeAudioData(arrayBuffer,
	                 function(buffer){
	                 	// audio buffer is global to reuse the decoded audio later.
						 aSoundBuffer = buffer;
	                 },
					 function(e) {
						 console.log('error decoding file', e);
					 }
				 );
}

//play tye sound 
function playSound(buffer) {                           //creates a sound source 
	aSoundSource = audioContext.createBufferSource(); //tell the source which sound to play
	aSoundSource.buffer = buffer;
	aSoundSource.connect(audioContext.destination);
	
	aSoundSource.start(0);                           //play the source now 
}

//stop the sound 
//simple stop will only stop the last 
//sound if you press play more than once 
function stopSound() {
	if (aSoundSource) {
		aSoundSource.stop(0);
	}
}


























