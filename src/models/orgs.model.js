const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const _getAllOrgs = () => {
  return db("organization_table").select("*").orderBy("id");
};

const _getOneOrg = (username) => {
  return db("organization_table").select("*").where({ username });
};

const _addOrg = async (
  username,
  password,
  full_name,
  email,
  contact_telephone,
  areas_of_interest
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.transaction(async (trx) => {
      const [userId] = await trx("organization_credentials").insert(
        { username, password: hashedPassword },
        ["id", "username"]
      );
      await trx("organization_table").insert({
        username,
        full_name,
        email,
        contact_telephone,
        areas_of_interest,
      });
    });
    return "Org added successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add org");
  }
};

const _logOrg = async (username, password) => {
  try {
    const org = await db("organization_credentials")
      .select("id", "username", "password")
      .where({ username })
      .first();
    if (org) {
      const passwordMatch = await bcrypt.compare(password, org.password);
      if (passwordMatch) {
        return {
          id: org.id,
          username: org.username,
        };
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate org");
  }
};

const _updateOrg = async (id, dataToUpdate) => {
  try {
    await db("organization_table").where({ id }).update(dataToUpdate);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update org");
  }
};

module.exports = {
  _getAllOrgs,
  _getOneOrg,
  _addOrg,
  _updateOrg,
  _logOrg,
};
