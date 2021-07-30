const db = require("mongoose");

async function connect(uri) {
  db.Promise = global.Promise;
  try {
    await db.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[db] Conectada con exito");
  } catch (error) {
    console.error(`Failed while connecting to db:`, db);
  }
}

module.exports = connect;
