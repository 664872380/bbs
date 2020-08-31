<template>
	<div>
		商品v-for,允许用户勾选
			<el-table    :data="prodArr"    border    style="width: 40%">
				<el-table-column
				  prop="id"
				  label="ID"
				  width="120">
				</el-table-column>
			    <el-table-column
			      prop="name"
			      label="商品名"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="价格"
			      width="120">
			    </el-table-column>
	
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="150">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">加入购物车</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
	</div>	
</template>

<script>
	export default {
		data:function(){
			return {
				prodArr:[
					{
						id:1,
						name:"电视机",
						price:"1200"
					},
					{
						id:2,
						name:"电冰箱",
						price:"2000"
					},
					{
						id:3,
						name:"电风扇",
						price:"2500"
					},
					{
						id:4,
						name:"扫地机",
						price:"5600"
					}
				]
			}
		},
		methods: {
		      handleClick(row) {
		        console.log(row);
				this.$store.commit("addShopList",productItem)
		      }
		    },
	}
	
</script>

<style>
</style>
