module.exports = {
    secret : "sequelizorm",
    expiresIn : 120,   // by default expiresIn/notbefore in second
    notBefore : 1 ,
    audience : "site-users",
    issuer : "online web tutor",
    algorithm : "HS256",
}