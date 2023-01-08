const root = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Success fetching the API!",
  });
};

module.exports = {
  root,
};
