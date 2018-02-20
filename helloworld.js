module.exports = {
  helloworld: {
    Greeter: {
      SayHello: function (ctx, cb) {
        if (!ctx.request.name) {
          return cb(new Error('name is required.'))
        }
        cb(null, {message: 'Hello ' + ctx.request.name})
      },

      SayGoodbye: function (ctx, cb) {
        if (!ctx.request.name) {
          return cb(new Error('name is required.'))
        }
        cb(null, {message: 'See ya later, ' + ctx.request.name})
      }
    }
  }
}
