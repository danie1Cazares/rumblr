const router = require('express').Router();
const prisma = require('../prisma'); 
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const authMiddleware = require('./middleware'); // if you require auth

router.post('/', authMiddleware, async (req, res) => {
  const { caption, imageUrl } = req.body;
  const userId = req.userId; // assuming your auth middleware sets this

  try {
    const post = await prisma.post.create({
      data: {
        caption,
        imageUrl,
        authorId: userId
      }
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});

module.exports = router;