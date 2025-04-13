import express from "express";
import {join} from "node:path"

const app=express()

app.use('/bootstrap', express.static(join(process.cwd(), 'node_modules/bootstrap/dist')));
app.use(express.static(join(process.cwd(),"js")));

app.get('/',(req,res)=>{
    res.sendFile(join(process.cwd(),"index.html"))
})
app.get('/page/:pageName',(req,res)=>{
    const {pageName}=req.params
    res.sendFile(join(process.cwd(),"pages",`${pageName}.html`))
})

app.listen(5000,()=>{
    console.log("frontend runing on 5000 port");
    
})