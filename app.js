var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){

	res.render("landing");
});

app.get("/campgrounds", function(req, res){
			var campgrounds=[
		{name: "Salmon Creek", image: "https://www.liligo.com/travel-edition/wp-content/uploads/sites/41/2017/06/Camping.jpg"},
		{name: "Granite Hill", image: "https://i.pinimg.com/originals/aa/fd/3b/aafd3b208cec3fd34ca178a62c8c4376.jpg"},
		{name: "Mountain's Rest", image: "https://i.insider.com/5aeb4d41bd96714f008b4602?width=1100&format=jpeg&auto=webp"}
		
	]
	res.render("campgrounds", {campgrounds:campgrounds});

});



app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelp Camp server has started");
});