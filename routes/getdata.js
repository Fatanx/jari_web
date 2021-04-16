const router = require('express').Router();
const linkDB = require("./mysql.js");

router.post('/all',function(req,res){
    res.send({people});
})


function getInitPeopleData(){
    /*
    //读取本地文件
    console.log("获取数据文件中..");
    let j = require("./data.json")
    console.log("成功读取到文件");
    console.log("刷新文件数据.");
    people = j.people;
    //*/


    //*
    //读取数据库文件
    linkDB.init();
    setTimeout(function(){
        people = linkDB.people;
        console.log("读取完成");
    } , 1000);
    //*/
}

var people = [{
    url:"",
    name:"",
    best:[],
    id:"",
    score:[],
    tags:[],
    records:[]
}]




router.post('/single',function(req,res){
    let id = req.body.id;
    let result;
    for(index in people){
        if(people[index].id == id){
            result = people[index];
        }
    }
    result?res.send({msg:true,data:result}):res.send({msg:false,data:"wrong id and refresh you web!"});
})

router.post('/singleBest',function(req,res){
    let id = req.body.id;
    let result0;
    let result1;
    for(index in people){
        if(people[index].id == id){
            result0 = people[index].best;
            result1 = people[index].best_date;
        }
    }
    result0&&result1?res.send({msg:true,data:result0,date:result1}):send({msg:false,date:"empty data , please check your web address!"});
})

router.post('/singleScore',function(req,res){
    let id = req.body.id;
    let result=[];
    let _arr = ['投标文件','技术参数、评分办法','常见系统解决方案','交通组织优化方案','指挥中心建设方案','综合系统平台建设方案','基础调优（单个路口优化）','策略性调优','城市级信号优化方案','WORD','EXCEL','PPT','PS','CAD','VISSIM','Synchro','绿波软件','广联达','友商技术参数','友商技术方案','友商调优机制']
    for(index in people){
        if(people[index].id == id){
            for(let i = 0 ; i < people[index].score.length ; i ++){
                let name = _arr[i];
                let type = 'bar';
                let stack = 'total';
                let lable = {show:true};
                let emphasis = {focus:'series'};
                let data = [];
                if(i < 2) data = [people[index].score[i],0,0,0,0,0];
                else if(i < 6) data =  [0,people[index].score[i],0,0,0,0];
                else if(i < 9) data = [0,0,people[index].score[i],0,0,0];
                else if(i < 13) data = [0,0,0,people[index].score[i],0,0];
                else if(i < 18) data = [0,0,0,0,people[index].score[i],0];
                else data = [0,0,0,0,0,people[index].score[i]];
                let obj ={
                    name:name,
                    type:type,
                    stack:stack,
                    lable:lable,
                    emphasis:emphasis,
                    data:data
                };
                result.push(obj);
            }
        }
    }
    res.send({msg:true,result:result});
})

router.post('/getShortScore',function(req,res){
    let id = req.body.id;
    let result={};
    for(index in people){
        let _score = [];
        _score.push(people[index].score[0] + people[index].score[1]);
        _score.push(people[index].score[2] + people[index].score[3] + people[index].score[4] + people[index].score[5]);
        _score.push(people[index].score[6] + people[index].score[7] + people[index].score[8]);
        _score.push(people[index].score[9] + people[index].score[10] + people[index].score[11] + people[index].score[12]);
        _score.push(people[index].score[13] + people[index].score[14] + people[index].score[15] + people[index].score[16] + people[index].score[17]);
        _score.push(people[index].score[18] + people[index].score[19] + people[index].score[20]);
        result[people[index].id]=_score;
    }
    res.send({msg:true,result:result});
})

router.post('/savedata',function(req,res){
    let message = req.body;
    let mode = message.mode;
    let id = message.id;
    let _sql ;
    switch (mode){
        case "0":{
            let data = message.data;
            _sql="insert into tags (employeeNo,tag) value ('" + id + "'," + data + ")";
            break;
        };
        case "1":{
            let name = message.name;
            let date1 = message.time1;
            let date2 = message.time2;
            _sql="insert into project (name,start_date,finish_date,manager) value ('" + name + "','" + date1 +  "','" + date2 +  "','" + id + "')";
            break;
        };
        case "2":{
            //mode:2,id,item,score,date,explain
            let item = message.item;
            let itemScore = parseInt(message.score);
            let refreshDate = message.date;
            let explain = message.explain;
            _sql="insert into itemscore (employeeNo,item,itemScore,refreshDate,`explain`) value ('"+ id +"','"+ item +"',"+ itemScore +",'"+ refreshDate +"','"+ explain +"')";
            break;
        };
    };
    const prom1 =new Promise(function(resolve,reject) {
        linkDB.connection.query(_sql,(err,result)=>{
        if(err) reject(err);
        else {
            linkDB.init();
            resolve(result);
        };
        })
    });
    prom1.then(function(){
        res.send({msg:true})
    },function(err){
        console.log(err);
        res.send({msg:false,err:err})
    })
})

//router.post('')
/*
目前来说,个人基本信息走vue   分数等数据走js
*/
getInitPeopleData();
module.exports = router;