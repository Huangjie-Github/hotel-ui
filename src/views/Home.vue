<template>
	<div class="home">
		<div class="header">
			欢迎来到Baby酒店
			
			  <el-link class="to-user-center" type="primary" @click="()=>{this.$router.push('/user/center')}"><i class="el-icon-user-solid" @click="checkUserCenter()"></i></el-link>
			
		</div>
		<div class="body">
			<div class="search">
				<el-input placeholder="请选择" v-model="searchFilter" class="input-with-select" disabled>
					<el-select v-model="searchFilter" slot="prepend" placeholder="请选择">
						<el-option label="全部" value="全部"></el-option>
						<el-option label="单人间" value="单人间"></el-option>
						<el-option label="双人间" value="双人间"></el-option>
						<el-option label="豪华间" value="豪华间"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="rooms">
				<div class="room" v-for="(room, index) in rooms" :key="index" v-if="types[room.type-1]==searchFilter||searchFilter.length==0||searchFilter==null||searchFilter=='全部'">
					<div class="room-image">
						<el-image style="width: 300px; height: 300px; padding: 0;" :src="room.roomImage" fit="contain"></el-image>
					</div>
					<div class="room-right">
						<p class="room-description">房间描述：{{room.description}}</p>
						<h5>房号：{{room.houseNumber}}</h5>
						<h5>价格：{{room.roomMoney}} ¥</h5>
						<h5>房间类型：{{room.type==1?'单人间':room.type==2?'双人间':'豪华间'}}</h5>
						<el-button type="primary" @click="toLookUp(index)">前往查看</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				token: localStorage.getItem('userToken'),
				searchFilter: '',
				rooms: {},
				types:['单人间','双人间','豪华间']
			}
		},
		created() {
			if (this.token == null || this.token.length == 0) {
				alert("请先登录");
				this.$router.replace("/")
			}
			let url = this.$store.state.IP + '/user/select/room/talk';
			this.$axios.get(url).then(res => {
				if (res.data.code == 200) {
					this.rooms = res.data.msg
					const h = this.$createElement;
					this.$notify({
						title: '通知',
						message: h('i', {
							style: 'color: teal'
						}, '房间列表获取成功')
					});
				}
			})
		},
		methods:{
			toLookUp(index){
				this.$router.push("/home/room/"+this.rooms[index].roomNumber)
			},
			checkUserCenter(){
				this.$router.push('/user/center')
			}
		}
	}
</script>

<style>
	.home .header {
		font-size: 24px;
		font-family: "宋体";
		font-weight: bold;
		padding: 8px 12px;
		text-align: center;

	}
	.home .header:after{
		content: '测试';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}
	.home .header .to-user-center{
		margin: 10px;
		float: right;
		cursor: pointer;
	}
	.home .body {
		margin: 12px 8px;
	}
	.home .body .search .el-input.is-disabled .el-input__icon {
		cursor: pointer;
	}
	.home .body .rooms .room {
		margin: 12px 0;
		box-shadow: 6px 4px 8px #8d8d8d;
		border: 1px solid #C7C7C7;
		padding: 18px 18px;
		border-radius: 5px;
		font-family: "宋体";
		min-width: 930px;
	}

	.home .body .rooms .room .room-image,
	.home .body .rooms .room .room-right {
		float: left;
	}

	.home .body .rooms .room .room-right {
		margin-left: 18px;
		width: calc(100% - 330px);
		min-width: 600px;
	}

	.home .body .rooms .room .room-right .room-description {
		border: 1px solid #c7c7c7;
		box-shadow: 5px;
		margin: 0;
		padding: 12px;
	}

	.home .body .rooms .room:after {
		content: '测试';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}

	.home .body .rooms .room .el-image__inner {
		height: 100%;
		width: auto;
		border-radius: 5px;
	}
</style>
