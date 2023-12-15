// Function to extract numbers
function myGeeks() {

	// Input string
	let str = "foo35bar5jhkj88  awd 22 2a2 a22";
	console.log(str)

	// Using match with regEx
	let matches = str.match(/\d+/g);
	
	// Display output if number extracted
	if (matches) {
		console.log(matches);
	}
}

// Function call
myGeeks();
