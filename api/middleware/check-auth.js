const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // default middleware pattern
  // verify does decode and verify, and return decoded value
  // token, private/public key, options, callback
  // console.log(req.headers);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded; // add new field to request
    next(); // call next if succeeded
  } catch (err) {
    // console.log(err);
    res.status(401).json({ error: err });
  }

};
