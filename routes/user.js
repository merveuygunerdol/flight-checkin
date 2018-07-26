const express = require('express');
const router = express.Router();

const userService = require('../services/user-service');

router.post('/add', async (req, res, next) => {
    const user = await userService.add(req.body);
    res.send(user);
});

router.get('/fetch', async (req, res, next) => {
    const user = await userService.findAll();
    let userInfo = {
        name: user[0].fullname,
        email: user[0].email,
        id: user[0].id
    }
    res.send(userInfo);
});


module.exports = router;
