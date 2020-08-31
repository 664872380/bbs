<template>
<div class="box">
  <sort></sort>
  <box></box>
  <right></right>
</div>
</template>

<script>
import sort from "./sort.vue"
import box from "./box.vue"
import right from "./right.vue"
export default {
  components:{
    sort,
    box,
    right
  }
}
</script>

<style>
  .box {
    float: left;
    width: 1100px;
    /* height: 300px; */
    background-color: yellow;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>