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
    }
  ],
  sales: [],
  customers: []
}

module.exports = {
  momandpop: {
    MomAndPop: {
      GetAllProducts: (ctx, cb) => {
        cb(null, data.products)
      },
      GetAllSales: (ctx, cb) => {
        cb(null, data.sales)
      },
      GetAllCustomers: (ctx, cb) => {
        cb(null, data.customers)
      }
    }
  }
}
