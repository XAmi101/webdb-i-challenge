// http://knexjs.org/#Builder-insert


//npx knex seed:run needed to see the data

const express = require('express');
// database access using knex

const db = require('./data/dbConfig.js');

const router = express.Router();


router.get('/', (req, res) => {
	db('accounts')
		.then((account) => {
			res.status(200).json(account);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
    const idz = req.params.id;

    db.select("*")
        .from("accounts")
        .where("id", "=", idz)
        .first()
        .then(account => res.status(200).json(account))
        // .then((account) => {
		// 	!account ? res.status(404).json({ error: 'id does not exist' }) : res.json(account);
        // })        
        .catch(err => res.status(500).json({ error: "given id does not exisit"}))
})

router.post('/', (req, res) => {
	const theChange = req.body;
	!theChange.name || !theChange.budget
		? res.status(400).json({ error: 'you are missing either name or budget' })
		: db('accounts')
				.insert(theChange, 'id')
				.then(ids => {
					res.status(200).json(ids /*, theChange}*/);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
});

router.put("/:id", (req, res) => {
    const changes = req.body;
	const idz = req.params.id;
    db("accounts")
        .where({id: idz})
        //^^ same as .where('id', '=', idz)
        .then(account => res.status(200).json( {account, changes}))
        .catch(err => res.status(500).json({  message: "could not update account with given id"}))
})

router.delete("/:id", (req, res) => {
    const idz = req.params.id;
    db("accounts")
        .where({ id: idz})
        .del()
        .then(accountOne => res.status(200).json(accountOne))
        .catch(err => res.status(500).json({ message: "unable to delete account with given id"}))
})

module.exports = router;