const gallery = document.getElementById("gallery");


fetch("http://localhost:5000/images")
.then(response => response.json())
.then(images => {


images.forEach(image => {


gallery.innerHTML += `

<img 
src="http://localhost:5000/uploads/${image}"
alt="Jospat Project">

`;

});


});