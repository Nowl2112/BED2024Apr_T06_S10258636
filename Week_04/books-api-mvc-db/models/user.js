const sql = require("mssql");
const dbConfig = require("../dbConfig");
const { createBook } = require("./book");

class User{
    constructor(id,username,email){
        this.id=id;
        this.username=username;
        this.email=email;
    }
    static async getAllUsers(){
        const connection=await sql.connect(dbConfig);
        const sqlQuery='SELECT * FROM Users';
        const request =connection.request();
        const result=await request.query(sqlQuery);
        connection.close();
    
    return result.recordset.map(
        (row) => new User(row.id, row.username, row.email)
      ); // Convert rows to User objects
}
static async createUser(newUserData){
    const connection=await aql.connect(dbConfig);
    const sqlQuery='INSERT INTO Users (id,username,email) VALUES(@id,@username,@email); SELECT SCOPE IDENTITY AS id';
    const request =connection.request();
    request.input("username".newUserData.id);
    request.input("email",newUserData.email);
    const result=await request.query(sqlQuery);
    connection.close();
    return this.getAllUsers(result.recordset[0].id);
}

static async getUserById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new User(
          result.recordset[0].id,
          result.recordset[0].username,
          result.recordset[0].email
        )
      : null; // Handle book not found
  }
  static async updateUser(id, newUserData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `UPDATE User SET username = @username, email = @email WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    request.input("username", newUserData.username || null); // Handle optional fields
    request.input("email", newUserData.email || null);

    await request.query(sqlQuery);

    connection.close();

    return this.getUserById(id); // returning the updated book data
  }

  static async deleteUser(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.rowsAffected > 0; // Indicate success based on affected rows
  }
  static async getUsersCount() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT COUNT(*) AS count FROM Users`; // Get the count of books

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0].count; // Return the count of users
  }
}
module.exports=User;