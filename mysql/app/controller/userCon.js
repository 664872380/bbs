const con=require("egg").Controller;

class admin extends con{


    async login(){
        const {ctx}=this;
        ctx.body=await this.ctx.service.userSer.login();
    }


}

module.exports=admin;