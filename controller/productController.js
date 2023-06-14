const {productModel} = require('../models/product');
const fs = require('fs');
const path = require('path')

const newProduct = async (req,res,next)=>{
    let data = req.body;
    let primaryImgFile = req.files.primaryImage[0].filename;
    let secondaryImgFile = req.files.secondaryImage[0].filename;
    try {
        let newProduct = await productModel.create({
            name:data.name,
            category:data.category,
            price:data.price,
            description:data.description,
            material:data.material,
            primaryImage:primaryImgFile,
            secondaryImage:secondaryImgFile,
            size_s:data.size_s,
            size_m:data.size_m,
            size_l:data.size_l,
            size_xl:data.size_xl,
        })
        console.log(`POST /product/newProduct added new product ${data.name}`);
        return res.json({success:true})
    } catch (error) {
        return res.json({error:true})
    }
}

const allProduct = async (req,res) =>{
    let products = await productModel.find().populate({
        path:'category',
        select:{'name':1,'_id':0}
    });
    console.log('GET /allProductData');
    return res.json(products);
}

const deleteProduct = async (req,res) =>{
    let data = req.body;
    let product = await productModel.findOne({_id:data.productId});
    console.log(__dirname)
    let ImgDirPath = path.join(__dirname,'../productImg/')
    if(product){
        try{
            fs.unlinkSync(`${ImgDirPath}${product.primaryImage}`);
            fs.unlinkSync(`${ImgDirPath}${product.secondaryImage}`);
            console.log("DELETED IMG FOR PRODUCT : " + product.name);
        }catch(e){
            console.log('Error occurred while deleting img. Error: \n'+e);
        }
    }
    let productDelete = await productModel.deleteOne({_id:data.productId});
    return res.json({success:true})
}

const getSingleProduct = async (req,res)=>{
    let productId = req.query.productId;
    let productData = await productModel.findOne({_id:productId});
    if(productData){
        console.log("GET /getProduct " + productData.name);
    }
    res.json(productData);
}

const updateProduct = async (req,res)=>{
    let data = req.body;
    // console.log(data);
    // console.log(req.files.primaryImage);
    // console.log(req.files.secondaryImage);
    let ImgDirPath = path.join(__dirname,'../productImg/');
    let product = await productModel.findOne({_id:data.productId});
    if(req.files.primaryImage != undefined && req.files.secondaryImage != undefined){
        try{
            fs.unlinkSync(`${ImgDirPath}${product.primaryImage}`);
            fs.unlinkSync(`${ImgDirPath}${product.secondaryImage}`);
            console.log("DELETED IMG FOR PRODUCT : " + product.name);
        }catch(e){
            console.log('Error occurred while deleting img. Error: \n'+e);
        }
        let newProduct = await productModel.updateOne({_id:data.productId},{$set:
            {name:data.name,
                category:data.category,
                price:data.price,
                description:data.description,
                material:data.material,
            primaryImage:req.files.primaryImage[0].filename,
            secondaryImage:req.files.secondaryImage[0].filename,
            size_s:data.size_s,
            size_m:data.size_m,
            size_l:data.size_l,
            size_xl:data.size_xl}
        })
        console.log(`POST /product/newProduct added new product ${data.name}`);
        return res.json({success:true})
    }
    else if(req.files.primaryImage != undefined){
        try{
            fs.unlinkSync(`${ImgDirPath}${product.primaryImage}`);
            console.log("DELETED IMG FOR PRODUCT : " + product.name);
        }catch(e){
            console.log('Error occurred while deleting img. Error: \n'+e);
        }
        let newProduct = await productModel.updateOne({_id:data.productId},{$set:
            {name:data.name,
                category:data.category,
                price:data.price,
                description:data.description,
                material:data.material,
                primaryImage:req.files.primaryImage[0].filename,
                size_s:data.size_s,
                size_m:data.size_m,
                size_l:data.size_l,
                size_xl:data.size_xl,}
            })
            console.log(`POST /product/newProduct added new product ${data.name}`);
            return res.json({success:true})
        }
        else if(req.files.secondaryImage != undefined){
            try{
                fs.unlinkSync(`${ImgDirPath}${product.secondaryImage}`);
                console.log("DELETED IMG FOR PRODUCT : " + product.name);
            }catch(e){
                console.log('Error occurred while deleting img. Error: \n'+e);
            }
            let newProduct = await productModel.updateOne({_id:data.productId},{$set:
            {name:data.name,
                category:data.category,
                price:data.price,
            description:data.description,
            material:data.material,
            secondaryImage:req.files.secondaryImage[0].filename,
            size_s:data.size_s,
            size_m:data.size_m,
            size_l:data.size_l,
            size_xl:data.size_xl}
        })
        console.log(`POST /product/newProduct added new product ${data.name}`);
        return res.json({success:true})
    }
    else{
        let newProduct = await productModel.updateOne({_id:data.productId},{$set:
            {name:data.name,
            category:data.category,
            price:data.price,
            description:data.description,
            material:data.material,
            size_s:data.size_s,
            size_m:data.size_m,
            size_l:data.size_l,
            size_xl:data.size_xl}
        })
        console.log(`POST /product/newProduct added new product ${data.name}`);
        return res.json({success:true})

    }
    
    // return res.json({success:true});
}

module.exports = {newProduct,allProduct,deleteProduct,getSingleProduct,updateProduct}