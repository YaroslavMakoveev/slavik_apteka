require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

class UserController {
    async registration (req, res) {
        const {name, surname, patronymic, email, phone, password, role} = req.body
        try {
            const existingUserByEmail = await Users.findOne({where: {email}});
            if(existingUserByEmail) {
                return res.status(402).json({message: 'Пользователь с таким email уже зарегистрирован'})
            };
            const existingUserByPhone = await Users.findOne({where: {phone}});
            if(existingUserByPhone) {
                return res.status(402).json({message: 'Пользователь с таким номером телефона уже зарегистрирован'})
            };
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({
                name,
                surname, 
                patronymic,
                email,
                phone,
                password: hashedPassword,
                role
            });
            const token = generateJwt(user.id, user.email, user.role);
            return res.status(200).json({message: 'Пользователь успешно зарегистрирован', user, token, role: user.role});
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async login (req, res) {
        const {email, password} = req.body;
        try {
            const user = await Users.findOne({where: {email}});
            if(!user) {
                return res.status(404).json({message: 'Пользователь с таким email не зарегистрирован'});
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword) {
                return res.status(401).json({message: 'Не верный пароль'});
            };
            const token = generateJwt(user.id, user.email, user.role);
            return res.status(200).json({message: 'Пользователь авторизован', user, token, role: user.role})
        } catch (error) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async auth (req, res) {
        const { id } = req.user;

        try {
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            return res.json({ id: user.id, name: user.name, surname: user.surname, patronymic: user.patronymic, email: user.email, phone: user.phone, role: user.role });
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await Users.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, surname, patronymic, email, phone, role } = req.body;
        try {
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            user.name = name;
            user.surname = surname;
            user.patronymic = patronymic;
            user.email = email;
            user.phone = phone;
            user.role = role;
            await user.save();
            return res.status(200).json({ message: 'Пользователь успешно обновлен', user });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await user.destroy();
            return res.status(200).json({ message: 'Пользователь успешно удален' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
};

module.exports = new UserController();