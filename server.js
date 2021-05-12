const express=require('express')
const app=express()
const PORT= 5000
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const UserModel=require('./models/UserModel')
const bodyParser=require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine','ejs')
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Database Connected......")
    }
},{useNewUrlParser: true,useUnifiedTopology:true})

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

//Creating new users
app.post('/',(req,res)=>{
        const UserDocument=new UserModel({
        username:req.body.username,
        email:req.body.email,
        phone_no:req.body.phone_no,
        address:req.body.address
      
    })

    UserDocument.save((err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('New User Created Successfilly!!!')
        }
    })

})
//to display users
app.get('/users',(req,res)=>{
    UserModel.find({},(err,data)=>{
        if(err) throw err;
        res.render('users', { records:data });
          });

})





app.listen(PORT,()=>console.log(`server is listening at ${PORT}`))