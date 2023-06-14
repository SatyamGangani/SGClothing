const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require("./router/userRouter");
const categoryRouter = require("./router/categoryRouter");
const productRouter = require("./router/productRouter");
const shopRouter = require("./router/shopRouter");
const cartRouter = require("./router/cartRouter");
const checkoutRouter = require("./router/checkoutRouter");
const orderRouter = require("./router/orderRouter");
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }))
// for accessing formdata
// const multer = require('multer');
// const upload = multer({dest:'/upload'});
// app.use(upload.array());
// Use this as we don't get body when we make post request.
app.use(bodyParser.json())
// for
// app.use(bodyParser.json({limit: '50mb', extended: true}));
// app.use(express.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 1000000}));
const staticPath = (path.join(__dirname,'.'));
app.use(express.static(staticPath));

const partialsPath = (path.join(__dirname, "/partials"));
hbs.registerPartials(partialsPath);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","hbs");

mongoose.connect("mongodb+srv://pythonchampion187:66253EbcUMb4ZEY9@sgecommerce.wq5hfry.mongodb.net/")
.then(()=>console.log("Connected to the database.."))
.catch((err)=>console.log(`Error occured. Reason : ${err}`))
app.get('/',(req,res)=>{
    // res.send("Hey, I am working....")
    res.render('index')
})

app.use("/user/",userRouter);

app.use('/category/',categoryRouter);

app.use('/product/',productRouter);

app.use('/shop/',shopRouter);

app.use('/cart',cartRouter)

app.use('/checkout',checkoutRouter)

app.use('/order',orderRouter)

app.use('*',(req,res)=>{
    res.render('error404')
});

app.listen(process.env.PORT || 7000,()=>{
    console.log("Listening on 7000");
})

