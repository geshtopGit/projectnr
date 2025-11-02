const mongoose=require('mongoose')
const prodectSchema=new mongoose.Schema({
name:{
    type:String,
    require:true
},
code:{
    type:String,
    require:true,
    unique:true
},
price:{
    type:String,
    require:true,
 }
,
image:{
    type:String
},
category:{
    type:String,
    enum:["שוקולאב בר","מגשי פירות","כלים ומפות","מארזי אירועים"],
    require:true
}
},{
    timestamps:true
})
module.exports=mongoose.model('Product',prodectSchema)