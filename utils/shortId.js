let alphabet = 'abcdef0123456789ghijklABCDmnEFGHIJKLopqrstMNOPQRSTUVuvWXwxyzYZ@*'

function shortId (size = 21) {
    let id = ''
    let i = size
    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += alphabet[(Math.random() * 64) | 0]
    }
    return id
  }

  module.exports = shortId
