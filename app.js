const Koa=require("koa");

const path=require("path");

const router=require("./router");

const bodyParser=require("koa-bodyparser");

const app=new Koa();

const static=require("koa-static");

app.use(static(path.join(process.cwd(),"public")));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080,()=>{
    console.log('8080端口已启动')
})