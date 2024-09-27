import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = (user: any) => {
    const accessToken = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      "access-token-secret",
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      "refresh-token-secret",
      {
        expiresIn: "30d",
      }
    );

    return { accessToken, refreshToken };
  };

  export { generateAccessAndRefreshTokens}