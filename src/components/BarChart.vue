<script setup>
import {ref, reactive, onMounted} from 'vue';

var chartOptions = reactive({
    chart: {
        type: 'bar',
        height: 200,
        stacked: true,
        toolbar: {
            show: true,
        },
        zoom: {
            enabled: true,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded',
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: [ ],
    },
    yaxis: {
        title: {
            text: 'Počet známok',
        },
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                return val;
            },
        },
    },
})
var series = reactive([])
const chart = ref(null);
onMounted(() => {
    fetch('https://webte1.fei.stuba.sk/~xkyseld/graface/z03.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const years = xml.getElementsByTagName('rok');
        const evaluation = xml.getElementsByTagName('hodnotenie');
        var xmlSeries = [];
        for (let i = 0; i < years.length; i++) {
            chartOptions.xaxis.categories.push(years[i].innerHTML);
        }
        for(let j = 0; j < evaluation[0].childElementCount; j++){
            var grade = {
                name: evaluation[0].children[j].localName,
                data: []
            }
            xmlSeries.push(grade);
        }
        for(let i = 0; i < evaluation.length; i++){
            for(let j = 0; j < evaluation[i].childElementCount; j++){
                xmlSeries[j].data.push(evaluation[i].children[j].innerHTML);
            }
        }

        series = xmlSeries;
        chart.value.updateSeries(series);
    })
    .catch(error => console.error(error));
    if(detecDevice() === true){
        chartOptions.plotOptions.bar.horizontal = true;
        changeChart();
        console.log("mobile");
    }
})

const changeChart = () => {
    chart.value.updateOptions({
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
    });
}
const detecDevice = () => {
    let device = false;

    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        device = true;
    } else {
        device = false;
    }
    return device;
}
</script>
<template>
  <main class="container row">
    <apexchart width="100%" ref="chart" :options="chartOptions" :series="series"></apexchart>
  </main>
</template>