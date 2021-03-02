module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, isIntOrError } = app.api.validation

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


    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)

            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1

            return 0
        })

        return categoriesWithPath
    }


    const get = async (req, resp) => {
        if (req.query.page) {
            const limit = 10
            const page = req.query.page || 1

            const result = await app.db('categories').count('id').first()
            const count = parseInt(result.count)

            app.db('categories')
                .select('id', 'name', 'parentId')
                .limit(limit).offset(page * limit - limit)
                .then(categories => resp.json({ data: categories, count, limit }))
        } else {
            app.db('categories').select('id', 'name', 'parentId')
                .then(categories => resp.json(withPath(categories)))
                .catch(err => resp.status(500).send(err))
        }
    }


    const getOne = (req, resp) => {
        if(!parseInt(req.params.id)) return resp.send('Parâmetro inválido')

        app.db('categories').select('id', 'name', 'parentId').where({ id: req.params.id })
            .then(category => resp.json(category))
            .catch(err => resp.status(500).send(err))
    }


    const remove = async (req, resp) => {
        try {
            existsOrError(req.params.id, 'Código da categoria não informado')

            isIntOrError(req.params.id, 'Código da categoria deve ser um número inteiro')

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


    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId)

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId === parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))

            return parentNode
        })

        return tree
    }


    const getTree = (req, resp) => {
        app.db('categories')
            .then(categories => resp.json(toTree(categories)))
            .catch(err => resp.status(500).send(err))
    }


    return { save, remove, get, getOne, getTree }
}