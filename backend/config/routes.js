module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getOne)

    app.route('/categories')
        .get(app.api.category.get)

    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getOne)
    
    app.route('/category')
        .post(app.api.category.save)

    app.route('/category/:id')
        .put(app.api.category.save)

    app.route('/category/:id')
        .delete(app.api.category.remove)

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .get(app.api.article.getOne)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
}