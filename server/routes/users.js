const router = require('express').Router();
const prisma = require('../prisma'); // shared client

const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');

// const { PrismaClient } = require('@prisma/client'); 
// const prisma = new PrismaClient();



router.get('/', authMiddleware, async (req, res) => {
  //RETURNS USER BASED ON REQ.USERID RETURNED FROM AUTHMIDDLEWARE

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      fname: true,
      lname: true,
      email: true,
      status: true,
      bio: true,
      avatar: true,
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

router.put('/update', authMiddleware, async (req, res) => {
// UPDATES USER INFO

  const { fname, lname, email, bio, avatar} = req.body.updatedUser;
  console.log("UPDATED USER:", fname, lname, email, bio, avatar);

  const userId = req.userId;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {fname, lname, email, bio, avatar }
  });
  // console.log('UPDATED USER');
  // console.log(updatedUser);
  res.json(updatedUser);
});


router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: true,
      followers: true,
      following: true,
      _count: { select: { followers: true, following: true } }

    }
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    posts: user.posts,
    avatar: user.avatar,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    followersCount: user._count.followers,
    followingCount: user._count.following
  });
});

// Follow a user
router.post('/:id/follow', authMiddleware, async (req, res) => {
  const currentUser  = req.userId;        // from auth middleware
  const userToFollow = parseInt(req.params.id);

  if (currentUser === userToFollow)
    return res.status(400).json({ error: "Can't follow yourself" });

  const follow = await prisma.follow.create({
    data: { followerId: currentUser, followingId: userToFollow }
  });
  res.json(follow);
});

// Unfollow a user
router.delete('/:id/follow', authMiddleware, async (req, res) => {
  const currentUser  = req.userId;
  const userToUnfollow = parseInt(req.params.id);

  await prisma.follow.delete({
    where: { followerId_followingId: { followerId: currentUser, followingId: userToUnfollow } }
  });
  res.json({ success: true });
});

// Remove a follower
router.delete('/:id/remove-follower', authMiddleware, async (req, res) => {
  const  userToUnfollow = req.userId;
  const currentUser = parseInt(req.params.id);

  await prisma.follow.delete({
    where: { followerId_followingId: { followerId: currentUser, followingId: userToUnfollow } }
  });
  res.json({ success: true });
});

// GET /users/:id/follow-status
router.get('/:id/follow-status', authMiddleware, async (req, res) => {
  const followerId  = req.userId;             // logged in user
  const followingId = parseInt(req.params.id); // profile being viewed

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId }
    }
  });

  res.json({ isFollowing: !!follow }); // true if row exists, false if not
});


router.get('/:id/followers', authMiddleware, async (req, res) => {
  const userId = parseInt(req.params.id);

  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: { id: true, fname: true, lname: true, email: true, avatar: true }
      }
    }
  });

  res.json(followers.map(f => f.follower));
});

// Get followers/following with counts
// router.get('/:id', async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: { id: parseInt(req.params.id) },
//     include: {
//       followers: { include: { follower: true } },
//       following: { include: { following: true } },
//       _count: { select: { followers: true, following: true } }
//     }
//   });
//   res.json(user);
// });


module.exports = router;
