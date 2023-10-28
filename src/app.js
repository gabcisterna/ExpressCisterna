const express = require('express')
const ProductManager = require('../ProductManager')

const productManager = new ProductManager()
const PORT = 8080

const app = express()

app.use(express.urlencoded({extended:true}))

const products = productManager.getProducts()

app.get('/products', (req, res) => {
    let limit = req.query.limit

    if (!limit) {
        return res.send(products);
    } 

    limit = parseInt(limit);

    if (!isNaN(limit)) {
        let mostrarLimit = products.slice(0, limit);
        return res.send(mostrarLimit);
    }
    res.send("Error del servidor")
})

app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid

    pid = parseInt(pid)

    try {
        const productId = productManager.getProductById(pid)

        if (productId) {
            return res.send(productId);
        } else {
            return res.send("Producto no encontrado")
        }
    } catch(error) {
        res.send("Error del servidor")
        }
})


app.listen(PORT,() => {
    console.log("Preparado para hacer filtros")
})
