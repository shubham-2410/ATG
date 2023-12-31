const mongoose = require('mongoose');

// connecting to database
const connectDB=(url)=>{
    return mongoose.connect(url , {
        // useNewUrlParser : true,
        // useUnifiedTopology:true,
    })
}

module.exports ={connectDB};