const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const _getAllUsers = () => {
  return db("user_table").select("*").orderBy("id");
};

const _getOneUser = (username) => {
  return db("user_table").select("*").where({ username });
};

const _addUser = async (
  username,
  password,
  full_name,
  email,
  contact_telephone,
  areas_of_interest,
  available_locations
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.transaction(async (trx) => {
      const [userId] = await trx("user_credentials").insert(
        { username, password: hashedPassword },
        ["id", "username"]
      );
      await trx("user_table").insert({
        username,
        full_name,
        email,
        contact_telephone,
        areas_of_interest,
        available_locations,
      });
    });
    return "User added successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add user");
  }
};

const _logUser = async (username, password) => {
  try {
    const user = await db("user_credentials")
      .select("id", "username", "password")
      .where({ username })
      .first();
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return {
          id: user.id,
          username: user.username,
        };
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate user");
  }
};

const _updateUser = async (id, dataToUpdate) => {
  try {
    await db("user_table").where({ id }).update(dataToUpdate);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
};

module.exports = {
  _getAllUsers,
  _getOneUser,
  _addUser,
  _updateUser,
  _logUser,
};
