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

// Save a post
router.post('/:id/save', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const postId = parseInt(req.params.id);

  const saved = await prisma.savedPost.create({
    data: { userId, postId }
  });

  res.json(saved);
});

// Unsave a post
router.delete('/:id/save', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const postId = parseInt(req.params.id);

  await prisma.savedPost.delete({
    where: {
      userId_postId: { userId, postId }
    }
  });

  res.json({ success: true });
});

// Get all saved posts for logged in user
router.get('/saved', authMiddleware, async (req, res) => {
  const userId = req.userId;

  const savedPosts = await prisma.savedPost.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          author: {
            select: { id: true, username: true }
          },
          _count: {
            select: { likes: true, comments: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(savedPosts.map(s => s.post)); // return just the posts
});

// Like a post
router.post('/:id/like', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const postId = parseInt(req.params.id);

  const liked = await prisma.like.create({
    data: { userId, postId }
  });

  res.json(liked);
});

// Unlike a post
router.delete('/:id/like', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const postId = parseInt(req.params.id);

  await prisma.like.delete({
    where: {
      userId_postId: { userId, postId }
    }
  });

  res.json({ success: true });
});

// Get all liked posts for logged in user
router.get('/liked', authMiddleware, async (req, res) => {
  const userId = req.userId;

  const likedPosts = await prisma.like.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          author: {
            select: { id: true, username: true }
          },
          _count: {
            select: { likes: true, comments: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(likedPosts.map(l => l.post)); // return just the posts
});

// routes/posts.js

// get top level comments for a post
router.get('/:id/comments', authMiddleware, async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.userId;

  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null // only top level comments
    },
    include: {
      author: { select: { id: true, email: true, avatar: true, fname: true, lname: true } },
      _count: { select: { likes: true, replies: true } },
      likes: {
        where: { userId }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(comments.map(comment => ({
    ...comment,
    isLiked: comment.likes.length > 0 // true if this user liked it
  })));


});

// post a comment
router.post('/:id/comments', authMiddleware, async (req, res) => {
  const postId   = parseInt(req.params.id);
  const authorId = req.userId;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: { content, postId, authorId, parentId: null },
    include: {
      author: {
        select: { id: true, email: true, fname: true, lname: true, avatar: true }
      },
      _count: { select: { likes: true, replies: true } }
    }
  });

  res.json({ ...comment, isLiked: false }); // new comment, so isLiked is always false
});




router.get('/feed', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit; // page 1 = skip 0, page 2 = skip 20

  const posts = await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: { followerId: userId }
        }
      }
    },
    include: {
      author: {
        select: { id: true, fname: true, lname: true, email: true, avatar: true }
      },
      _count: {                          
        select: {
          likes: true,
          comments: true
        }
      },
      savedBy: {
        where: { userId } // only check for the logged in user
      },
      likes: {
        where: { userId }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip
  });

  res.json(posts.map(post => ({
    ...post,
    isSaved: post.savedBy.length > 0, // true if this user saved it
    isLiked: post.likes.length > 0 // true if this user liked it
  })));


});





module.exports = router;