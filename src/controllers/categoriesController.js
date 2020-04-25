exports.get_category = function (request, response) {
  var connection = request.connection;
  const { id } = request.params;

  connection.query(
    "SELECT id, categoryname FROM categories CA,commands C WHERE (Ca.id = C.category) AND CA.id = ? LIMIT 1",
    [id],
    function (err, results, rows) {
      if (err) {
        return response.send({
          status: 0,
          msg: "Error getting categories",
          raw: request.params,
        });
      }
      return response.json(results);
    }
  );
};
