const express = require('express');
const {addNewCategory,allCategory,deleteCategory,categoryView} = require('../controller/categoryController')
const router = express.Router();

router.get('/',categoryView)

router.post('/addCategory',addNewCategory)

router.get('/allCategory',allCategory)

router.delete('/deleteCategory',deleteCategory)

module.exports = router;
