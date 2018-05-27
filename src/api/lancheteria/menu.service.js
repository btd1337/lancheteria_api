const Menu = require('./menu')

Menu.methods(['get', 'post', 'put', 'delete'])
Menu.updateOptions({ new: true, runValidators: true })

module.exports = Menu
