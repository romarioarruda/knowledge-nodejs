module.exports = app => {
    const { existsOrError, notExistsOrError, isIntOrError } = app.api.validation

    const save = (req, resp) => {
        const article = { ...req.body }
        
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch(msg) {
            return resp.status(400).send(msg)
        }

        if(article.id) {
            app.db('articles').update(article).where({ id: article.id })
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        } else {
            app.db('articles').insert(article)
                .then(_ => resp.status(204).send())
                .catch(err => resp.status(500).send(err))
        }
    }


    const remove = async (req, resp) => {
        try {
            isIntOrError(req.params.id, 'Código do artigo deve ser um número inteiro')

            const rowsDeleted = await app.db('articles').where({ id: req.params.id }).del()

            existsOrError(rowsDeleted, 'Artigo não foi encontrado')

            resp.status(204).send()
        } catch(msg) {
            return resp.status(400).send(msg)
        }
    }


    const limit = 10 //Usado na paginação

    const get = async (req, resp) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()

        const count = parseInt(result.count)

        app.db('articles').select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => resp.json({ data: articles, count, limit }))
            .catch(err => resp.status(500).send(err))
    }


    const getOne = (req, resp) => {
        if(!parseInt(req.params.id)) return resp.send('Parâmetro inválido')

        app.db('articles').where({ id: req.params.id}).first()
            .then(article => {
                if(article.id) {
                    article.content = article.content.toString()
                    return resp.json(article)
                }
            })
            .catch(err => resp.status(500).send(err))
    }

    return { save, remove, get, getOne }
}