var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data=[
    {
        name: "Cloud's Rest", 
        image: "https://coresites-cdn-adm.imgix.net/mpora_new/wp-content/uploads/2015/01/heiplanet1.jpg",
        description:"Yeah, sure, she'd say she's the boss, but there shouldn't be any ego when you're pulling together to do something good, y'know? It's like Comic Relief. I'm out here in Africa and I'm seeing the flies and the starvation -- and she -- if she is the boss -- she's in the studio with, you know, Robin Williams and Whoopi Goldberg. They're doing their job, they're counting the money. Good for them. But, their hands are clean, while I'm down here in the office with the little starving kids --"
    },
    {
        name: "Desert Mesa", 
        image: "https://static.guideadvisor.com/wp-content/uploads/thumb-cache/best-campsite-arizona-b85ca8d7bfcc5eb4fba40d77a8590c0f-840x562-85-nocrop.jpg",
        description:"blh Yeah, sure, she'd say she's the boss, but there shouldn't be any ego when you're pulling together to do something good, y'know? It's like Comic Relief. I'm out here in Africa and I'm seeing the flies and the starvation -- and she -- if she is the boss -- she's in the studio with, you know, Robin Williams and Whoopi Goldberg. They're doing their job, they're counting the money. Good for them. But, their hands are clean, while I'm down here in the office with the little starving kids --"
    },
    {
        name: "Canyon Floor", 
        image: "https://www.dontforgettomove.com/wp-content/uploads/2014/08/camping1-800x535.jpg",
        description:"Yeah, sure, she'd say she's the boss, but there shouldn't be any ego when you're pulling together to do something good, y'know? It's like Comic Relief. I'm out here in Africa and I'm seeing the flies and the starvation -- and she -- if she is the boss -- she's in the studio with, you know, Robin Williams and Whoopi Goldberg. They're doing their job, they're counting the money. Good for them. But, their hands are clean, while I'm down here in the office with the little starving kids --"
    }
]


function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");  
        //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a campground");
                Comment.create(
                {
                    text: "This place is great but I wish there was internet",
                    author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new comment");
                    }

                });
            }
        });
    });
    Campground.create({})
    });
    
}

module.exports = seedDB;
