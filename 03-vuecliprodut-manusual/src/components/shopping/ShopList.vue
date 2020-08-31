<template>
	<div>
		展示用户要添加到购物车的商品，并且计算总价
		
		<div v-for="(item,index) of this.$store.state.shopping.shopList.entries()" :key="index">
			{{item}}
		</div>	
		
	</div>	
</template>

<script>
	export default{
		created(){
			console.log(this.$store.state.shopping.shopList)
		}
	}
	
</script>

<style>
</style>
