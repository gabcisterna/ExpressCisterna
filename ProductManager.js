class ProductManager{
    constructor(){
        this.products = []
        this.nextId = 1
        this.path = "./products.txt"
        this.loadProducts()
    }

    loadProducts(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)
            if (this.products.length > 0){
                this.nextId = Math.max(...this.products.map((product) => product.id))
            }
        } catch (error) {
            this.products = []
        }
    }

    saveProducts(){
        const data = JSON.stringify(this.products, null, 2)
        fs.writeFileSync(this.path, data)
    }

    addProduct(title, description, price, thumbnail, code, stock){
        // Valida que los datos no esten incompletos
        if (!title || !description || isNaN(price) || !thumbnail || !code  || isNaN(stock)) {
            console.log("Los datos del producto son inválidos o están incompletos.")
            return
        }

        // Valida el code que no se repita
        if (code && this.products.some(product => product.code === code)) {
            console.log(`El código ${code} ya está en uso. Elige un código único.`)
            return
        }

        // Carga los datos del producto
        let nuevoEvento = {
            id: this.nextId,
            title,          // nombre del producto
            description,    // descripción del producto
            price,          // percio
            thumbnail,      // ruta de imagen
            code,           // código identificador
            stock           //número de piezas disponibles
        }

        // Agrega al array product un producto nuevo
        this.products.push(nuevoEvento)
        this.nextId++ // Incrementar el id para el próximo producto
        this.saveProducts() // Guarda los productos en el archivo
    }

    getProductById(id){
        let indice = this.products.findIndex(products => products.id === id)
        if (indice === -1){
            console.log(`Not found code:${id}`)
        } else{
            console.log(this.products[indice])
            return this.products[indice]
        }
    }

    getProducts() {
        return this.products
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log(`Producto no encontrado con ID: ${id}`);
            return;
        }
    
        this.products.splice(productIndex, 1);
        this.saveProducts(); // Guarda los cambios en el archivo
    }

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log(`Producto no encontrado con ID: ${id}`);
            return;
        }
    
        const existingProduct = this.products[productIndex];
    
        // Copia los campos existentes del producto
        const updatedFields = {
            title: existingProduct.title,
            description: existingProduct.description,
            price: existingProduct.price,
            thumbnail: existingProduct.thumbnail,
            code: existingProduct.code,
            stock: existingProduct.stock,
            id, // Asegura que el ID no cambie
        };
    
        // Actualiza los campos proporcionados en updatedProduct
        for (const field in updatedProduct) {
            if (updatedFields.hasOwnProperty(field)) {
            updatedFields[field] = updatedProduct[field];
            }
        }
    
        this.products[productIndex] = updatedFields;
        this.saveProducts(); // Guarda los cambios en el archivo
    }
}

const fs = require('fs')

module.exports = ProductManager