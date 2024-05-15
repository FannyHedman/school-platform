// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     console.log('Token (authenticateToken):', token);


//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: 'Forbidden' });
//         }
//         req.userId = decoded.userId; // Extract user ID from token payload
//         next();
//     });
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: 'Forbidden' });
//         }
//         // req.userId = decoded.userId; // Extract user ID from token payload
//         req.user = { userId: decoded.userId };
//         next();
//     });
// };

// module.exports = authenticateToken;


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ felerror: 'Forbidden' });
    }
    // Add this line to set req.user with extracted user ID
    req.user = { userId: decoded.userId };
    next();
  });
};

module.exports = authenticateToken;
