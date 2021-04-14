const router = require('express').Router();
const MySQL = require

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

    //读取数据库
    // console.log("尝试连接数据库");
    // let getDataFromSql = new Promise(function(resolve,reject){
    //     console.log(123321);
    //     let jj = require("./mysql.js");
    //     console.log(11233123);
    //     resolve();
    // })
    // getDataFromSql.then(data=>{
    //     console.log(data);
    //     people = data.people;
    //     console.log("读取完成",people);
    // })

    setTimeout(getdata, 10000, 'funky');
    function getdata(){
        let jj = require("./mysql.js");
        people = jj.people;
        console.log("读取完成",people);
    }


}

var people = [{
    url:'',
    name:'',
    best:[],
    best_date:[],
    id:'',
    score:[],
    tags:[],
    records:[{
        record:"",
        date:""
    }]
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


//router.post('')
/*
目前来说,个人基本信息走vue   分数等数据走js

*/
getInitPeopleData();
module.exports = router;