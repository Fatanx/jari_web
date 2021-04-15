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
        <select>\
            <option value='0'>投标文件</option>\
            <option value='1'>技术参数、评分办法</option>\
            <option value='2'>常见系统解决方案</option>\
            <option value='3'>交通组织优化方案</option>\
            <option value='4'>交通组织优化方案</option>\
            <option value='5'>指挥中心建设方案</option>\
            <option value='6'>综合系统平台建设方案</option>\
            <option value='7'>策略性调优</option>\
            <option value='8'>城市级信号优化方案</option>\
            <option value='9'>WORD</option>\
            <option value='10'>EXCEL</option>\
            <option value='11'>PPT</option>\
            <option value='12'>PS</option>\
            <option value='13'>CAD</option>\
            <option value='14'>VISSIM</option>\
            <option value='15'>Synchro</option>\
            <option value='16'>绿波软件</option>\
            <option value='17'>广联达</option>\
            <option value='18'>友商技术参数</option>\
            <option value='19'>友商技术方案</option>\
        </select></br>\
        <form>\
            <input class = 'add_radio' type='radio' name='jj' value='b'>-2\
            <input class = 'add_radio' type='radio' name='jj' value='a'>-1\
            <input class = 'add_radio' type='radio' name='jj' value='0'>0\
            <input class = 'add_radio' type='radio' name='jj' value='1'>+1\
            <input class = 'add_radio' type='radio' name='jj' value='2'>+2\
        </form>\
        <button class='add_confirm'>确定</button>\
        <button class='add_cancle' @click=closethis($event)>取消</button>\
    </div>",
    methods:{
        closethis:function(e){
            this.$emit("closethis","3")
        }
    }
})

var app = new Vue({
    el:"#container",
    data:{
        person:[],
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
        },
        addProject:function(data){
            console.log(data);

        },
        addScore:function(){

        }
    },
    mounted:function(){
        let id = document.getElementsByClassName('end')[0].id;
        this.getSingleData(id);
    }
})