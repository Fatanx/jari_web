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
                <h6>{{person.best[0].best}}</h6>\
                <h6>{{person.best[1].best}}</h6>\
                <div class='echarts_box'>\</div>\
                <div class='title_box'>\
                    <p>标书技能</p> <p>方案技能</p> <p>调优技能</p> <p>办公技能</p> <p>软件技能</p> <p>竞品分析</p>\
                </div>\
            </div>\
        </div>",
    methods: {
        setSrc:function(){
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
        people:[]
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