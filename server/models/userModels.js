const dbQuery = require('../config/dbQuery');
const config = require('../config/config');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    //Save User to database

    const createUserQuerry = `INSERT INTO USERS(first_name, last_name, username, password, mail)
                              VALUES($1,$2,$3,$4,$5)
                              RETURNING iduser`;
    const createRole = `INSERT INTO USER_ROLES(idrefuser, idrefrole)
                        VALUES($1,$2)`;
    let body = req.body;
    let values = [
        body.firstname, 
        body.lastname, 
        body.username, 
        bcrypt.hashSync(body.password, 8),
        body.email
    ]
    try {
        let results = await dbQuery.query(createUserQuerry, values);

        const iduser = results.rows[0].iduser;
        let idrole = 0;

        for(let i=0; i < body.roles.length; i++){
            if(body.roles[i].toUpperCase() === "UTILISATEUR"){idrole = 1}
            else if(body.roles[i].toUpperCase() === "ADMIN"){idrole = 2}
            else if(body.roles[i].toUpperCase() === "MODERATEUR"){idrole = 3}

            let idvalues = [iduser, idrole];

            await dbQuery.query(createRole, idvalues);
        }

        res.status(200).send("Utilisateur enregistré avec succés");
    }
    catch(error) {
        res.status(500).send("Erreur : "+ error);
    }
}

exports.signin = async (req, res) => {
    const getUserQuerry = 'SELECT iduser,username,password FROM USERS WHERE username = $1';
    let values = [req.body.username];

    await dbQuery.query(getUserQuerry , values)
    .then(user => {
        if(!user.rows){
            return res.status(404).send('Aucun utilisateur trouvée');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.rows[0].password);
        if(!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: 'Mot de passe non valide'});
        }

        var token = jwt.sign({ id: user.rows[0].iduser }, config.secret, {
            expiresIn: 86400 //expires in 24 hours
        });

        res.status(200).send({ auth: true, accessToken: token });
        // res.status(200).send(user.rows[0].iduser);
    })
    .catch(err => {
        res.status(500).send('Erreur : ' + err);
    });

}

exports.userContent = async (req, res) => {
    const getUserQuery = `SELECT iduser, username, mail, last_name, first_name, idrefrole, role_name
                        FROM USERS
                        INNER JOIN USER_ROLES ON idrefuser = iduser
                        INNER JOIN ROLES ON idrefrole = idrole
                        WHERE iduser = $1 AND idrefrole = 1`;
    let values = [req.iduser];

    await dbQuery.query(getUserQuery, values)
    .then(user => {
        res.status(200).json({
            "description": "User content Page",
            "user": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "description": "Impossible d'accéder à la page utilisateur",
            "error": err
        });
    })
}

exports.adminBoard = async (req,res) => {
    const getAdminQuery = `SELECT iduser, username, mail, last_name, first_name, idrefrole, role_name
                        FROM USERS
                        INNER JOIN USER_ROLES ON idrefuser = iduser
                        INNER JOIN ROLES ON idrefrole = idrole
                        WHERE iduser = $1 AND idrefrole = 2`;
    let values = [req.iduser];

    await dbQuery.query(getAdminQuery, values)
    .then(user => {
        res.status(200).json({
            "description": "Admin content Page",
            "user": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "description": "Impossible d'accéder à la page d'administration",
            "error": err
        });
    })
}

exports.managementBoard = async (req, res) => {
    const getModOrAdminQuery = `SELECT iduser, username, mail, last_name, first_name, idrefrole, role_name
                                FROM USERS
                                INNER JOIN USER_ROLES ON idrefuser = iduser
                                INNER JOIN ROLES ON idrefrole = idrole
                                WHERE iduser = $1
                                AND (idrefrole = 3 OR idrefrole = 2)`;
    let values = [req.iduser];

    await dbQuery.query(getModOrAdminQuery, values)
    .then(user => {
        res.status(200).json({
            "description": "Management Board",
            "user": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "description": "Impossible d'accéder à la page de gestion",
            "error": err
        });
    })
}

exports.findRole = async (req, res) => {
    const findRole = `SELECT idrefuser, role_name
                    FROM USER_ROLES 
                    INNER JOIN ROLES ON idrefrole = idrole
                    WHERE idrefuser = $1`;

    let value = [req.iduser];

    dbQuery.query(findRole, value)
    .then(user => {
        res.status(200).json({
            "role": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "description": "Aucun(s) role(s) definie(s)",
            "error": err
        });
    })
}

exports.updateUser = async (req, res) => {
    const updateUser = `UPDATE USERS
                        SET first_name = $1,
                            last_name = $2,
                            username = $3,
                            mail = $4
                        WHERE iduser = $5
                        RETURNING first_name,last_name,username,mail`;

    let value = [req.body.first_name, req.body.last_name, req.body.username, req.body.mail, req.iduser];

    dbQuery.query(updateUser, value)
    .then(user => {
        res.status(200).json({
            "message": "Donnée(s) mise(s) à jour(s)",
            "user": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "description": "Votre profil n'a pas pu être mise à jour",
            "err": err
        });
    })
}

exports.changeUserPassword = async (req, res) => {
    const updatePassword = `UPDATE USERS
                            SET password = $1
                            WHERE iduser = $2`;

    let values = [req.body.password, req.iduser];

    dbQuery.query(updatePassword, values)
    .then(user => {
        res.status(200).json({
            "message": "Mot de passe mis à jour",
            "user": user.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "message": "Votre mot de passe n'a pas pu être mis à jour",
            "err": err
        });
    })
}