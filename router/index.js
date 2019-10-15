let router=require("koa-router")();

const query=require("../db/query");

router.get("/api/userlist",async ctx=>{
    let data = await query('select * from mumber');
    ctx.body=data.data;
})

router.post("/api/add",async ctx=>{
    let {name,age,phone,sex,address,idCard}=ctx.request.body;

    let sql="insert into mumber (name,age,phone,sex,address,idCard) values (?,?,?,?,?,?)";

    if(!name || !age || !phone || !sex || !address || !idCard){
        return ctx.body={code:2,msg:"缺少参数"}
    }

    let isHas=await query("select * from mumber where idCard=?",[idCard])

    if(isHas.data.length){
        return ctx.body={code:3,msg:"该用户已存在"}
    }else{
        let data=await query(sql,[name,age,phone,sex,address,idCard]);

        if(data.msg==="success"){
            ctx.body={code:1,msg:"添加成功"};
        }else{
            ctx.body={code:0,msg:"添加失败"};
        }
    }
})

router.get("/api/del",async ctx=>{
    let {id}=ctx.request.query;
    let sql="delete from mumber where id=?"

    let res=await query(sql,[id])

    if(res.msg==="success"){
        ctx.body={code:1,msg:"删除成功"};
    }else{
        ctx.body={code:0,msg:"删除失败"};
    }
})

router.post("/api/updata",async ctx=>{
    let {name,age,phone,sex,address,idCard,id}=ctx.request.body;
    let sql="update mumber set name=?,age=?,phone=?,address=?,idCard=?,sex=? where id=?"

    if(!name || !age || !phone || !sex || !address || !idCard || !id){
        return ctx.body={code:2,msg:"缺少参数"}
    }

    console.log(name,age,phone,address,idCard,sex,id)
    let res=await query(sql,[name,age,phone,address,idCard,sex,id])
    if(res.msg==="success"){
        ctx.body={code:1,msg:"修改成功"};
    }else{
        ctx.body={code:0,msg:"修改失败"};
    }
})

module.exports=router;