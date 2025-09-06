import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

async function createUser(user) {

    // 1. username 중복 확인
    const existingUser = await userRepository.findByName(user.username);

    if (existingUser) {
        // 409 Conflict: 요청이 리소스의 현재 상태와 충돌함 (여기서는 username 중복)
        const error = new Error('Username is already taken');
        error.code = 409;
        error.data = { username: user.username };
        throw error;
    }

    // 2. 중복이 없으면 사용자 생성
    const hashedPassword = await hashingPassword(user.password);
    const createdUser = await userRepository.save({ ...user, password: hashedPassword });

    return filterSensitiveUserDate(createdUser);
}

async function getUser(username, password) {

    const user = await userRepository.findByName(username);

    if (!user) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }

    verifyPassword(password, user.password);

    return filterSensitiveUserDate(user);
}

async function getUserById(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }

    return filterSensitiveUserDate(user);
}


//=== util functions ===//

async function hashingPassword(password) {
    return bcrypt.hash(password, 10);
}

async function verifyPassword(inputPassword, savedPassword) {
    const isValid = await bcrypt.compare(inputPassword, savedPassword);
    if (!isValid) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }
}

function filterSensitiveUserDate(user) {
    const { password, ...rest } = user;
    return rest;
}

function createToken(user, type) {
    const payload = { userId: user.id };
    const options = { expiresIn: type === 'refresh' ? '1w' : '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default {
    createUser,
    getUser,
    createToken,
    getUserById,
};