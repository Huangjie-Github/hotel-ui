<template>
	<div class="admin-orders-all">
		<div>
			<template>
				<el-table :data="ordersAll" style="width: 100%">
					<el-table-column prop="ordersNumber" label="订单编号" width="180"></el-table-column>
					<el-table-column prop="createDate" label="创建日期" width="180"></el-table-column>
					<el-table-column prop="houseNumber" label="房间号" width="120"></el-table-column>
					<el-table-column prop="type" label="房间类型" width="120"></el-table-column>
					<el-table-column prop="username" label="用户" width="120"></el-table-column>
					<el-table-column prop="sex" label="性别" width="120"></el-table-column>
					<el-table-column prop="roomMoney" label="房间标价" width="120"></el-table-column>
					<el-table-column prop="payMoney" label="支付金额" width="120"></el-table-column>
					<el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
				</el-table>
			</template>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'AdminOrdersAll',
		data() {
			return {
				ordersAll: []
			}
		},
		created() {
			let url = this.$store.state.IP + "/admin/select/orders/all";
			this.$axios.get(url, {
				headers: {
					'token': localStorage.getItem('token')
				}
			}).then(res => {
				if (res.data.code == 200) {
					this.ordersAll = res.data.msg;
					for (var i = 0; i < this.ordersAll.length; i++) {
						let date = new Date(this.ordersAll[i].createDate)
						
						this.ordersAll[i].createDate = (date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日')
						this.ordersAll[i].sex = this.ordersAll[i].sex == 1? '男' : '女';
						if(this.ordersAll[i].type==1){
							this.ordersAll[i].type = '单人间'
						}else if(this.ordersAll[i].type==2){
							this.ordersAll[i].type = '双人间'
						}else if(this.ordersAll[i].type==3){
							this.ordersAll[i].type = '豪华间'
						}
					}
				}
			})
		} 
	}
</script>

<style>
</style>
