let router=require("koa-router")();

const query=require("../db/query")

router.get("/api/userlist",async ctx=>{
    let data = await query('select * from mumber')
    ctx.body=data;
})

module.exports=router;