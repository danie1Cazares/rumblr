const router = require('express').Router();
const prisma = require('../prisma'); 
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const authMiddleware = require('./middleware'); // if you require auth

// routes/comments.js

// get replies for a comment
router.get('/:id/replies', authMiddleware, async (req, res) => {
  const parentId = parseInt(req.params.id);
  const userId = req.userId;

  const replies = await prisma.comment.findMany({
    where: { parentId },
    include: {
      author: {
        select: { id: true, fname: true, lname: true, avatar: true }
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId } }
    },
    orderBy: { createdAt: 'asc' }
  });

  res.json(replies.map(reply => ({ ...reply, isLiked: reply.likes.length > 0 })));

});

// reply to a comment
router.post('/:id/replies', authMiddleware, async (req, res) => {

  const parentId = parseInt(req.params.id);
  const authorId = req.userId;
  const { content, postId } = req.body;

  const reply = await prisma.comment.create({
    data: { content, postId, authorId, parentId },
    include: {
      author: {
        select: { id: true, fname: true, lname: true, avatar: true }
      },
      _count: { select: { likes: true, replies: true } }
    }
  });

  res.json({ ...reply, isLiked: false });
});

// like a comment
router.post('/:id/like', authMiddleware, async (req, res) => {
  const commentId = parseInt(req.params.id);
  const userId = req.userId;

  const like = await prisma.commentLike.create({
    data: { userId, commentId }
  });

  res.json(like);
});

// unlike a comment
router.delete('/:id/like', authMiddleware, async (req, res) => {
  const commentId = parseInt(req.params.id);
  const userId = req.userId;

  await prisma.commentLike.delete({
    where: { userId_commentId: { userId, commentId } }
  });

  res.json({ success: true });
});

// delete a comment
router.delete('/:id', authMiddleware, async (req, res) => {
  const commentId = parseInt(req.params.id);
  const authorId = req.userId;

  // make sure user owns the comment
  const comment = await prisma.comment.findUnique({
    where: { id: commentId }
  });

  if (comment.authorId !== userId)
    return res.status(403).json({ error: 'Not authorized' });

  await prisma.comment.delete({ where: { id: commentId } });
  res.json({ success: true });
});

// edit a comment

router.put('/:id', authMiddleware, async (req, res) => {
  const commentId = parseInt(req.params.id);
  const userId    = req.userId;
  const { content } = req.body;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId }
  });

  if (!comment)
    return res.status(404).json({ error: 'Comment not found' });

  if (comment.authorId !== userId)
    return res.status(403).json({ error: 'Not authorized' });

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { content }
  });

  res.json(updated);
});

module.exports = router;