const express=require('express')
const router=express.Router()
const productcontroller=require('../Controller/ProductController')
router.get('/',productcontroller.allProduct)
router.get('/:id',productcontroller.singleProduct)
router.post('/',productcontroller.addProduct)
router.delete('/:id',productcontroller.deleteProduct)
router.put('/',productcontroller.updateProduct)
module.exports=router