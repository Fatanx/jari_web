const router = require('express').Router();

router.post('/all',function(req,res){
    res.send({people})
})


var people = [{
        url:'./images/1.jpeg',
        name:'张三',
        best:["武汉天河机场跑道指示灯","绿地中心外立面照明系统"],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00001',
        score:[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0],
        tag:[]
    },{
        url:'./images/2.jpeg',
        name:'李四',
        best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00002',
        score:[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0],
        tag:[]
    },{
        url:'./images/黄佳梦.jpg',
        name:'黄佳梦',
        best:['杰瑞车载特勤方案','赛文交通汇报ppt，检测器分类及发展史','杰瑞智能交通一体化解决方案ppt','西安十四运信号灯智能化改造项目深化设计'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00003',
        score:[1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
        tag:[]
    },{
        url:'./images/廖胜华.jpg',
        name:'廖胜华',
        best:['荆州市高点监控建设方案','应城市严管示范路方案、应城大货车禁行标志设计','应城曹大立交路口优化方案','荆州市公安局交通管理局中心城区信号优化服务项目'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00004',
        score:[1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,0,0],
        tag:[]
    },{
        url:'./images/汤明锐.jpg',
        name:'汤明锐',
        best:['莲湖区西门外渠化组织设计','擂台赛ppt编制','20条绿波方案设计','西安市公安局交通警察支队西安十四运信号灯智能化改造项'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00005',
        score:[1,0,1,1,0,0,1,1,0,1,1,1,0,0,0,0,1,0,1,0,0],
        tag:[]
    },{
        url:'./images/谢永芃.jpg',
        name:'谢永芃',
        best:['擂台赛ppt编制','20条绿波方案设计','西安市公安局交通警察支队西安十四运信号灯智能化改造项目','2021年开化县公安局交警大队信号灯和电子警察新建及升级改造采购项目'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00006',
        score:[1,1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,1,0,0,0],
        tag:[]
    },{
        url:'./images/熊湖川.jpg',
        name:'熊湖川',
        best:['孝感信号调优和亮点宣传','临空物流园交通研究报告反馈意见','应城曹大立交路口优化方案','交警支队交通系统等设备及附属设施运行维护采购项目'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00007',
        score:[1,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0],
        tag:[]
    },{
        url:'./images/由皓楠.jpg',
        name:'由皓楠',
        best:['开化行人闯红灯自动检测系统解决方案','孝感高速公路区间测速建设方案','孝感信号调优和亮点宣传','槐荫大道综合改造项目'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00008',
        score:[1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0,1,1,0,0,0],
        tag:[]
    },{
        url:'./images/张佳星.jpg',
        name:'张佳星',
        best:['若干项目施工图纸审查','西安市无障碍设施建设与改造提升工作督导检查考核方案','十四运交通安全、涉赛车队信号灯保障工作方案','2021年开化县公安局交警大队信号灯和电子警察新建及升级改造采购项目'],
        best_date:['2020-2-1','2020-7-3','2020-1-30','2020-4-5'],
        id:'00009',
        score:[1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0],
        tag:[]
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
    console.log(result);
    res.send({msg:true,result:result});
})


//router.post('')
/*
目前来说,个人基本信息走vue   分数 项目 等数据走js

*/

module.exports = router;