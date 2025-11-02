const Product = require('../Model/Product')
const ShoppingCard = require('../Model/ShoppingCard')

const allProduct=async(req,res)=>{
    const products=await Product.find().lean()
    if(!products)
        return res.status(400).json({message:'no products found'})
     res.json(products)
}
const singleProduct=async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id).lean()
    if(!product)
        return res.status(400).json({message:'no product found'})
    res.json(product)
}
const addProduct=async(req,res)=>{
    const {name,code,price,image,category}=req.body
    if(!name||!code||!price||!category){
        return res.status(400).json({message:'name and code and price and category are required'})
    }
    const find=await Product.findOne({code:code}).lean()
    //console.log(find);
     if(find)
         return res.status(400).json({message:'code is exist'})
     const product=await Product.create({name,code,price,image,category})
      res.json(product)
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).json("not found")
    const shoppingCards = await ShoppingCard.find({ codeProduct: id });

    let count = 0;
    for (let card of shoppingCards) {
        await card.deleteOne();
        count++;
    }
    const reaply = `name ${product.name} deleted`
    await product.deleteOne()
    res.json(reaply)

}
const updateProduct = async (req, res) => {
   
    const {name,code,price,image,category}=req.body
    console.log(code+"   dd");
    // const find=await Product.findOne({code:code}).lean()
    //  if(find)
    //      return res.status(400).json({message:'code is exist'})
    if(!code)
        return res.status(400).json({message:'code is required'})
    const product = await Product.findOne({code:code})
    console.log(product+"   dd");
    if (!product)
        return res.status(400).json({ message: 'product not found ' })
    // product.code=code
    product.name=name
    product.category=category
    product.price=price
    product.image=image
    const updateNow=await product.save()
    res.json(updateNow)
    
}
module.exports={addProduct,allProduct,singleProduct,deleteProduct,updateProduct}