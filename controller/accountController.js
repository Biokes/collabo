require('dotenv').config();
const User  = require('../models/User');
const Transaction  = require('../models/Transaction');
const Account = require('../models/Account')
const sequelize = require('../config/dbConfig');


const AccountController = {
    async transfer(req, res) {
        const { senderId, receiverId, amount } = req.body;

        if (!senderId || !receiverId || !amount) {
            return res.status(400).json({ message: 'Sender ID, receiver ID, and amount are required.' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero.' });
        }
        try {
            const result = await sequelize.transaction(async (t) => {
                const sender = await User.findByPk(senderId, { transaction: t });
                const receiver = await User.findByPk(receiverId, { transaction: t });

                if (!sender) {
                    throw new Error('Sender not found.');
                }

                if (!receiver) {
                    throw new Error('Receiver not found.');
                }

                if (sender.balance < amount) {
                    throw new Error('Insufficient balance.');
                }

                sender.balance -= amount;
                receiver.balance += amount;

                await sender.save({ transaction: t });
                await receiver.save({ transaction: t });

                await Transaction.create({
                    senderId,
                    receiverId,
                    amount,
                    date: new Date()
                }, { transaction: t });

                return { sender, receiver };
            });

            res.status(200).json({ message: 'Transfer successful.', result });
        } catch (error) {
            console.error('Error during transfer:', error);
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    },

    async getBalance(req, res) {
        const { userId } = req.params;
    
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
    
        try {
            const account = await Account.findOne({ where: { userId } });
    
            if (!account) {
                return res.status(404).json({ message: 'Account not found.' });
            }
    
            res.status(200).json({ balance: account.balance });
        } catch (error) {
            console.error('Error getting balance:', error);
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    }
    
};

module.exports = AccountController;
