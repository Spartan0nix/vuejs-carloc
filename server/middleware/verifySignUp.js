const dbQuery = require('../config/dbQuery');
const ROLES = require('../config/config').ROLES;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    if(username) {
        const getDuplicateUsernameQuery = `SELECT iduser FROM USERS WHERE username = $1`;
        let values = [username];
        let getDuplicateUsername = await dbQuery.query(getDuplicateUsernameQuery, values)
            if(getDuplicateUsername.length >= 1){
                res.status(400).send("Nom d'utilisateur déjà pris");
                return;
            }
        
    }
    
    if(email) {
        const getDuplicateEmailQuery = `SELECT iduser FROM USERS WHERE mail = $1`;
        let values = [email];
        let getDuplicateEmail = await dbQuery.query(getDuplicateEmailQuery, values);
        if(getDuplicateEmail.length >= 1) {
            res.status(400).send("Adresse Email déjà utilisée");
            return;
        }
    }
    next();
}

checkRolesExisted = (req, res, next) => {
    for(let i=0; i < req.body.roles.length; i++){
        if(!ROLES.includes(req.body.roles[i].toUpperCase())){
            res.status(400).send("Erreur, ce rôle n'existe pas : "+ req.body.roles[i]);
            return;
        }
    }
    next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;