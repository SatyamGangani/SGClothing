const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require :true
    },
    phone : {
        type : String
    },
    role : {
        type : String
    },
    is_admin : {
        type : Boolean,
        default : false
    },
    profilePic : {
        type:String,
        default : undefined
    },
    profilePicPublicId : {
        type:String,
        default : undefined
    }
})

// export default mongoose.model('User',userSchema);   
const userModel = mongoose.model('User',userSchema)
module.exports = {userModel}
