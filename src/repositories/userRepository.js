import prisma from '../lib/prisma.js';

async function save(user) {
    return prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
        }
    });
}

async function findByName(username) {
    return prisma.user.findUnique({
        where: {
            username,
        }
    });
}

async function update(id, data) {
    return prisma.user.update({
        where: {
            id,
        },
        data: data
    });
}

async function findById(id) {
    return prisma.user.findUnique({
        where: {
            id,
        }
    });
}

export default {
    save,
    update,
    findByName,
    findById,
};