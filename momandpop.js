const data = {
  products: [
    {
      id: 1,
      name: 'Taktical Pants',
      description: 'Pants for a war with zombies or non-zombies.',
      price: {
        currency_code: 'USD',
        units: 5
      }
    },
    {
      id: 2,
      name: 'Regular Pants',
      description: 'Pants for whatever',
      price: {
        currency_code: 'USD',
        units: 7,
        nanos: 52000000
      }
    },
    {
      id: 99,
      name: 'Dumb Shirt',
      description: 'Ugly shirt that no one wants',
      price: {
        currency_code: 'USD',
        units: 100
      }
    }
  ],

  customers: [
    {
      id: 1,
      name: 'David Konsumer',
      birthday: {
        year: 1977,
        month: 2,
        day: 21
      }
    }
  ],

  sales: [
    {
      id: 1,
      customer: 1,
      products: [1, 2]
    }
  ]
}

const findById = (stuff, id) => stuff.filter(thing => thing.id === id).pop()
const findIndexById = (stuff, id) => stuff.map(thing => thing.id).indexOf(id)
const deleteById = (stuff, id) => {
  const index = findIndexById(stuff, id)
  if (index > -1) {
    stuff.splice(index, 1)
    return id
  }
}

module.exports = {
  momandpop: {
    MomAndPop: {
      GetAllProducts: (ctx, cb) => {
        cb(null, data.products)
      },

      UpsertProduct: (ctx, cb) => {
        if (ctx.request.id !== 0) {
          // update
          const pid = findIndexById(data.products, ctx.request.id)
          if (pid === -1) {
            return cb()
          }
          Object.assign(data.products[pid], ctx.request)
          cb(null, {id: [ctx.request.id]})
        } else {
          // insert
          const id = parseInt(Math.random() * 1000000000)
          const product = Object.assign({}, ctx.request, {id})
          data.products.push(product)
          cb(null, {id: [product.id]})
        }
      },

      DeleteProducts: (ctx, cb) => {
        const indexes = ctx.request.id
          .map(id => deleteById(data.products, id))
          .filter(i => i)
        cb(null, {id: indexes})
      },

      GetAllSales: (ctx, cb) => {
        const sales = data.sales.slice()
          .map(sale => {
            sale.products = sale.products.map(pid => findById(data.products, pid))
            sale.customer = findById(data.customers, sale.customer)
            return sale
          })
        cb(null, sales)
      },

      GetAllCustomers: (ctx, cb) => {
        cb(null, data.customers)
      }
    }
  }
}
