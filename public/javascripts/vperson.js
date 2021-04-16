Vue.component('namecard',{
    props:["person"],
    template:"\
    <div class='name_box box'>\
        <div class='img_box'>\
            <img></img>\
        </div>\
        <p>{{person.name}}</p>\
    </div>",
    methods:{
        setSrc:function(){
            this.$el.getElementsByTagName("img")[0].src=this.$props.person.url;
        }
    },
    mounted:function(){
       // this.setSrc();
    },
    watch:{
        person: function(){
            this.$el.getElementsByTagName("img")[0].src='../' + this.$props.person.url
        } 
    }
});

Vue.component('scorecard',{
    template:"\
    <div class='score_box box'>\
    </div>"
});

Vue.component('tag',{
    props:["tag"],
    template:"<span class='tag'>{{tag}}</span>"
});

Vue.component('projectcard',{
    props:["bestone"],
    template:"\
    <div class = 'best_one'>\
        <p class = 'best' >{{bestone.best}}</p> --- \
        <p class = 'best_date'>{{bestone.best_date}}</p>\
    </div>"
});

Vue.component('historycard',{
    props:["record"],
    template:"\
    <div class='history_one'>\
        <p class = 'record' > {{record.record}}</p>\
        <p class = 'record_date' > {{record.date}}</p>\
    </div>"
});


Vue.component('controlbox',{
    template:"\
    <div class='control_box'>\
        <p @click=clicktoshow($event) title='1'>添加tip</p>\
        <p @click=clicktoshow($event) title='2'>添加亮点项目</p>\
        <p @click=clicktoshow($event) title='3'>分数变更</p>\
    </div>\
    ",
    methods:{
        clicktoshow:function(e){
            console.log(e.target.title);
            this.$emit("changeadd",e.target.title);
        }
    }
})

Vue.component('logbutton',{
    template:"\
    <button @click=ismanager>登录</button>",
    methods:{
        ismanager:function(){
            let password = prompt("请输入管理密码：", "");
            if (password == "123456"){
                this.$emit("changetomanager",true);
            }
            else{
                alert("无效的管理密码!");
            }
        }
    }
})

Vue.component('addtip',{
    template:"\
    <div class = 'addtip addItem'>\
        <p class='add_title'>添加标签</p>\
        <hr>\
        <input class='add_input'  placeholder='请输入需要添加的标签'></input>\
        <button class='add_confirm' @click=addtip($event)>确定</button>\
        <button class='add_cancle' @click=closethis($event)>取消</button>\
    </div>",
    methods:{
        closethis:function(e){
            this.$emit("closethis","1")
        },
        addtip:function(e){
            let input1 = e.target.parentNode.getElementsByClassName("add_input")[0].value;
            let id = document.getElementsByClassName("end")[0].id;
            let result = [id,input1];
            this.$emit("addtip",result)
        }
    }
})

Vue.component('addproject',{
    template:"\
    <div class = 'addproject addItem'>\
        <p class='add_title'>添加项目</p>\
        <hr>\
        <input class='add_input' placeholder='请输入添加的项目名称'></input>\
        <p>开始时间</p>\
        <input type='date' value='2021-4-1' class='add_date'/>\
        <p>结束时间</p>\
        <input type='date' value='2021-4-1' class='add_date'/></br>\
        <button class='add_confirm' @click=addproject($event)>确定</button>\
        <button class='add_cancle' @click=closethis($event)>取消</button>\
    </div>",
    methods:{
        closethis:function(e){
            this.$emit("closethis","2")
        },
        addproject:function(e){
            let id = document.getElementsByClassName("end")[0].id;
            let input1 = e.target.parentNode.getElementsByClassName("add_input")[0].value;
            let date1 = e.target.parentNode.getElementsByClassName("add_date")[0].value;
            let date2 = e.target.parentNode.getElementsByClassName("add_date")[1].value;
            let result = [id,input1,date1,date2];
            this.$emit("addproject",result);
        }
    }
})

Vue.component('addchangescore',{
    template:"\
    <div class = 'addchangescore addItem'>\
        <p class='add_title'>添加分数变更</p>\
        <hr>\
        <input class='add_input' placeholder='请输入分数变更原因'></input>\
        <select class='add_select'>\
            <option value='投标文件'>投标文件</option>\
            <option value='技术参数、评分办法'>技术参数、评分办法</option>\
            <option value='常见系统解决方案'>常见系统解决方案</option>\
            <option value='交通组织优化方案'>交通组织优化方案</option>\
            <option value='交通组织优化方案'>交通组织优化方案</option>\
            <option value='指挥中心建设方案'>指挥中心建设方案</option>\
            <option value='综合系统平台建设方案'>综合系统平台建设方案</option>\
            <option value='策略性调优'>策略性调优</option>\
            <option value='城市级信号优化方案'>城市级信号优化方案</option>\
            <option value='WORD'>WORD</option>\
            <option value='EXCEL'>EXCEL</option>\
            <option value='PPT'>PPT</option>\
            <option value='PS'>PS</option>\
            <option value='CAD'>CAD</option>\
            <option value='VISSIM'>VISSIM</option>\
            <option value='Synchro'>Synchro</option>\
            <option value='绿波软件'>绿波软件</option>\
            <option value='广联达'>广联达</option>\
            <option value='友商技术参数'>友商技术参数</option>\
            <option value='友商技术方案'>友商技术方案</option>\
        </select></br>\
        <form>\
            <span onClick='clickSpan(event)'><input class = 'add_radio' type='radio' name='jj' value='-2'>-2</span>\
            <span onClick='clickSpan(event)'><input class = 'add_radio' type='radio' name='jj' value='-1'>-1</span>\
            <span onClick='clickSpan(event)'><input class = 'add_radio' type='radio' name='jj' value='0' checked=true>0</span>\
            <span onClick='clickSpan(event)'><input class = 'add_radio' type='radio' name='jj' value='1'>+1</span>\
            <span onClick='clickSpan(event)'><input class = 'add_radio' type='radio' name='jj' value='2'>+2</span>\
        </form>\
        <button class='add_confirm' @click=addscore($event)>确定</button>\
        <button class='add_cancle' @click=closethis($event)>取消</button>\
    </div>",
    methods:{
        closethis:function(e){
            this.$emit("closethis","3")
        },
        addscore:function(e){
            let id = document.getElementsByClassName("end")[0].id;
            let input1 = e.target.parentNode.getElementsByClassName("add_input")[0].value;
            let select1 =  e.target.parentNode.getElementsByClassName("add_select")[0].value;
            let time1 = new Date();
            console.log(time1);
            let radio1 = (function(){
                let dom_radios = e.target.parentNode.getElementsByClassName("add_radio");
                for(let _node in dom_radios){
                    if(dom_radios[_node].checked == true){
                        return parseInt(dom_radios[_node].value);
                    }
                }
                return 0;
            })()
            let result = [id,input1,select1,radio1,time1]
            this.$emit("addscore",result);
        }
    }
})

var app = new Vue({
    el:"#container",
    data:{
        person:{},
        ismanager:false,
        isaddtip:false,
        isaddproject:false,
        isaddchangescore:false
    },
    methods:{
        getSingleData:function(id){
            let thiss = this ;
            $.post('/getdata/single',{id:id},function(res){
                if(res.msg) {
                    thiss.person=res.data;
                }
                else{
                    window.alert(res.data)
                }
            })
        },
        changetomanager:function(_bool){
            this.ismanager = _bool;
        },
        changeAdd:function(index){
            switch(index){
                case "1":{this.isaddtip = true;break;}
                case "2":{this.isaddproject = true;break;}
                case "3":{this.isaddchangescore = true;break;}
            }
        },
        closeThis:function(index){
            switch(index){
                case "1":{this.isaddtip = false;break;}
                case "2":{this.isaddproject = false;break;}
                case "3":{this.isaddchangescore = false;break;}
            }
        },
        addTip:function(data){
            this.person.tags.push(data[1]);
            this.closeThis("1");
            $.post("/getdata/savedata",{mode:0,id:data[0],data:data[1]},(res)=>{
                //console.log(res);
            });
        },
        addProject:function(data){
            this.person.best.push({best:data[1],best_date:data[2]});
            this.closeThis("2")
            $.post("/getdata/savedata",{mode:1,id:data[0],name:data[1],time1:data[2],time2:data[3]},(res)=>{
                //console.log(res);
            });
        },
        addScore:function(data){
            console.log(data);
            this.person.records.push({record:data[1],date:data[4].getFullYear() + "-" + (data[4].getMonth()+1) + "-" + data[4].getDate() + " " + data[4].getHours() + ":" + data[4].getMinutes() + ":" + data[4].getSeconds()});
            this.closeThis("3");
            $.post("/getdata/savedata",{mode:2,id:data[0],item:data[2],score:data[3],date:data[4].getFullYear() + "-" + (data[4].getMonth()+1) + "-" + data[4].getDate() + " " + data[4].getHours() + ":" + data[4].getMinutes() + ":" + data[4].getSeconds(),explain:data[1]},(res)=>{//id,input1,select1,radio1,time1
                //console.log(res);
                setTimeout(function(){
                    setEcharts();
                } , 1000);
            });
        }
    },
    mounted:function(){
        let id = document.getElementsByClassName('end')[0].id;
        this.getSingleData(id);
    }
})