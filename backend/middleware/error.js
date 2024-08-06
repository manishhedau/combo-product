module.exports = function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    isSuccess: false,
    message: `Something went wrong!`,
    errorMessage: err.message,
  });
};
