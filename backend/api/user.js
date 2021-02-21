const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)

        return bcrypt.hashSync(password, salt)
    }


    const save = async (req, resp) => {
        const user = { ...req.body }
        
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users').where({ email: user.email }).first()

            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        }catch(msg) {
            return resp.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users').update(user).where({ id: user.id })
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        } else {
            app.db('users').insert(user)
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        }
    }

    const get = (req, resp) => {
        app.db('users').select('id', 'name', 'email', 'admin')
            .then(users => resp.json(users))
            .catch(err => resp.status(500).send(err))
    }

    const getOne = (req, resp) => {
        if(!parseInt(req.params.id)) return resp.send('Parâmetro inválido.')

        app.db('users').select('id', 'name', 'email', 'admin').where({ id: req.params.id })
            .then(user => {
                if(user.length) {
                    return resp.json(user)
                } else {
                    return resp.json({ result: null })
                }
            })
            .catch(err => resp.status(500).send(err))
    }

    return { save, get, getOne }
}