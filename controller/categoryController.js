const express = require('express');
const {categoryModel} = require('../models/category');
const {userModel} = require('../models/user');

const addNewCategory = async (req,res) =>{
    let data = req.body;
    let newCateg = await categoryModel.create({
        name:data.name
    })
    console.log(`POST /addCategory added ${data.name}`);
    return res.json({'success':true});
}

const deleteCategory = async (req,res) =>{
    let data = req.body;
    let categId = await categoryModel.deleteOne({
        _id:data._id
    })
    console.log(`DELETE /deleteCategory deleted ${data._id}`);
    return res.json({'success':true});
}
const allCategory = async (req,res) =>{
    let allCateg = await categoryModel.find();
    console.log(`GET /allCateg`);
    return res.json(allCateg);
}

const categoryView = async(req,res)=>{
    let data = req.query;
    try {
        let user = await userModel.findOne({_id:data.user});
        if(user){
            if(user.is_admin){
                return res.render('category');
            }
        }
    } catch (error) {
        return res.render('error404');
    }
    return res.render('error404');
}

module.exports = {addNewCategory,allCategory,deleteCategory,categoryView}
