const {Categories} = require('../models/models');

class CategoriesController {
    async create (req, res) {
        const {name} = req.body;
        try {
            const existingCategiry = await Categories.findOne({where: {name}});
            if(existingCategiry) {
                return res.status(402).json({message: 'Категория уже существует'})
            }
            const category = await Categories.create({
                name
            })
            return res.status(200).json({message: 'Категория добавлена', category})
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async getAll (req, res) {
        try {
            const categories = await Categories.findAll();
            return res.status(200).json(categories)
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async getOne (req, res) {
        const {id} = req.params;
        try {
            const category = await Categories.findOne({where: {id}});
            if(!category) {
                return res.status(404).json({message: 'Категория не найдена'})
            };
            return res.status(200).json(category)
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async update (req, res) {
        const {name} = req.body;
        const {id} = req.params;
        try {
            const category = await Categories.findOne({where: {id}});
            category.name = name;
            await category.save();
            return res.json(category)
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }        
    }

    async delete (req, res) {
        const {id} = req.params;
        try {
            const category = await Categories.findOne({where: {id}});
            if (!category) {
                return res.status(404).json({ message: 'Категория не найдена' });
            }
            await category.destroy();
            return res.status(200).json({message: 'Категория успешно удалена'})
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }
};

module.exports = new CategoriesController();