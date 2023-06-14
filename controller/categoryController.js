const express = require('express');
const {categoryModel} = require('../models/category');

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

module.exports = {addNewCategory,allCategory,deleteCategory}