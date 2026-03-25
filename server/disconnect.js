const { PrismaClient } = require('@prisma/client'); // ✅ CORRECT
const prisma = new PrismaClient();

prisma.$disconnect()
prisma.$connect()