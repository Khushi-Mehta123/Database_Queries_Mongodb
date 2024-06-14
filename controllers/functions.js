
const { query } = require('express')
const Product = require('../model/schema')
const { search } = require('../routers/route')
const { log } = require('console')

const getAllProductStatic =async (req,res)=>{
    const pattern = 'ab'
    const allprod = await Product.find({
        // featured:true,
        // name : { $regex : pattern , $options : 'i'},
        price : {$gt : 30}
    }).sort('price').select('name price')
    res.status(200).json({allprod , nbHits : allprod.length})
}

const getAllProducts = async (req,res)=>{
    // console.log(req.query);
    // const searchprod = await Product.find(req.query)

    const queryObj = {}
    // const pattern = 'k'
    const {featured,company,name,sort,select,numericfilter} = req.query
    if(featured){
        queryObj.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObj.company = company 
    }
    if(name){
        queryObj.name = {$regex : name} 
    }
    if(numericfilter){
        const opmap = {
            '>=' : '$gte',
            '>' : '$gt',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq',
        }
        const regEx = /\b(>|<|>=|<=|=)\b/g
        const options = ['price','rating']
        let filters = numericfilter.replace(regEx,(match) => `-${opmap[match]}-`)
         
        // filters= filters.split(',') // split->, and store in array of filters 
        // ane ema map kari sakiye for each thi 

        // chutta padva split use thai -> split('- | , ')
        // console.log(filters);

        filters = filters.split(',').forEach(element => {
            const [field,op,value] = element.split('-')
            if(options.includes(field)){
                queryObj[field] = {[op] : Number(value)}
            }
        });
    }

    // let value = 'a-b-c'

    // value = value.split('-').forEach((item) => console.log(item))
    // console.log(value);

    let searchprod =  Product.find(queryObj)
    // sort
    if(sort){
        console.log(sort);
        // name , -price -> split, ane pachi join karse -> ' '
        // multiple sort karva mate
        const sortList = sort.split(',').join(' ')

        searchprod = searchprod.sort(sortList)
        console.log(sortList)
    }
    else{
        searchprod = searchprod.sort('rating')
    }

    // select
    if(select){
        const selectlist = select.split(',').join(' ')
        console.log(selectlist);
        searchprod = searchprod.select(selectlist) 
    }
    // pages

    // if(page){
    //     searchprod = searchprod.limit(page)
    // }

    // // limit pre page
    // if(limit){
    //     searchprod = searchprod.skip(limit)
    // }

    const page = Number(req.query.pages) || 1
    const limit = Number(req.query.limit) || searchprod.length
    const skip = (page-1) * limit

    searchprod.skip(skip).limit(limit)

    const result = await searchprod
    res.status(200).json({result, nbHits : result.length})
}

module.exports = {getAllProductStatic , getAllProducts}