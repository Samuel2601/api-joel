'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Municipio2024';

exports.auth = function(req,res,next){
    console.log("Solicitud:",req.headers);
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeadersError'});
    }
    if(req.headers.authorization!='ciudadano'){
        var token = req.headers.authorization.replace(/['"]+/g,'');

        var segment = token.split('.');
        if(segment.length != 3){
            return res.status(403).send({message: 'InvalidToken'});
        }else{
            try {
                var payload = jwt.decode(token,secret);
                
                if(payload.exp <= moment().unix()){
                    return res.status(403).send({message: 'TokenExpirado'});
                }
    
            } catch (error) {
                //console.log(error);
                return res.status(403).send({message: 'InvalidToken'});
            }
        }
       // console.log(payload);
        req.user = payload;
    }else{
        req.user='ciudadano';
    }
    

    next();

}