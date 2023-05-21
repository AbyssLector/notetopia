import { Jwt } from "jsonwebtoken";
const create_token = (user) => {
    const token = Jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );
    return
}
export default create_token;