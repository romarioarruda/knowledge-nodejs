function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'String' && !value.trim()) throw msg
}


function notExistsOrError(value, msg) {
    try {
        existsOrError(value, msg)
    } catch(msg) {
        return
    }

    throw msg
}


function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
}

function isIntOrError(value, msg) {
    if(!parseInt(value)) throw msg
}

module.exports = {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    isIntOrError
}