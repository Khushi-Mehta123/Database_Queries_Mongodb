
const connectDB = require('./connect/db')
const jsonprod = require('./product.json')
const products = require('./model/schema')

const start = () => {
    try {
        async function run() {
            await connectDB
            await products.create(jsonprod)
            console.log("connected");
            process.exit(0)
        } 
        return run()
    } catch (error) {
        console.log(error);
    }

}
start()