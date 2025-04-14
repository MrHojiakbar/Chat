import express from "express";
import {join} from "node:path"
import { engine } from "express-handlebars";


const app=express()

app.use('/bootstrap', express.static(join(process.cwd(), 'node_modules/bootstrap/dist')));
app.use(express.static(join(process.cwd(),"js")));

app.engine("handlebars", engine({
    defaultLayout: false
}));
  
app.set("view engine","handlebars")
app.set("views",join(process.cwd(),"views"))


app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/page/:pageName',(req,res)=>{
    const {pageName}=req.params
    res.render(pageName)
})

app.listen(5000,()=>{
    console.log("frontend runing on 5000 port");
    
})