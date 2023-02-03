/**
 * Rutas de Eventos / Events
 * host + /api/events
 */

const { Router } = require('express')
const { check } = require('express-validator')
const {
    crearEvento,
    getEventos,
    actualizarEvento,
    eliminarEvento,
} = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()
router.use(validarJWT)

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
)

router.get('/', getEventos)

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
)

router.delete('/:id', eliminarEvento)

module.exports = router
