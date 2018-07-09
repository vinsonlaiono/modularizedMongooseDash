const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-dashboard');
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 2 },
    created_at: { type: Date }
});
mongoose.model('Bear', UserSchema);