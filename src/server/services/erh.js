const erh = fn => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.log(fn);
    next(error);
  }
};

module.exports = erh;
