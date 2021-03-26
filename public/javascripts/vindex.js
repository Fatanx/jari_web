Vue.component('personalcard',{
    props:["person"],
    template:"\
        <div class='p_card' onclick=cardClick(event)>\
            <div class='p_card_base'>\
                <div class='img_box'>\
                    <img></img>\
                </div>\
                <p>{{person.name}}</p>\
            </div>\
            <div class='p_card_introduce'>\
                <h5>{{person.best[0]}}</h5>\
                <h5>{{person.best[1]}}</h5>\
                <div class='echarts_box'>\</div>\
                <div class='title_box'>\
                    <p>标书技能</p> <p>方案技能</p> <p>调优技能</p> <p>办公技能</p> <p>软件技能</p> <p>竞品分析</p>\
                </div>\
            </div>\
        </div>",
    methods: {
        setSrc:function(){
            //console.log(this.$el.getElementsByTagName("img")[0]);
            //console.log(this.$props.person.url);
            this.$el.getElementsByTagName("img")[0].src=this.$props.person.url;
            this.$el.getElementsByClassName("echarts_box")[0].id=this.$props.person.id;
            this.$el.id="ID:" + this.$props.person.id;
        }
    },
    mounted:function(){
        this.setSrc();
    },
});

var app = new Vue({
    el:"#container",
    data:{
        people:[]/*{
            url:'./images/1.jpeg',
            name:'张三',
            best:["武汉天河机场跑道指示灯","绿地中心外立面照明系统"],
            best_date:['2020-2-1','2020-7-3'],
            id:'00001'
        },{
            url:'./images/2.jpeg',
            name:'李四',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00002'
        },{
            url:'./images/黄佳梦.jpg',
            name:'黄佳梦',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00003'
        },{
            url:'./images/廖胜华.jpg',
            name:'廖胜华',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00004'
        },{
            url:'./images/汤明锐.jpg',
            name:'汤明锐',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00005'
        },{
            url:'./images/谢永芃.jpg',
            name:'谢永芃',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00006'
        },{
            url:'./images/熊湖川.jpg',
            name:'熊湖川',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00007'
        },{
            url:'./images/由皓楠.jpg',
            name:'由皓楠',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00008'
        },{
            url:'./images/张佳星.jpg',
            name:'张佳星',
            best:["长江湖北段航道指示系统","想不出什么牛鼻名字的系统"],
            best_date:['2020-1-30','2020-4-5'],
            id:'00009'
        }]*/
    },
    methods:{
        getAllData:function(){
            let thiss = this;
            $.post("/getdata/all",function(res){
                thiss.people = res.people;
            })
        }
    },
    mounted:function(){
        this.getAllData();
    }
});