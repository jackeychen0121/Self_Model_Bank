import jwt from 'jsonwebtoken';
import config from "./../../../global.config";
import User from "../model/user";

const withAuth = (handler) => {
    return (req, res) => {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: 'No credentials sent!' });
        }
        const token = req.headers.authorization;
        jwt.verify(token.slice(7), config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            return handler(req, res);

        });


    };
};

export default withAuth;