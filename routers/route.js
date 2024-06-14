
const express = require('express')
const app = express()

const router = express.Router()
const {getAllProductStatic,getAllProducts} = require('../controllers/functions')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductStatic)


module.exports = router