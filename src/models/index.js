// const Roles = require('./roles')
// const Users = require('./users')
const sequelize = require('./sequelize')
const tb_logins = require('./logins')
const users = require('./users')
const tb_order_items = require('./order_items')
const items = require('./items')
const orders = require('./orders')
const tb_promos = require('./promos')
const tb_payments = require('./payments')



users.hasMany(tb_logins, {
  as: 'tb_login',
  foreignKey: 'id_users',
})

users.hasMany(tb_order_items, {
    as: 'tb_order_items',
    foreignKey: 'id_user',
  })

  items.hasMany(tb_order_items, {
    as: 'tb_order_items',
    foreignKey: 'id_item',
  })

  // orderRelation
  users.hasMany(orders, {
    as: 'orders',
    foreignKey: 'id_user',
  })

  // tb_promos.hasMany(orders, {
  //   as: 'orders',
  //   foreignKey: 'id_promo',
  // })

// tb_order_items.belongsTo(users, {
//   as: 'users',
//   foreignKey: 'id_users',
// })

module.exports = {
  sequelize,
  tb_logins,
  users,
  tb_order_items,
  items,
  orders,
  tb_promos,
  tb_payments,
}
