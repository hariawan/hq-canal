var config = {
  development: {
    paypal: {
      mode: 'sandbox',
      client_id: 'AckYf0_UtHG_Ne72ZWI5WN44Pc4_58D3ME3rJZ8ZaUrVAqOBQOs007LYc7XyovZ9WuXfj53WGZX0FG-i',
      client_secret: 'EIBbd_EyrB1KHk7PJD6EmXn7C5jdoY0aOEXJtk1kw5n8BEPuWUUu9Bl6-m9chyVHmrQeMHkrll18d12V'
    },
    braintree: {
      merchantId: 'fg3t4vzvr2f8fqd8',
      publicKey: 'w8k8g8n6nmg3r57f',
      privateKey: '075aba32e0b0d8fcbed37d8b83f47b61',
    }
  },
  production: {
    paypal: {
      mode: 'sandbox',
      client_id: 'AckYf0_UtHG_Ne72ZWI5WN44Pc4_58D3ME3rJZ8ZaUrVAqOBQOs007LYc7XyovZ9WuXfj53WGZX0FG-i',
      client_secret: 'EIBbd_EyrB1KHk7PJD6EmXn7C5jdoY0aOEXJtk1kw5n8BEPuWUUu9Bl6-m9chyVHmrQeMHkrll18d12V'
    },
    braintree: {
      merchantId: 'fg3t4vzvr2f8fqd8',
      publicKey: 'w8k8g8n6nmg3r57f',
      privateKey: '075aba32e0b0d8fcbed37d8b83f47b61',
    }
  },
}

module.exports = config[process.env.NODE_ENV || 'development']