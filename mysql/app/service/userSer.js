const ser=require("egg").Service;
const path = require("path");
const fs = require("fs");



class admin extends ser{

    
    async login(){
        let result=await this.app.mysql.query(`select * from users`);
        return result;    
    }




    
}

module.exports=admin;