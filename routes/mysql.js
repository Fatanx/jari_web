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
              person.best.push({best:element.name,best_date:formatDate("date",element.finish_date)});
            });
            console.log("读取project成功");
            resolve("ess");
          }
        })
      }) 
      let prom1_2 = new Promise(function(resolve,reject){
        console.log("开始读取tag");
        let sql_tag = "select * from tags where employeeNo = '" + person.id + "'";
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
                case "投标文件":{score_span[0]= score_span[0] +element.itemScore;break;}
                case "技术参数、评分办法":{score_span[1]= score_span[1] +element.itemScore;break;}
                case "常见系统解决方案":{score_span[2]= score_span[2] +element.itemScore;break;}
                case "交通组织优化方案":{score_span[3]= score_span[3] +element.itemScore;break;}
                case "指挥中心建设方案":{score_span[4]= score_span[4] +element.itemScore;break;}
                case "综合系统平台建设方案":{score_span[5]= score_span[5] +element.itemScore;break;}
                case "基础调优（单个路口优化）":{score_span[6]= score_span[6] +element.itemScore;break;}
                case "策略性调优":{score_span[7]= score_span[7] +element.itemScore;break;}
                case "城市级信号优化方案":{score_span[8]= score_span[8] +element.itemScore;break;}
                case "WORD":{score_span[9]= score_span[9] +element.itemScore;break;}
                case "EXCEL":{score_span[10]= score_span[10] +element.itemScore;break;}
                case "PPT":{score_span[11]= score_span[11] +element.itemScore;break;}
                case "PS":{score_span[12]= score_span[12] +element.itemScore;break;}
                case "CAD":{score_span[13]= score_span[13] +element.itemScore;break;}
                case "VISSIM":{score_span[14]= score_span[14] +element.itemScore;break;}
                case "Synchro":{score_span[15]= score_span[15] +element.itemScore;break;}
                case "绿波软件":{score_span[16]= score_span[16] +element.itemScore;break;}
                case "广联达":{score_span[17]= score_span[17] +element.itemScore;break;}
                case "友商技术参数":{score_span[18]= score_span[18] +element.itemScore;break;}
                case "友商技术方案":{score_span[19]= score_span[19] +element.itemScore;break;}
                case "友商调优机制":{score_span[20]= score_span[20] +element.itemScore;break;}
              }
              person.records.push({record:element.explain,date:formatDate("datetime",element.refreshDate)})
            });
            person.score = score_span;
            console.log("读取score成功");
            resolve("su");
          }
        })
      })
      
      Promise.all([prom1_1,prom1_2,prom1_3]).then(function(result){
        if(people.length != 0){
          for(let ele in people){
            if(people[ele].id == person.id ){
              console.log(2);
              people[ele] = person;
            }
            else{
              people.push (person);
            }
          }
        }
        else{
          people.push (person);
        }
      })
    }
  })
}



function init(){
  getAllData();
}

function formatDate(mode = "datetime",dateTime){
  let resultDT ;
  let dt = new Date(dateTime);
  switch(mode){
    case "date":{
      resultDT = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
      break;
    };
    case "datetime":{
      resultDT = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      break;
    }
  }

  return resultDT;
}

function saveData(data){
}

//报废代码
function bfdm(){
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
                case "投标文件":{score_span[0]= score_span[0] +element.itemScore;}
                case "技术参数、评分办法":{score_span[1]= score_span[0] +element.itemScore;}
                case "常见系统解决方案":{score_span[2]= score_span[0] +element.itemScore;}
                case "交通组织优化方案":{score_span[3]= score_span[0] +element.itemScore;}
                case "指挥中心建设方案":{score_span[4]= score_span[0] +element.itemScore;}
                case "综合系统平台建设方案":{score_span[5]= score_span[0] +element.itemScore;}
                case "基础调优（单个路口优化）":{score_span[6]= score_span[0] +element.itemScore;}
                case "策略性调优":{score_span[7]= score_span[0] +element.itemScore;}
                case "城市级信号优化方案":{score_span[8]= score_span[0] +element.itemScore;}
                case "WORD":{score_span[9]= score_span[0] +element.itemScore;}
                case "EXCEL":{score_span[10]= score_span[0] +element.itemScore;}
                case "PPT":{score_span[11]= score_span[0] +element.itemScore;}
                case "PS":{score_span[12]= score_span[0] +element.itemScore;}
                case "CAD":{score_span[13]= score_span[0] +element.itemScore;}
                case "VISSIM":{score_span[14]= score_span[0] +element.itemScore;}
                case "Synchro":{score_span[15]= score_span[0] +element.itemScore;}
                case "绿波软件":{score_span[16]= score_span[0] +element.itemScore;}
                case "广联达":{score_span[17]= score_span[0] +element.itemScore;}
                case "友商技术参数":{score_span[18]= score_span[0] +element.itemScore;}
                case "友商技术方案":{score_span[19]= score_span[0] +element.itemScore;}
                case "友商调优机制":{score_span[20]= score_span[0] +element.itemScore;}
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

module.exports = {init,people,connection};