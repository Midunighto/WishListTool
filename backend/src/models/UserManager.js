const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, pwd) values (?, ?, ?)`,
      [user.pseudo, user.email, user.pwd]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readByUser(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item
  async updateTheme(theme, id) {
    const [result] = await this.database.query(
      `update ${this.table} SET theme = ? where id = ?`,
      [theme, id]
    );
    return result;
  }
  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID
  async delete(id) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  // async delete(id) {
  //   ...
  // }
  async checkEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email=?`,
      [email]
    );
    return rows;
  }

  async checkPseudo(pseudo) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where pseudo=?`,
      [pseudo]
    );
    return rows;
  }
}

module.exports = UserManager;
