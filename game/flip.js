// the array holds the numbers hiding in the boxes
var memory_array = ['January','January','February','February','March','March','April','April','May','May','June','June','July','July','August','August','September','September','October','October','November','November','December','December'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){  // making a new board 
	tiles_flipped = 0;
	var output = '';
	
	
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>'; // the div id representing all the boxes
	} // memory flipTile funtion to flip the words. the memory array passes the data 
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){ // when word is clicked, this function will run. 
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = 'red';// each word background 
		tile.innerHTML = val;
		if(memory_values.length == 0){  // checking if there is a word flipped when the word is clicked
			memory_values.push(val); // first word 
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){  // checking if there is already 1 word clicked 
			memory_values.push(val); // second word
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){  // check if the words are a match 
				tiles_flipped += 2; // word stay flipped over when its a match
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared ,all words have been flipped 
				if(tiles_flipped == memory_array.length){
					alert("Hurray! You did it... click OK to generate a new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard(); // random board generated 
				}
			} else {  
				function flip2Back(){  // if the words dont match 
				    // Flip the 2 words back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url() no-repeat'; // each word back ground 
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url() no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700); // the time set to flip the word back over 
			}
		}
	}
}
// References. Develop.com 
// W3Schools.com 


