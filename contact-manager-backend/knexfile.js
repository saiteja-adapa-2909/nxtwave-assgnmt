module.exports = {
    development: {
      client: "sqlite3",
      connection: {
        filename: "./contacts.db",
      },
      useNullAsDefault: true,
    },
  };
  