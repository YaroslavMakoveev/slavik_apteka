const sequelize = require('../dbConfig');
const { DataTypes } = require('sequelize');

// Модель пользователей 
const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            is: {
                args: [/^\+\d{10,15}$/], 
                msg: "Номер телефона должен быть в формате +71234567890"
            }
        }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' }
});

//Модель категорий
const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

//Модель товаров
const Products = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.png'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0 
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id'
        },
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

//Cвязь категорий и товаров
Products.belongsTo(Categories, { foreignKey: 'categoryId' });

module.exports = {
    Users,
    Products,
    Categories
};