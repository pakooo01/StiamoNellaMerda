const { getAllAste, addAsta, aggiornaPrezzo } = require('../controllers/astaController');
const router = require('express').Router();

router.get("/getAllAste", getAllAste);
router.post("/addAsta", addAsta);
router.post("/aggiornaPrezzo/:astaId/:userId /:puntata", aggiornaPrezzo);

module.exports = router;
