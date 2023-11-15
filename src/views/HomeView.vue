<script setup>
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import RadarChart from '../components/RadarChart.vue';
</script>

<template>
  <main class="container">
    <h2 class="text-center my-5">Výsledky študentov za posledných 6 akademických rokov</h2>
    <BarChart />
    <PieChart />
    <RadarChart />
  </main>
</template>
