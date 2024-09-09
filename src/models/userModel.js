const { getDB } = require('../config/database');
const bcrypt = require('bcryptjs');

const getUserCollection = () => getDB().collection('users');

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };
    await getUserCollection().insertOne(user);
    return user;
};

const findUserByEmail = async (email) => {
    return await getUserCollection().findOne({ email });
};

module.exports = { createUser, findUserByEmail };
