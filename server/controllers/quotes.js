const mongoose = require('mongoose'),
      Bear = mongoose.model('Bear')

const quotes = {
    index: function (req, res){
        Bear.find({}, function (err, bears) {
            if (err) {
                console.log(err)
                res.redirect('/')

            } else {
                var allUsers = [];
                for (i = 0; i < bears.length; i++) {
                    allUsers.push(bears[i]);
                }
            }
            console.log("All Users: ", allUsers)
            res.render('index', { bears: allUsers });
            res.end()
            console.log("-------------")
        })

    },
    showBear: function(req, res){
        console.log(req.params.id)
        // Bear.find({_id: req.params.id}, function(err, current){
        Bear.findById(req.params.id, function (err, current) {

            if (err) {
                console.log(err)
                res.redirect('/')
            }
            else {

                console.log(current.name)

                res.render('edit', { bear: current })
            }
        })
    },
    deleteBear: function(req, res){
        Bear.findById(req.params.id, function (err, current) {
            if (err) {
                console.log(err)
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/edit/' + req.params.id)
            } else {
                current.remove({ _id: req.params.id }, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Bear successfully deleted")
                    }
                })
            }
        })
        res.redirect('/')
    },
    editBear: function(req, res){
        Bear.findById(req.params.id, function (err, current) {
            if (err) {
                console.log(err)
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/edit/' + req.params.id)
            } else {
                current.name = req.body.name;
                current.quote = req.body.quote;
                current.save();
                res.redirect('/')
            }
        })
    },
    addBear: function(req, res){
        console.log("Post Date" + req.body)

        var bear = new Bear({ name: req.body.name, quote: req.body.quote, created_at: new Date() })
        bear.save(function (err) {
            if (err) {
                console.log('something went wrong', err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added a user!');
                res.redirect('/');
            }
        })
    }
}

module.exports = quotes