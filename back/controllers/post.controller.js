const { User, Post } = require('../models/Index');

// Retourne tout les posts
Post.findAll({
    include: User, // 
}) 

