require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

const UserController = {
    async register(req, res) {
        try {
            const { firstName, lastName, email, password, addressStreet, addressCity, addressState, addressZip, dateOfBirth } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                addressStreet,
                addressCity,
                addressState,
                addressZip,
                dateOfBirth
            });
            
            const newAccount = await Account.create({
                accountNumber: 'ACCT-' + newUser.id,
                accountType: 'Checking',  
                userId: newUser.id
            });

            res.status(201).json({
                message: 'User created successfully.',
                userId: newUser.id,
                accountId: newAccount.id,
                accountNumber: newAccount.accountNumber
            });
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: 'User with this email already exists.' });
            } else {
                res.status(500).json({ message: 'Internal server error.' });
            }
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
};

module.exports = UserController;