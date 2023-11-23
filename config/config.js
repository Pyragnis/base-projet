module.exports = {
  development: {
    username: "postgres",
    password: "basic",
    database: "spotify",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "your_test_username",
    password: "your_test_password",
    database: "your_test_database_name",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "your_production_username",
    password: "your_production_password",
    database: "your_production_database_name",
    host: "localhost",
    dialect: "postgres",
  },
};
