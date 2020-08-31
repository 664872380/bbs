

export default {
	state:{
		shopList:new Map()
	},
	mutations:{
		addShopList(state,item){
			if(state.shopList.has(item)){
				var oldcount=state.shopList.get(item)
				state.shopList.set(item,oldcount+1)
			}else{
				state.shopList.set(item,1)
			}
		}
	}
	
	
	
	
}