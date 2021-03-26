window.onload=function(){
    setEcharts();
}

//图表说明,偏移量
function setChartsLocation(){
    let dom_div = document.getElementsByClassName("title_box");
    Array.prototype.forEach.call(dom_div,function(ele,index){
        let dom_p = ele.getElementsByTagName("p");
        Array.prototype.forEach.call(dom_p,function(elem,index1){
            let x = 0;
            let y = 0;
            switch(index1){
                case 0:
                    x='56px';y=0;break;
                case 1:
                    x='128px';y='25px';break;
                case 2:
                    x='128px';y='135px';break;
                case 3:
                    x='56px';y='160px';break;
                case 4:
                    x='-20px';y='135px';break;
                case 5:
                    x='-20px';y='25px';break;
            }
            elem.style.marginLeft=x;
            elem.style.marginTop=y;
        })
    })
}

//跳转到个人页面
function cardClick(e){
    let dom_result;
    for(var dom_div = e.target;true;dom_div = dom_div.parentNode){
        dom_result = dom_div;
        if(dom_div.className=="p_card") break;
    }
    let ID = dom_result.id.split(":")[1];
    window.location.href='/goodperson/'+ID;
}


//赋值 
function setEcharts(){
    let dom_echarts = document.getElementsByClassName("echarts_box");
    $.post("/getdata/getShortScore",function(res){
        if(res.msg){
            let idShortScore = res.result;
            Array.prototype.forEach.call(dom_echarts,function(ele,index){
                var myChart = echarts.init(ele);
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        data: ['' ]
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#fff',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        radius:70,//图的实际大小
                        //startAngle: 50,//角度
                        //splitNumber: 4,//分割层次
                        indicator: [
                            { name: '标书技能', max: 10},
                            { name: '方案技能', max: 10},
                            { name: '调优技能', max: 10},
                            { name: '办公技能', max: 10},
                            { name: '软件技能', max: 10},
                            { name: '竞品分析', max: 10}
                        ]
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        data: [
                            {
                                value:idShortScore[ele.id],
                                name: ''
                            },
                        ]
                    }]
                };
                myChart.setOption(option);
                setChartsLocation();    
            })
        }
    })

}