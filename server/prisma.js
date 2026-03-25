// server/prisma.js
const { PrismaClient } = require('@prisma/client');

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

// const prisma = new PrismaClient();

module.exports = prisma;