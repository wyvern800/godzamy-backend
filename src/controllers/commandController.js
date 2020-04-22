exports.commands_list = function (request, response) {
  var connection = request.connection;
  const { filter } = request.query;
  const query = filter
    ? "SELECT * FROM commands WHERE category = " + filter
    : "SELECT * FROM commands";
  connection.query(query, function (err, results, fields) {
    if (err) {
      return response.send({
        status: 0,
        msg: "Error listing commands",
        raw: request.params,
      });
    }
    return response.json(results);
  });
};

exports.commands_create = function (request, response) {
  var connection = request.connection;
  var dateNow = new Date().toLocaleString();

  const {
    commandname,
    action,
    category,
    example,
    cooldown,
    price,
  } = request.body;

  const command = {
    commandname,
    action,
    category,
    example,
    cooldown,
    price,
    created: dateNow,
    modified: dateNow,
  };
  connection.query("INSERT INTO commands set ? ", command, function (
    err,
    rows
  ) {
    if (err) {
      return response.send({
        status: 0,
        msg: "Error inserting command",
      });
    }
    return response.send({
      status: 1,
      msg: "Command added",
      raw: request.params,
    });
  });
};

exports.commands_update = function (request, response) {
  var connection = request.connection;
  const { id } = request.params;
  var dateNow = new Date().toLocaleString();

  const {
    commandname,
    action,
    category,
    example,
    cooldown,
    price,
  } = request.body;

  const command = {
    commandname,
    action,
    category,
    example,
    cooldown,
    price,
    modified: dateNow,
  };

  /*const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send("Repository doesn't exists");
  }*/

  connection.query(
    "UPDATE commands set ? WHERE id = ?",
    [command, id],
    function (err, rows) {
      if (err) {
        return response.send({
          status: 0,
          msg: "Error updating command",
        });
      }
      return response.send({
        status: 1,
        msg: "Command updated",
        raw: request.params,
      });
    }
  );

  return response.status(200).json({ status: "ok" });
};

exports.commands_delete = function (request, response) {
  var connection = request.connection;
  const { id } = request.params;

  /*const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }*/

  connection.query("DELETE FROM commands WHERE id = ? ", [id], function (
    err,
    rows
  ) {
    if (err) {
      return response.send({
        status: 0,
        msg: "Error deleting command",
        raw: request.params,
      });
    }
    return response.send({
      status: 1,
      msg: "Command deleted",
      raw: request.params,
    });
  });
};

/*function commandExists(request, response, next) {
  const { commandname } = request.body;

  connection.query(
    "SELECT EXISTS(select 1 from commands WHERE commandname LIKE " +
      commandname +
      ")",
    function (err, results, fields) {
      if (results != null) {
        return response
          .status(400)
          .send("Command with that name already exists");
      }
      console.log(results);
    }
  );
  return next();
}*/
