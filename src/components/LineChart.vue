<script setup>
import {ref, reactive, onMounted} from 'vue';
const source = new EventSource('https://old.iolab.sk/evaluation/sse/sse.php');
var sliderValue = ref(1)
var series= reactive([
    {
        name: "Series 1 - y1",
        data: []
    },
    {
        name: "Series 2 - y2",
        data: []
    }
])
var chartOptions = reactive({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Recieved data',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], 
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [],
    }
})
const chart = ref(null);
const onChangeChild = (value) => {
    sliderValue.value = value;
}
const stopData = () => {
    source.close();
    chartOptions.chart.zoom.enabled = true;
    chart.value.updateOptions(chartOptions);
}

onMounted(() => {
    var cat = [];
    source.onmessage = (event) => {
        let amp = 1;
        if(sliderValue.value.srcElement === undefined){
            amp = 1;
        }else {
            amp = parseInt(sliderValue.value.srcElement.value);
        }
        let temp = JSON.parse(event.data);
        cat.push(temp.x);
        chartOptions.xaxis.categories = cat;
        temp.y1 = parseFloat(temp.y1)*amp;
        temp.y2 = parseFloat(temp.y2)*amp;
        series[0].data.push(temp.y1);
        series[1].data.push(temp.y2);
        chart.value.updateOptions(chartOptions);
        chart.value.updateSeries(series);
    };
    source.onerror = (event) => {
        console.log(event);
    };
})
</script>
<template>
    <apexchart type="line" height="350" ref="chart" :options="chartOptions" :series="series"></apexchart>
    <button class="btn btn-danger" @click="stopData()">Stop</button>
    <slider-button class="mt-5" @input="onChangeChild"></slider-button>
</template>