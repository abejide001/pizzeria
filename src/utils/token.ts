const jwt = require("jsonwebtoken");

const jwtSign = (user: any) => {
  const { email, role, id } = user;
  const token = jwt.sign({ id, role, email }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export default jwtSign;