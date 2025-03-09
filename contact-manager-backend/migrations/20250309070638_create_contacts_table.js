/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};
exports.up = function (knex) {
    return knex.schema.createTable("contacts", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("phone").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("contacts");
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
