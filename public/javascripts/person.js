window.onload= function(){
    setEcharts();
    //setBest();
}

function setBest(){
    let dom_best =document.getElementsByClassName("project_box")[0];
    let id = document.getElementsByClassName('end')[0].id;
    $.post("/getdata/singleBest",{id:id},function(res){
        if(res.msg!=false){
            let data = res.data;
            let date = res.date;
            for(let i = 0 ; i < data.length;i++) {
                let _test = "<div><p class = 'best_title'> " + data[i] + "</p><p class = 'best_date'>"+ date[i] +"</p></div>";
                dom_best.innerHTML = dom_best.innerHTML + _test ;
            };
            //dom_best.innerHTML =dom_best.innerHTML + "<div style='clear:all'></div>";
        }
    })
}


//赋值 - 后期删除
function setEcharts(){
    let dom_echart = document.getElementsByClassName("score_box")[0];
    var myChart = echarts.init(dom_echart);
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            data: ['投标文件','技术参数、评分办法','常见系统解决方案','交通组织优化方案','指挥中心建设方案','综合系统平台建设方案','基础调优（单个路口优化）','策略性调优','城市级信号优化方案','WORD','EXCEL','PPT','PS','CAD','VISSIM','Synchro','绿波软件','广联达','友商技术参数','友商技术方案','友商调优机制'],
            type:'scroll',
            textStyle:{
                fontSize:12
            }
        },
        tooltip:{
            formatter:'{b0}-{a0}: {c0} '
        },
        textStyle:{
            fontSize:0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['标书技能','方案技能','调优技能','办公技能','软件技能','竞品分析']
        },
        series: []
    }
    let id = document.getElementsByClassName('end')[0].id;
    $.post('/getdata/singleScore',{id:id},function(res){
        if(res.msg) {
            option.series = res.result;
            myChart.setOption(option);
        }
        else ;
    })
}

function clickSpan(e){
    if(e.target.getElementsByClassName("add_radio")[0]){e.target.getElementsByClassName("add_radio")[0].checked = true;}
}



