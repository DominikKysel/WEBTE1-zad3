<script setup>
import {ref, reactive, onMounted} from 'vue';

var chartOptions = reactive({
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: 'Pokrytie známok'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: []
  }
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
})


</script>
<template>
  <main class="container mt-5">
    <apexchart type="radar" height="500" ref="chart"  :options="chartOptions" :series="series"></apexchart>
  </main>
</template>