<script setup>
import { ref } from 'vue';
var min = 1;
var max = 8;
var inputVal = ref(min);
const emitInput = defineEmits(['onChangeChild']);

const onChangeInput = () => {
    emitInput('onChangeChild',parseInt(inputVal));
}
</script>

<template>
    <div class="slider">
        <div class="slider-button-container">
            <input type="range" :min="min" :max="max" name="range-input" id="range-input" v-model="inputVal" @input="onChangeInput">
            <div class="range-label" :style="{left: (inputVal/max*100)+3 +'%'}"> {{ inputVal }}</div>
            <div class="range-background"></div>
        </div>
        <input type="number" :min="min" :max="max" name="num-input" id="num-input" :value="inputVal">
    </div>
</template>


<style scoped>
.slider {
    width: 150px;
}
.slider-button-container {
    position: relative;
    width: 80%;
    height: auto;
    cursor: default;
    margin-left: 12%;
}
.range-label {
    position: absolute;
    width: 2.5em;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(170, 170, 170, 0.5);
    border-radius: 5px;
    background-color: rgb(248, 247, 247);
    z-index: 1;
    user-select: none;
    text-align: center;
}
.range-background{
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 12px;
    border-radius: 5px;
    border: 2px solid rgba(170, 170, 170, 0.5);
    background-color: rgb(255, 255, 255);

}
#range-input {
    position: relative;
    width: 120%;
    height: 100%;
}
input[type="range" i] {
    opacity: 0;
    z-index: 2;
}
#num-input{
    border: 1px solid rgba(170, 170, 170, 0.5);
    border-radius: 5px;
    background-color: rgb(248, 247, 247);
    width: 113%;
    margin: 5px;
}
</style>