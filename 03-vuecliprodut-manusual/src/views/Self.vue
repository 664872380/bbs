<template>
	<div>
		<p>我自己脚手架项目下创建的第一个页面</p>
		<!-- <el-button type="success">成功按钮</el-button> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="商品市场" name="first">
				<h3>商品市场</h3>
			</el-tab-pane>
			<el-tab-pane label="购物车" name="second">
				<h3>购物车</h3>
			</el-tab-pane> 
		</el-tabs>
		
		<router-view></router-view>	
		
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        activeName: 'first'
	      };
	    },
	    methods: {
	      handleClick(tab, event) {
			 var path;
			if(tab.index==0){
				path="/self/product"
			}else{
				path="/self/shoplist"
			}
			
			if(this.$route.fullPath!==path){
				this.$router.push(path)
			}
	      }
	    }
	  };
</script>

<style scoped>
	/* .el-button--success{
		background-color: red;
		color: white;
	} */
	/* div {
		background-color: #ccc;
		color: white;
		font-size: 30px;
		text-align: center;
	} */
</style>
