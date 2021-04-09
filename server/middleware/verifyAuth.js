const jwt = require('jsonwebtoken');
const dbQuery = require('../config/dbQuery');
const config = require('../config/config');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            auth: false, message: 'No token provided'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(500).send({
                auth: false,
                message: "Erreur d'authentification : " + err
            });
        }
        req.iduser = decoded.id;
        next();
    });
}

isAdmin = (req, res, next) => {
    let findUser = `SELECT idrefuser 
                    FROM USER_ROLES
                    WHERE idrefrole = 2
                    AND idrefuser = $1`;

    let value = [req.iduser];
     
    dbQuery.query(findUser, value)
    .then( user => {
        if(user && user.rows.length === 1){
            next();
            return;
        }
        res.status(403).send("Accés non-autorisé");
        return;
    })
}

isModOrAdmin = (req, res, next) => {
    let findAdminOrMode =  `SELECT idrefuser 
                            FROM USER_ROLES 
                            WHERE idrefuser = $1
                            AND (idrefrole = 2 OR idrefrole = 3)`;

    let value = [req.iduser];

    dbQuery.query(findAdminOrMode, value)
    .then( user => {
        if(user && user.rows.length === 1){
            next();
            return;
        }
        res.status(403).send("Accés non-autorisé");
        return;
    })
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isModOrAdmin = isModOrAdmin;

module.exports = authJwt;