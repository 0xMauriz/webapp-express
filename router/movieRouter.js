const express = require('express')
const app = express()
const router = express.Router();
const moviesController = require('../controllers/moviesController.js')

router.get('/', moviesController.index)

router.post('/', moviesController.store)

router.get('/:title', moviesController.show)

router.put('/:id', moviesController.update)

router.patch('/:id', (req, res) => {
    res.send('Modifica parziale del post ' + req.params.id)
})

router.delete('/:title', moviesController.destroy)

module.exports = router;