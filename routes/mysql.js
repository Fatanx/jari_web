//const router = require('express').Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '111.231.193.45',
    user     : 'jari',
    password : 'Jari@db01',
    database : 'db_jari'
  });
  connection.connect();

var data = {}
var people = []



function getAllData(){
  //先查询用户列表
  let sql_em = "select * from person";
  //promise 
  let employ=[];
  const prom1 =new Promise(function(resolve,reject) {
    connection.query(sql_em,(err,result)=>{
      if(err) reject(err);
      else {
        result.forEach((element,index) => {
          employ[index] = {name:element.name,id:element.employeeNo};
        });
        resolve(employ);
      }
    })
  });
  prom1.then(employ=>{
    for(var key in employ){
      let person={
        url:"",
        name:"",
        best:[],
        id:"",
        score:[],
        tags:[],
        records:[]
      };
      person.name = employ[key].name;
      person.id = employ[key].id;
      person.url = "./images/" + employ[key].id +".jpg";
      let prom1_1 =new Promise(function(resolve,reject){
        console.log("开始读取project");
        let sql_pro = "select * from project where manager = " + person.id;
        connection.query(sql_pro,(err,result)=>{
          if(err) reject(err);
          else {
            result.forEach((element) => {
              person.best.push({best:element.name,best_date:element.finish_date});
            });
            console.log("读取project成功");
            resolve("ess");
          }
        })
      }) 
      let prom1_2 = new Promise(function(resolve,reject){
        console.log("开始读取tag");
        let sql_tag = "select * from tags where employeeNo = " + person.id;
        connection.query(sql_tag,(err,result)=>{
          if(err) reject(err);
          else {
            result.forEach((element) => {
              person.tags.push(element.tag);
            });
            console.log("读取tag成功");
            resolve("cc");
          }
        })
      }) 
      let prom1_3 = new Promise(function(resolve,reject){
        console.log("开始读取score");
        let sql_sco = "select * from itemscore where employeeNo = " + person.id + " ORDER BY refreshDate" ;
        connection.query(sql_sco,(err,result)=>{
          let score_span = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          if(err) console.log(err);
          else {
            result.forEach((element) => {
              switch(element.item){
                case "投标文件":{score_span[0] += 1;break;}
                case "技术参数、评分办法":{score_span[1] += 1;break;}
                case "常见系统解决方案":{score_span[2] += 1;break;}
                case "交通组织优化方案":{score_span[3] += 1;break;}
                case "指挥中心建设方案":{score_span[4] += 1;break;}
                case "综合系统平台建设方案":{score_span[5] += 1;break;}
                case "基础调优（单个路口优化）":{score_span[6] += 1;break;}
                case "策略性调优":{score_span[7] += 1;break;}
                case "城市级信号优化方案":{score_span[8] += 1;break;}
                case "WORD":{score_span[9] += 1;break;}
                case "EXCEL":{score_span[10] += 1;break;}
                case "PPT":{score_span[11] += 1;break;}
                case "PS":{score_span[12] += 1;break;}
                case "CAD":{score_span[13] += 1;break;}
                case "VISSIM":{score_span[14] += 1;break;}
                case "Synchro":{score_span[15] += 1;break;}
                case "绿波软件":{score_span[16] += 1;break;}
                case "广联达":{score_span[17] += 1;break;}
                case "友商技术参数":{score_span[18] += 1;break;}
                case "友商技术方案":{score_span[19] += 1;break;}
                case "友商调优机制":{score_span[20] += 1;break;}
              }
              person.records.push({record:element.explain,date:element.refreshDate})
            });
            person.score = score_span;
            console.log("读取score成功");
            resolve("su");
          }
        })
      })
      
      Promise.all([prom1_1,prom1_2,prom1_3]).then(function(result){
        people.push (person);
        data=people;
      })
    }
  })


  //原代码 
  /*
  connection.query(sql_em,(err,result)=>{
    if(err) console.log(err);
    else {
      result.forEach((element,index) => {
        employ[index] = {name:element.name,id:element.employeeNo};
      });
      //查询各个数据,组装成person格式
      for(var key in employ){
        let person={
          url:"",
          name:"",
          best:[],
          id:"",
          score:[],
          tags:[],
          records:[]
        };
        person.name = employ[key].name;
        person.id = employ[key].id;
        //查询 project
        let sql_pro = "select * from project where manager = " + person.id;
        connection.query(sql_pro,(err,result)=>{
          if(err) console.log(err);
          else {
            result.forEach((element) => {
              person.best.push({best:element.name,best_date:element.finish_date});
            });
          }
        })
        //查询tag
        let sql_tag = "select * from tags where employeeNo = " + person.id;
        connection.query(sql_tag,(err,result)=>{
          if(err) console.log(err);
          else {
            result.forEach((element) => {
              person.tags.push(element.tag);
            });
          }
        })
        //查询score
        let sql_sco = "select * from itemscore where employeeNo = " + person.id + " ORDER BY refreshDate" ;
        connection.query(sql_sco,(err,result)=>{
          let score_span = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          if(err) console.log(err);
          else {
            result.forEach((element) => {
              switch(element.item){
                case "投标文件":{score_span[0] += 1;}
                case "技术参数、评分办法":{score_span[1] += 1;}
                case "常见系统解决方案":{score_span[2] += 1;}
                case "交通组织优化方案":{score_span[3] += 1;}
                case "指挥中心建设方案":{score_span[4] += 1;}
                case "综合系统平台建设方案":{score_span[5] += 1;}
                case "基础调优（单个路口优化）":{score_span[6] += 1;}
                case "策略性调优":{score_span[7] += 1;}
                case "城市级信号优化方案":{score_span[8] += 1;}
                case "WORD":{score_span[9] += 1;}
                case "EXCEL":{score_span[10] += 1;}
                case "PPT":{score_span[11] += 1;}
                case "PS":{score_span[12] += 1;}
                case "CAD":{score_span[13] += 1;}
                case "VISSIM":{score_span[14] += 1;}
                case "Synchro":{score_span[15] += 1;}
                case "绿波软件":{score_span[16] += 1;}
                case "广联达":{score_span[17] += 1;}
                case "友商技术参数":{score_span[18] += 1;}
                case "友商技术方案":{score_span[19] += 1;}
                case "友商调优机制":{score_span[20] += 1;}
              }
              person.records.push({record:element.explain,date:element.refreshDate})
            });
            person.score = score_span;
            console.log(person);
          }
        })
        //结束查询
        people.push (person);
      }
    }
  })
//*/
}
function init(){
  getAllData();
}
module.exports = {init,people};