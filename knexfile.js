module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/whatnow'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
