import express from 'express'
import user from './user'
import organization from './organization'
import party from './party';
const router = express.Router();

router.get('/', (req, res) => {
    res.end("Index called");
})

router.use('/user', user);
router.use('/organization', organization);
router.use('/party', party);


module.exports = router