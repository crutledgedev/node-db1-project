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

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .then(account => {
            res.status(200).json({ show: account});
        })
})



router.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, 'id')
        .then(ids => {
            res.status(201).json({ results: ids});
        })
        .catch(err => {
            res.status(500).json({ message: "sorry, there was an error"})
        });

})

router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del() // delete the records
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record updated successfully" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });

module.exports = router;