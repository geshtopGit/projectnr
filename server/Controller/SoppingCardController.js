const ShoppingCard = require('../Model/ShoppingCard')

const allShoppingCard = async (req, res) => {
    const shoppingCard = await ShoppingCard.find().lean()
    if (!shoppingCard)
        return res.status(400).json({ message: 'shoppingCard not found' })
    res.json(shoppingCard)
}
const singleShoppingCard = async (req, res) => {
    console.log("bbb");
    const shoppingCard = await ShoppingCard.find({user:req.user._id}).lean()
    if (!shoppingCard)
        return res.status(400).json({ message: 'shoppingCard not found' })
    res.json(shoppingCard)
}

// const singleShoppingCard = async (req, res) => {
//     const { id } = req.params
//     const shoppingCard = await ShoppingCard.findById(id).lean()
//     if (!shoppingCard)
//         return res.status(400).json({ message: 'shoppingCard not found' })
//     res.json(shoppingCard)
// }
const addShoppingCard = async (req, res) => {
    console.log("addShoppingCardcontroler");
    const { name, codeProduct, price, image, count } = req.body
    const userId=req.user?._id
    console.log(userId);
    if (!userId)
         return res.status(401).json({ message: 'Unauthorized' })
    if (!name || !codeProduct || !price || !image) {
        return res.status(400).json({ message: 'name and codeProduct and image and price  are required' })
    }
    const find = await ShoppingCard.findOne({ codeProduct, user: userId }).lean();
    //console.log(find);
    if (find) {
        return res.status(400).json("duplicete")
        // find.count = find.count+1
        // const updateNow = await find.save()
        // res.json(updateNow)

    }
    else {
        const shoppingCard = await ShoppingCard.create({ name,codeProduct, price, image, count,user:userId })
        res.json(shoppingCard)
    }
}
// const addShoppingCard = async (req, res) => {
//     try {
//         const { name, codeProduct, price, image, count } = req.body;
//         const user = req.user?._id;

//         if (!user) return res.status(401).json({ message: 'Unauthorized' });

//         const existing = await ShoppingCard.findOne({ codeProduct, user }).lean();
//         if (existing)
//             return res.status(409).json({ message: 'Product already in cart' });

//         const newCard = await ShoppingCard.create({ name, codeProduct, price, image, count, user });
//         res.status(201).json(newCard);
//     }catch (err) {
//     console.log("ERROR in addShoppingCard:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
// }
// };
const deleteShoppingCard = async (req, res) => {
    const { id } = req.params
    const shoppingCard = await ShoppingCard.findById(id)
    if (!shoppingCard)
        return res.status(400).json("not found")
    const reaply = `name ${shoppingCard.name} deleted`
    await shoppingCard.deleteOne()
    res.json(reaply)
}
const updateShoppingCard = async (req, res) => {
    console.log("sss");
    const { codeProduct, count } = req.body
    const userId = req.user?._id
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' })
    console.log("Request body:", req.body);
    const shoppingCard = await ShoppingCard.findOne({ codeProduct: codeProduct ,user:userId})
    console.log(shoppingCard);
    if (!shoppingCard)
        return res.status(400).json({ message: 'shoppingCard not found ' })
    shoppingCard.count += Number(count)
    const updateNow = await shoppingCard.save()
    res.json(updateNow)

}
const updateAllShoppingCard = async (req, res) => {
  
    const { codeProduct, price, image, category, name } = req.body;
      
  console.log("price1"+price);
    const shoppingCard = await ShoppingCard.findOne({ codeProduct});
    if (!shoppingCard)
      return res.status(404).json({ message: "Shopping cart not found" });
  console.log("price"+price);
  
    shoppingCard.price = price;
    shoppingCard.name = name;
    shoppingCard.category = category; 
    shoppingCard.image = image;

    const updated = await shoppingCard.save();
    res.json(updated);
  }
  const me=(req, res) => {
    res.json({ roles: req.user.roles });
  }

module.exports = { allShoppingCard,me, addShoppingCard, singleShoppingCard ,deleteShoppingCard,updateShoppingCard ,updateAllShoppingCard}