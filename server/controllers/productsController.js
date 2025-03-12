const { Products, Categories } = require('../models/models');

class ProductsController {
    async create(req, res) {
        const { name, description, price, quantity, categoryId, manufacturer } = req.body;
        const img = req.file ? req.file.filename : 'default.png';
        try {
            const existingProduct = await Products.findOne({ where: { name } });
            if (existingProduct) {
                return res.status(402).json({ message: 'Товар уже существует' });
            }
            const product = await Products.create({
                name,
                img,
                description,
                price,
                quantity,
                categoryId,
                manufacturer
            });
            return res.status(200).json({ message: 'Товар добавлен', product });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getAll(req, res) {
        try {
            const products = await Products.findAll({ include: Categories });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
            const product = await Products.findOne({ where: { id }, include: Categories });
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            return res.status(200).json({ product });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async update(req, res) {
        const { name, description, price, quantity, categoryId, manufacturer } = req.body;
        const { id } = req.params;
        const img = req.file ? req.file.filename : 'default.png';
        try {
            const product = await Products.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            product.name = name;
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            product.categoryId = categoryId;
            product.manufacturer = manufacturer;
            if (img) {
                product.img = img;
            }
            await product.save();
            return res.json(product);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const product = await Products.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            await product.destroy();
            return res.status(200).json({ message: 'Товар успешно удален' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new ProductsController();
