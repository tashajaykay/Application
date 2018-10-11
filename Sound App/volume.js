//volume.js
//sound exaple 1 

//audio context 
var audioContext;

//a sound
var aSoundBuffer = null;

//a sound source 
var aSoundSource = null;


// add an event to the window .the load event will load the init function.
window.addEventListener('load', init, false);

// create a gain node
var gainNode = null;

//function to initialise the audio context
function init() {
	try{
		//check if the default maning is enabled , if not use the Webkit naming.
		if (!window.AudioContext) {
			window.AudioContext = window.webkitAudioContext;
		}
		
		audioContext = new AudioContext();
		
		// set the gain node
		gainNode = audioContext.createGain();
	}
	catch(e) {
		alert("Web Audio is not supported in this browse ");
	}
}

//Add events to documents elements.
function addEvents() {
	//add an event listener to the file input.
	document.getElementById("files").addEventListener('change', loadaSound, false);
	//add an event to the volume control
	document.getElementById('volume').addEventListener('change', adjustVolume);
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
//Adjust the volume
function adjustVolume() {
	gainNode.gain.value = this.value;
	if(this.value = 0 ) {
		gainNode.gain.value = 0;
	}
	
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
	
	
	// Adjust the volume
	//------------------
	//create a gain node.
	
	//Connect the source to the gain node
	aSoundSource.connect(gainNode);
	// connect the gain node to the destination
	
	//connect the source to the context's destination 
	gainNode.connect(audioContext.destination);
	//set the current volume.
	var volume = document.getElementById('volume').value;
	gainNode.gain.value = volume * volume;
	
	gainNode.gain.value = 0.5;
	
	//-End: Adjust the volume 
	
	//play th esource now 
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










