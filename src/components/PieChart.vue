<script setup>
import {reactive, onMounted} from 'vue';
var chartOptions = reactive([]);
var series = reactive([]);
onMounted(() => {
    fetch('https://webte1.fei.stuba.sk/~xkyseld/graface/z03.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const tempYears = xml.getElementsByTagName('rok');
        const evaluation = xml.getElementsByTagName('hodnotenie');
        for (let i = 0; i < tempYears.length; i++) {
            chartOptions.push({
                chart: {
                    width: 450,
                    type: 'pie',
                },
                labels: [],
                title: {
                    text: "Známky za "+tempYears[i].innerHTML,
                    align: 'center',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            });
        }
        for(let j = 0; j < evaluation[0].childElementCount; j++){
            for(let i = 0; i<tempYears.length; i++){
                chartOptions[i].labels.push(evaluation[0].children[j].localName);
            }
        }
        for(let i = 0; i < evaluation.length; i++){
            var year = [];
            for(let j = 0; j < evaluation[i].childElementCount; j++){

                year.push(parseInt(evaluation[i].children[j].innerHTML));
            }
            series.push(year);
        }
    })
    .catch(error => console.error(error));
})

</script>
<template>
    <main class="container mt-5">
        <div class="row">
            <apexchart class="col-lg-3 col-md-2 col-sm-1 me-5"
            v-for="(item, index) in series" :key="index" 
            type="pie" 
            width="380" 
            :series="series[index]" 
            :options="chartOptions[index]"></apexchart>
        </div>
    </main>
</template>