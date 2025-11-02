const mongoose=require('mongoose')
const shoppingCardSchema=new mongoose.Schema({
name:{
    type:String,
    required:true

},
codeProduct:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
price:{
    type:Number,
    required:true,
 }
,
image:{
    type:String
},
count:{ type:Number,
        default:1
}
},{
    timestamps:true
})
// shoppingCardSchema.index({ codeProduct: 1, user: 1 }, { unique: true });
module.exports=mongoose.model('ShoppingCard',shoppingCardSchema)