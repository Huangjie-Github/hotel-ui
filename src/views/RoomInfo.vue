<template>
	<div class="room-info">
		<div style="margin: 12px 3px; text-align: right;">
			<el-link type="primary" href="/home" style="float: left;">返回首页</i></el-link>
			<el-link type="primary" @click="initRoomInfo()"><i class="el-icon-refresh"></i></el-link>
		</div>
		<div class="room-image">
			<el-image style="width: 500px; height: auto" :src="room.roomImage" fit="contain"></el-image>
		</div>
		<el-divider></el-divider>
		<div class="room-text-message">
			<h5 class="room-text-h5">房号：{{room.houseNumber}}</h5>
			<h5 class="room-text-h5">价格：{{room.roomMoney}} ¥</h5>
			<h5 class="room-text-h5">价格：{{room.type==1?'单人间':room.type==2?'双人间':'豪华间'}}</h5>
			<p class="room-text-description">{{room.description}}</p>
			<el-button type="primary" @click="dialogVisible = true">预定</el-button>
		</div>
		<el-divider></el-divider>
		<div class="room-text-talk">
			<div class="room-text-talk-item" v-for="(item,index) in room.talkRoomBOList" :key="index">
				<div class="room-talk-item-info">
					<span class="room-text-h5 room-talk-user">{{item.username}} </span>
					<i :class="item.username==1?'el-icon-male':'el-icon-female'"></i>

				</div>
				<div class="room-talk-item-content">
					{{item.talkContent}}
				</div>
				<div class="room-talk-item-date">
					<span class="room-text-h5">{{ item.createDate}} </span>
				</div>
				<el-divider></el-divider>
			</div>
		</div>
		<div class="destine-dialog">
			<el-dialog title="预定" :visible.sync="dialogVisible" width="30%">
				<span>点击确定预约房间</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="createRoom()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'RoomInfo',
		data() {
			return {
				room: {},
				dialogVisible: false
			}
		},
		created() {
			this.initRoomInfo()
;		},
		methods: {
			initRoomInfo() {
				let url = this.$store.state.IP + '/user/select/room/talk/' + this.$route.params.roomNumber;
				this.$axios.get(url).then(res => {
					if (res.data.code == 200) {
						this.room = res.data.msg[0];
						const h = this.$createElement;
						this.$notify({
							title: '通知',
							message: h('i', {
								style: 'color: teal'
							}, '房间信息获取成功')
						});
						for (var i = 0; i < this.room.talkRoomBOList.length; i++) {
							let date = new Date(this.room.talkRoomBOList[i].createDate);
							let time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() +
								":" + date.getMinutes() + ":" + date.getSeconds();
							this.room.talkRoomBOList[i].createDate = time;
						}
					}
				})
			},
			createRoom(){
				let url = this.$store.state.IP + '/user/create/orders';
				let data = {
					roomNumber: this.room.roomNumber
				}
				this.$axios.post(url,data,{
					headers:{
						ContentType: 'application/json',
						'token':localStorage.getItem('userToken')
					}
				}).then(res=>{
					if(res.data.code==200){
						this.$router.push("/user/center")
						alert('预定成功')
					}else{
						alert(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.room-info {
		padding: 18px;
	}

	.room-info .room-text-message .room-text-h5 {
		margin-block-end: 8px;
		margin-block-start: 0;
	}

	.room-info .room-text-message .room-text-description {
		border: 1px solid #C7C7C7;
		border-radius: 5px;
		padding: 18px;
		font-family: '宋体';
	}

	.room-info .room-text-talk .room-text-talk-item {
		margin-left: 18px;
	}

	.room-info .room-text-talk .room-text-talk-item .room-talk-item-info .room-talk-user {
		color: black;
		font-weight: bold;
	}

	.room-info .room-text-talk .room-text-talk-item .room-talk-item-date {
		font-size: 12px;
		font-family: '宋体';
	}

	.room-info .room-text-talk .room-text-talk-item .room-talk-item-date:after {
		content: '测试';
		visibility: hidden;
		display: block;
		clear: both;
		height: 0;
	}

	.room-info .room-text-talk .room-text-talk-item .room-talk-item-date .room-text-h5 {
		float: right;
		margin-top: 5px;
	}

	.room-info .room-text-talk .room-text-talk-item .room-talk-item-content {
		border: 1px solid #C7C7C7;
		border-radius: 5px;
		padding: 18px;
		font-family: "宋体";
		margin-left: 18px;
		margin-top: 8px;
	}
</style>
