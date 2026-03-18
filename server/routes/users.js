const router = require('express').Router();
const { PrismaClient } = require('@prisma/client'); // ✅ CORRECT
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');

const prisma = new PrismaClient();



router.get('/', authMiddleware, async (req, res) => {
  //RETURNS USER BASED ON REQ.USERID RETURNED FROM AUTHMIDDLEWARE

  // req.userId is available now
//   const user = await prisma.user.findUnique({
//     where: { id: req.userId },
//   });

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      fname: true,
      lname: true,
      email: true,
      status: true,
      createdAt: true
    }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);

});

router.get('/all', authMiddleware, async (req, res) => {
//RETURNS ALL USERS

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        bio: true,
      }
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching users' });
  }


});

router.put('/update', async (req, res) => {
// UPDATES USER INFO

  const { name, email, bio, avatar, userId } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {name, email, bio, avatar }
  });
  console.log(updatedUser);
  res.json(updatedUser);
});




module.exports = router;
