const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        
    },
    email:String,
    phone_no:{
        type:Number,
        
    },
    address:String

})

const UserModel=new mongoose.model('',UserSchema)

module.exports=UserModel