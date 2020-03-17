const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(info => {
        res.status(200).json({ accounts: info });
    })
    .catch(err => res.status(500).json({ message: "There was an error with your request"}))
    // res.status(200).json({ message: "Hobbitses"});
})

router.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, 'id')
        .then(ids => {
            res.status(201).json({ results: ids});
        })
        .catch(err => {
            res.status(500).json({ message: "sorry, there was an error"})
        })

})




module.exports = router;