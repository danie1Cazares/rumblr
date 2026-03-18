const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');

const { PrismaClient } = require('@prisma/client'); // ✅ CORRECT
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  // validation errors here
  const { email, password, confirmPassword } = req.body;
  const fname = req.body.fname.trim();
  const lname = req.body.lname.trim();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  
  if (existingUser) return res.status(401).json({ message: 'User exists. Please try again.' });
  if (password.length <  6) return res.status(401).json({ message: 'Passwords must be at least 6 characters.' });
  if (password !== confirmPassword) return res.status(401).json({ message: 'Passwords did not match. Please try again.' });
  

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { fname, lname, email, password: hash }
  });

  res.json(user); 
  //remove above line in production
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      password: true
    }
  });

  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log('TOKEN:', token);
  
  // UPDATE user status to online 
  await prisma.user.update({
    where: { id: user.id },
    data: { status: "online" }
  });

  res.json({ token });
});

router.put('/logout', authMiddleware, async (req,res) => {

    const userId = parseInt(req.userId);

  await prisma.user.update({
    where: { id: userId },
    data: { status: "offline" }
  });

    res.json('User has been logged off');

});



module.exports = router;
