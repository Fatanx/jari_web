Vue.component('namecard',{
    props:["person"],
    template:"<div class='name_box box'>\
        <div class='img_box'>\
            <img></img>\
        </div>\
        <p>{{person.name}}</p>\
    </div>",
    methods:{
        setSrc:function(){
            console.log(this.$props.person);
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
    template:"<div class='score_box box'>\
    </div>"
});

Vue.component('projectcard',{
    props:["person"],
    template:"<div>\
        <p></p>\
        <p></p>\
    </div>"
});

Vue.component('historycard',{
    template:"<div class='history_box box'></div>"
});

var app = new Vue({
    el:"#container",
    data:{
        person:[{111:222}]
    },
    methods:{
        getSingleData:function(id){
            let thiss = this ;
            $.post('/getdata/single',{id:id},function(res){
                if(res.msg) {
                    thiss.person=res.data;
                    console.log(thiss.person);
                    //thiss.$refs.showimg.setSrc();
                }
                else{
                    window.alert(res.data)
                }
            })
        }
    },
    mounted:function(){
        let id = document.getElementsByClassName('end')[0].id;
        this.getSingleData(id);
    }
})