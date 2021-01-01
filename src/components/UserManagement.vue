<template>
	<div>
		<el-table :data="userList.filter(userInfo => !search || userInfo.username.toLowerCase().includes(search.toLowerCase()))"
		 style="width: 100%">
			<el-table-column label="编号" prop="number"></el-table-column>
			<el-table-column label="姓名" prop="username" width="150px"></el-table-column>
			<el-table-column label="密码" prop="password"></el-table-column>
			<el-table-column label="手机号" prop="phone" width="180px"></el-table-column>
			<el-table-column label="性别" prop="sex" width="50px"></el-table-column>
			<el-table-column label="身份证" prop="carId"></el-table-column>
			<el-table-column label="创建时间" prop="createDate"></el-table-column>

			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<div class="dialog">
			<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
				<el-form :model="user">
					<el-form-item label="编号" :label-width="formLabelWidth">
						<el-input disabled="" v-model="user.number" autocomplete="off"></el-input>
					</el-form-item>
			
					<el-form-item label="名称" :label-width="formLabelWidth">
						<el-input v-model="user.username" autocomplete="off"></el-input>
					</el-form-item>
			
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input v-model="user.password" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" :label-width="formLabelWidth">
						<el-input v-model="user.sex" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="省份证ID" :label-width="formLabelWidth">
						<el-input v-model="user.carId" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号" :label-width="formLabelWidth">
						<el-input v-model="user.phone" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="updateUserInfo()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'UserManagement',
		props: {

		},
		data() {
			return {
				userList: [],
				search: '',
				user: {},
				formLabelWidth: 120,
				dialogFormVisible: false,
				index: '',
			}
		},
		created() {
			let url = this.$store.state.IP + "/admin/select/all";
			this.$axios.get(url, {
				headers: {
					'token': localStorage.getItem("token")
				}
			}).then(res => {
				this.userList = res.data;
			})
		},
		methods: {
			handleEdit(index, row) {
				this.user = row;
				this.dialogFormVisible = true;
				this.index = index;
			},
			updateUserInfo(){
				let url = this.$store.state.IP + "/admin/update/user/info";
				this.$axios.post(url,this.user,{
					headers:{
						ContentType: 'application/json',
						'token': localStorage.getItem("token")
					}
				}).then(res=>{
					if(res.data.code==200){
						alert(res.data.msg)
						this.userList[this.index] = this.user;
						this.dialogFormVisible = false;
					}else{
						alert(res.data.msg)
					}
				})
			},
			handleDelete(index, row) {
				let url = this.$store.state.IP + "/admin/delete/user/info";
				this.$axios.post(url,row,{
					headers:{
						ContentType: 'application/json',
						'token': localStorage.getItem("token")
					}
				}).then(res=>{
					if(res.data.code==200){
						alert(res.data.msg)
						console.log(index,this.userList)
						this.userList.splice(index,1)
					}else{
						alert(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>

</style>
