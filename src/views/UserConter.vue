<template>
	<div class="user-center">
		<div style="margin: 18px;">
			<el-link type="primary" @click="()=>{this.$router.push('/home')}"><i class="el-icon-s-home"></i></el-link>
			<el-link type="primary" style="float: right;" @click="checkOutLogin()">退出登录</i></el-link>

		</div>
		<div class="user-info">
			<el-input :value="userInfo.number" v-model="userInfo.number" disabled>
				<template slot="prepend">编 号:</template>
			</el-input>
			<el-input :value="userInfo.username" v-model="userInfo.username" :disabled="isDisabled">
				<template slot="prepend">姓 名:</template>
			</el-input>
			<el-input :value="userInfo.carId" v-model="userInfo.carId" :disabled="isDisabled">
				<template slot="prepend">carId:</template>
			</el-input>
			<el-input :value="userInfo.password" v-model="userInfo.password" show-password :disabled="isDisabled">
				<template slot="prepend">密 码:</template>
			</el-input>
			<el-input :value="userInfo.phone" v-model="userInfo.phone" :disabled="isDisabled">
				<template slot="prepend">手 机:</template>
			</el-input>
			<el-link type="primary" @click=" isDisabled = false">修改信息</el-link>
			<br />
			<el-button type="primary" v-if="!isDisabled" @click="cancleEvent()">取消</el-button>
			<el-button type="primary" v-if="!isDisabled" @click="updataUserInfo()">提交</el-button>
		</div>
		<div class="user-orders">
			<div class="order-item" v-for="(item,index) in orders" :key="index">
				<h5 class="order-item-number set-up-margin">订单编号：{{item.ordersNumber}}</h5>
				<h5 class="order-item-house-number set-up-margin">房间号码：{{item.houseNumber}}</h5>
				<h5 class="order-item-type set-up-margin">房间类型：{{item.type==1?'单人间':item.type==2?'双人间':'豪华间'}}</h5>
				<h5 class="order-item-type set-up-margin" v-if="!item.payNumber==null">支付金额：{{item.payMoney}}</h5>
				<p class="order-item-description">房间描述：{{item.description}}</p>
				<h5 class="order-iten-running">{{item.payNumber==null?'正在进行...':'已经结算'}}</h5>
				<el-link type="primary" @click="postComment(index)">发表评论</el-link>
				<el-link type="primary" @click="outRoom(index)" v-if="item.payNumber==null">退房</el-link>
			</div>
		</div>
		<div class="post-talk">
			<el-dialog title="评论" :visible.sync="dialogTalk" width="30%">
				<el-input type="textarea" rows="4" placeholder="请输入内容" v-model="postTalkData.talkContent">
				</el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogTalk = false">取 消</el-button>
					<el-button type="primary" @click="postTalkMessage()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="check-out-room">
			<el-dialog title="退房" :visible.sync="dialogCheckRoom" width="30%">
				<el-input v-model="checkOutRoom.carId" placeholder="请输入省份证ID"></el-input>
				<h5>应该支付金额：{{checkOutRoom.payMoney}} ¥</h5>
				</el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogCheckRoom = false">取 消</el-button>
					<el-button type="primary" @click="checkOutRoomPost()">确定支付且退房</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserConter',
		data() {
			return {
				orders: [],
				userInfo: '',
				tempUser: {
					password: '',
					username: '',
					phone: '',
					carId: '',
				},
				isDisabled: true,
				regularPhone: /^1[3|4|5|7|8][0-9]{9}$/,
				regularCarId: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				dialogTalk: false,
				dialogCheckRoom: false,
				index: '',
				postTalkData: {
					ordersNumber: '',
					talkContent: ''
				},
				checkOutRoom: {
					ordersNumber: '',
					payMoney: '',
					carId: ''
				}
			}
		},
		created() {
			let urlMe = this.$store.state.IP + '/user/select/me';
			this.$axios.get(urlMe, {
				headers: {
					'token': localStorage.getItem("userToken")
				}
			}).then(res => {
				if (res.data.code == 200) {
					this.userInfo = res.data.msg;
					this.tempUser = res.data.msg;
					let url = this.$store.state.IP + '/user/select/orders';
					this.$axios.get(url, {
						headers: {
							'token': localStorage.getItem("userToken")
						}
					}).then(res => {
						if (res.data.code == 200) {
							this.orders = res.data.msg;
							console.log(res.data.msg)
						} else {

							alert(res.data.msg)
						}
					})
				} else {
					alert(res.data.msg)
				}
			})
		},
		methods: {
			checkOutLogin() {
				localStorage.removeItem("userToken");
				this.$router.replace("/")
				const h = this.$createElement;
				this.$notify({
					title: '通知',
					message: h('i', {
						style: 'color: teal'
					}, '退出登录成功')
				});
			},
			cancleEvent() {
				let urlMe = this.$store.state.IP + '/user/select/me';
				this.$axios.get(urlMe, {
					headers: {
						'token': localStorage.getItem("userToken")
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.userInfo = res.data.msg;
						this.isDisabled = true;
					} else {
						alert(res.data.msg)
					}
				})
			},
			updataUserInfo() {
				if (!this.regularCarId.test(this.userInfo.carId)) {
					alert("身份证格式不正确");
					return;
				}
				if (!this.regularPhone.test(this.userInfo.phone)) {
					alert("手机号码格式不正确");
					return;
				}
				let url = this.$store.state.IP + '/user/update/user/info';
				this.$axios.post(url, this.userInfo, {
					headers: {
						ContentType: 'application/json',
						'token': localStorage.getItem('userToken')
					}
				}).then(res => {
					if (res.data.code == 200) {
						alert(res.data.msg);
						this.isDisabled = true;
					} else {
						alert(res.data.msg)
					}
				})
			},
			postComment(index) {
				this.dialogTalk = true;
				this.postTalkData.ordersNumber = this.orders[index].ordersNumber;
			},
			outRoom(index) {
				this.dialogCheckRoom = true;
				this.index = index;
				this.checkOutRoom.ordersNumber = this.orders[index].ordersNumber;
				this.checkOutRoom.payMoney = this.orders[index].roomMoney;
			},
			postTalkMessage() {
				let url = this.$store.state.IP + '/user/post/talk';
				this.$axios.post(url, this.postTalkData, {
					headers: {
						ContentType: 'application/json',
						'token': localStorage.getItem('userToken')
					}
				}).then(res => {
					if (res.data.code == 200) {
						alert(res.data.msg);
						this.dialogTalk = false;
					} else {
						alert(res.data.msg)
					}
				})
			},
			checkOutRoomPost() {
				if (!this.regularCarId.test(this.checkOutRoom.carId)) {
					alert("身份证格式不正确");
					return;
				}
				let url = this.$store.state.IP + '/user/check/out/room';
				this.$axios.post(url, this.checkOutRoom, {
					headers: {
						ContentType: 'application/json',
						'token': localStorage.getItem('userToken')
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.dialogCheckRoom = false;
						this.orders[this.index].payNumber = res.data.msg;
						alert("退房成功")
					} else {
						alert(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.user-center .user-info {
		width: 30%;
		margin: 18px;
		border: 1px solid #C7C7C7;
		padding: 18px;
		border-radius: 5px;
		box-shadow: 5px 10px 5px #C7C7C7;
	}

	.user-center .user-info .el-link {
		margin: 8px 0;

	}

	.user-center .user-info .user-name {
		width: 50px;
	}

	.user-center .user-orders .order-item {
		margin: 18px;
		border: 1px solid #C7C7C7;
		padding: 18px;
		border-radius: 5px;
		box-shadow: 5px 10px 5px #C7C7C7;

	}

	.user-center .user-orders .order-item:after {
		content: '测试';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}

	.user-center .user-orders .order-item .order-iten-running {
		color: #FF0000;
	}

	.user-center .user-orders .order-item .set-up-margin {
		margin-bottom: 8px;
		margin-top: 0;

	}

	.user-center .user-orders .order-item .el-link {
		float: right;
		margin-left: 10px;
	}
</style>
