require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const app = express()
const connectDB = require("./config/dbConn")
connectDB()
const PORT = process.env.PORT || 1004
app.use(cors(corsOptions))
app.use(express.json())
app.use ( '/uploads' , express.static ( 'uploads' ))

app.use('/api/product', require('./Routers/productRouter'))
app.use('/api/shoppingCard', require('./Routers/shoppingCardRouter'))
app.use("/api/auth", require("./Routers/authRoutes"))


 mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })

})
 mongoose.connection.on('error', err => {
     console.log(err);
 })