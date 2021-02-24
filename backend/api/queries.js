module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (SELECT id FROM categories WHERE id = ?
        UNION ALL
        SELECT c.id FROM subcategories, categories as c WHERE "parentId" = subcategories.id)

        SELECT id FROM subcategories
    `
}