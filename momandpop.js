const uuidv4 = require('uuid/v4')

const LevelUp = require('levelup')
const LevelDown = require('leveldown')
const Sublevel = require('level-sublevel')

const db = Sublevel(LevelUp(LevelDown('/tmp/momandpop'), { encoding: 'json' }))

const customer = db.sublevel('customer')
const product = db.sublevel('product')
const sale = db.sublevel('sale')

module.exports = {
  momandpop: {
    MomAndPop: {
      GetProduct: (ctx, cb) => {
        product.get(ctx.request.id, cb)
      },

      GetAllProducts: (ctx, cb) => {
        const out = {products: []}
        product.createValueStream()
          .on('data', (data) => {
            out.products.push(data)
          })
          .on('end', () => {
            cb(null, out)
          })
      },

      UpsertProduct: (ctx, cb) => {
        if (ctx.request.id === '') {
          ctx.request.id = uuidv4()
        }
        product.put(ctx.request.id, ctx.request, (err, ret) => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      },

      DeleteProduct: (ctx, cb) => {
        product.del(ctx.request.id, err => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      },

      GetSale: (ctx, cb) => {
        sale.get(ctx.request.id, cb)
      },

      GetAllSales: (ctx, cb) => {
        const out = {sales: []}
        sale.createValueStream()
          .on('data', (data) => {
            out.sales.push(data)
          })
          .on('end', () => {
            cb(null, out)
          })
      },

      UpsertSale: (ctx, cb) => {
        if (ctx.request.id === '') {
          ctx.request.id = uuidv4()
        }
        sale.put(ctx.request.id, ctx.request, (err, ret) => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      },

      DeleteSale: (ctx, cb) => {
        sale.del(ctx.request.id, err => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      },

      GetCustomer: (ctx, cb) => {
        customer.get(ctx.request.id, cb)
      },

      GetAllCustomers: (ctx, cb) => {
        const out = {customers: []}
        customer.createValueStream()
          .on('data', (data) => {
            out.customers.push(data)
          })
          .on('end', () => {
            cb(null, out)
          })
      },

      UpsertCustomer: (ctx, cb) => {
        if (ctx.request.id === '') {
          ctx.request.id = uuidv4()
        }
        customer.put(ctx.request.id, ctx.request, (err, ret) => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      },

      DeleteCustomer: (ctx, cb) => {
        customer.del(ctx.request.id, err => {
          if (err) {
            return cb(err)
          }
          cb(null, {id: [ctx.request.id]})
        })
      }
    }
  }
}
