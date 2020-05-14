var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment		= require("./models/comment"),
	seedDB 		= require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
seedDB();

// Campground.create(
// 	{name: "Granite Hill",
// 	 image: "https://i.pinimg.com/originals/aa/fd/3b/aafd3b208cec3fd34ca178a62c8c4376.jpg",
// 	desription: "this is a huge granite hill"}
// 	, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("newly creted:");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){

	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	//create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})
	//redirect back to campgrounds page
});

app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
})
//Show more info
app.get("/campgrounds/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else{
			console.log(foundCampground)
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})

//==============
//COMMENT ROUTES
//==============

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{campground: campground});
		}
	})
})

app.post("/campgrounds/:id/comments",function(req,res){
	//lookup campgrounds using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment,function(err, comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id)
				}
			})
		}
		
	});
	//create new comment
	//connect new commetn to campground
	//redirect campground show page
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelp Camp server has started");
});