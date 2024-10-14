// creating a router for the grade model

import express from 'express';

const router = express.Router();

// create a grade
router.post('/grade', (req, res) => {
	const level = req.body.level;

	pool.query(
		'INSERT INTO grade (level) VALUES ($1)',
		[level],
		(err, result) => {
			if (err) {
				console.log(err);
			}
			else {
				res.send('Grade created successfully');
			}
		}
	);

});

// get all grades

router.get('/grades', (req, res) => {
	pool.query('SELECT * FROM grade', (err, result) => {
		if (err) {
			console.log(err);
		}
		else {
			res.send(result.rows);
		}
	});
});

// get a grade by level
router.get('/grade/:level', (req, res) => {
	const { level } = req.params;
	pool.query('SELECT * FROM grades WHERE level = $1', [level], (err, result) => {
		if (err) {
			console.log(err);
		}
		else {
			res.send(result.rows);
		}
	});
});


export default router;