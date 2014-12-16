var sql = require('sql')

module.exports = SQLQuickRest

function SQLQuickRest(opts) {
  this.db = opts.db
  this.table = opts.table
  this.key = opts.key
}

SQLQuickRest.prototype.get = function (key, cb) {
  var query = this.table
      .select(this.table[this.key])
      .from(this.table)
      .where(
        this.table[this.key].equals(key)
      ).toQuery()

  this.db.exec(query, cb)
}

SQLQuickRest.prototype.put = function (key, data, cb) {
  var query = this.table
      .update(this.table)
      .where(
        this.table[this.key].equals(key)
      )
      .values(data)
      .toQuery()

  this.db.exec(query, cb)
}

SQLQuickRest.prototype.post = function (data, cb) {
  var query = this.table
    .insert(this.table)
    .values(data)
    .toQuery()

  this.db.exec(query, cb)
}

SQLQuickRest.prototype.delete = function (key, cb) {
  var query = this.table
    .delete(this.table)
    .where(
      this.table[this.key].equals(key)
    ).toQuery()

  this.db.exec(query, cb)
}

SQLQuickRest.prototype.all = function (cb) {
  var query = this.table
    .select(this.table)
    .from(this.table) // really???
    .toQuery()

  this.db.exec(query, cb)
}