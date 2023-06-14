const express = require('express');
const {addNewCategory,allCategory,deleteCategory} = require('../controller/categoryController')
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('category')
})

router.post('/addCategory',addNewCategory)

router.get('/allCategory',allCategory)

router.delete('/deleteCategory',deleteCategory)

module.exports = router;