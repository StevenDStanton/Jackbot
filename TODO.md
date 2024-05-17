function display(response){
	response.json().then(data => console.log(data));
}



const futureData = fetch('https://catfact.ninja/fact');
futureData.then(display);