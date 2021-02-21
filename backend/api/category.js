module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, resp) => {
        const category = { ...req.body }

        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome da categoria não foi informado')
        } catch(msg) {
            return resp.status(400).send(msg)
        }

        if(category.id) {
            app.db('categories').update(category).where({ id: category.id })
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        } else {
            app.db('categories').insert(category)
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        }
    }


    const get = (req, resp) => {
        app.db('categories').select('id', 'name', 'parentId')
            .then(categories => resp.json(categories))
            .catch(err => resp.status(500).send(err))
    }


    const getOne = (req, resp) => {
        if(!parseInt(req.params.id)) return resp.send('Parâmetro inválido')

        app.db('categories').select('id', 'name', 'parentId').where({ id: req.params.id })
            .then(category => {
                if(category.length) {
                    return resp.json(category)
                } else {
                    return resp.json({ result: null })
                }
            })
            .catch(err => resp.status(500).send(err))
    }


    const remove = async (req, resp) => {
        try {
            existsOrError(req.params.id, 'Código da categoria não informado')

            const subCategory = await app.db('categories').where({ parentId: req.params.id })
            notExistsOrError(subCategory, 'Categoria possui subcategorias')

            const articles = await app.db('articles').where({ categoryId: req.params.id })
            notExistsOrError(subCategory, 'Categoria possui artigos')

            const rowsDeleted = await app.db('categories').where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada')

            resp.status(204).send()
        } catch(msg) {
            return resp.status(400).send(msg)
        }
    }

    return { save, get, getOne }
}