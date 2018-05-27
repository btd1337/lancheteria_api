const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://user_dba:m142536@ds135750.mlab.com:35750/lancheteria')
