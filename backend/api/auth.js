const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, resp) => {
        if (!req.body.email || !req.body.password) {
            return resp.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users').where({ email: req.body.email }).first()

        if (!user) return resp.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if (!isMatch) return resp.status(401).send('Senha inválida!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // Tempo de criação do token
            exp: now + (60 * 60 * 24) // Tempo (1 dia) de expiração do token
        }

        resp.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }


    const validateToken = (req, resp) => {
        const userData = req.body || null

        if (userData) {
            const token  = jwt.decode(userData.token, authSecret)

            if (new Date(token.exp * 1000) > new Date()) {
                return resp.send(true)
            }
        }

        return resp.send(false)
    }


    return { signin, validateToken }
}