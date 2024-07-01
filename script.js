const express =require('express');
const fs =require('fs');
const app =express();
const path =require('path');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    fs.readdir("./files",function(err,files){
        if(err){
            console.log(err);
        }
        else{
            console.log(files ); 
             //[] returns array of files
             res.render("index",{files:files});
        }
    })

})
app.post("/create",function(req,res){
  fs.writeFile(`./files/${req.body.name.split(' ').join('')}.txt`,req.body.details,function(err){
    if(err){
        console.log(err);
    }
  }); 
  res.redirect('/');
});
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        res.render("more_data",{data:data,file_name:req.params.filename});
        }
    })
})

app.get('/edit/:filename',function(req,res){
    res.render("edit.ejs",{pre:req.params.filename});
})
app.post('/editname',function(req,res){
    console.log(req.body.previous);
    console.log(req.body.new);
fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,function(err){
    if(err){
        console.log(err);
        console.log('bsdk');
        res.send("error ");
    }
    else{
        res.redirect('/');
    }

});
});

app.listen(3000);