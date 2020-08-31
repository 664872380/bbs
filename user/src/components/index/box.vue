<template>
    <div>
        <div v-for="(item,index) in arr" :key="index" class="content">
            <p>{{item.id}}</p>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arr:[{id:1,name:"xiaominn"},{id:1,name:"xiaominn"},{id:1,name:"xiaominn"}]
            }
        },
    }
</script>

<style scoped>
    .content {
        width: 800px;
        border: 1px solid black;
    }
</style>