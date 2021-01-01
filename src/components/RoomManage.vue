<template>
	<div class="room-manage">
		<div style="margin: 18px;padding: 8px;">
			<el-button type="primary" @click="dialogAddRoomm = true">添加房间</el-button>
		</div>
		<div class="fragment-room-items">
			<el-row>
				<el-col :span="8" v-for="(room, index) in rooms" :key="index">
					<el-card>
						<img :src="room.roomImage" class="image">
						<div>
							<span>房间号：{{room.houseNumber}}</span>
							<div class="bottom clearfix">
								<time class="time">是否入住：{{ room.roomStatus == 0 ? '空闲' : '占用'}}</time>
								<el-button type="text" @click="operate(index)" class="button">操作按钮</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="dialog-room">
			<el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="isFalse"
			 :close-on-press-escape="isFalse" :show-close="isFalse">
				<div class="dialog-content">
					<div>
						<el-image style="width: 100px; height: 100px" :src="room.roomImage" fit="contain"></el-image>
						<el-upload class="upload-demo" drag action="http://localhost:8080/file/put" name="file" multiple :on-success="uploadSuccess">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
					<el-input v-model="room.houseNumber" placeholder="请输入房间号"></el-input>
					<el-input type="textarea" :rows="2" placeholder="房间描述" v-model="room.description"></el-input>
					<el-input v-model="room.roomMoney" placeholder="房间标价"></el-input>
					<div class="room-dialog-info">
						<span class="room-dialog-type">{{room.type==1?'单人间':room.type==2?'双人间':'豪华间'}}</span>
						<span class="room-dialog-status">{{room.roomStatus == 0 ? '空闲' : '占用'}}</span>
					</div>
					<div v-if="room.roomStatus != 0 " class="room-username">
						<span>入住人：</span>
						<span>{{room.username}}</span>
					</div>
				</div>

				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelEnevt()">取 消</el-button>
					<el-button type="primary" @click="defineEvent()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="dialog-add-room">
			<el-dialog title="修改信息" :visible.sync="dialogAddRoomm" width="30%" :close-on-click-modal="isFalse"
			 :close-on-press-escape="isFalse" :show-close="isFalse">
				<div class="dialog-content">
					<div>
						<el-image style="width: 100px; height: 100px" :src="addRoomData.roomImage" fit="contain"></el-image>
						<el-upload class="upload-demo" drag action="http://localhost:8080/file/put" name="file" multiple :on-success="addRoomUploadSuccess">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
					<el-input v-model="addRoomData.houseNumber" placeholder="请输入房间号"></el-input>
					<el-input type="textarea" :rows="2" placeholder="房间描述" v-model="addRoomData.description"></el-input>
					<el-input v-model="addRoomData.roomMoney" placeholder="房间标价"></el-input>
					<div style="margin-top: 12px;">
						<el-radio v-model="addRoomData.type" label="1">单人间</el-radio>
						<el-radio v-model="addRoomData.type" label="2">双人间</el-radio>
						<el-radio v-model="addRoomData.type" label="3">豪华间</el-radio>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogAddRoomm = false">取 消</el-button>
					<el-button type="primary" @click="addRoomEventOk()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RoomManage',
		data() {
			return {
				rooms: {},
				room: {},
				dialogVisible: false,
				tempImageUrl: '',
				isFalse: false,
				uploadRoom: {
					description: '',
					houseNumber: '',
					roomImage: '',
					roomMoney: '',
					roomNumber: ''
				},
				addRoomData: {
					houseNumber: '',
					type: '',
					roomMoney: '',
					roomImage: '',
					description: ''
				},
				dialogAddRoomm: false
			}
		},
		created() {
			this.initRooms();
		},
		methods: {
			initRooms(){
				let url = this.$store.state.IP + '/admin/select/room/all';
				this.$axios.get(url, {
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.rooms = res.data.msg;
						console.log(this.rooms)
					}
				})
			},
			operate(index) {
				this.room = this.rooms[index]
				console.log(this.room)
				this.dialogVisible = true;
				this.tempImageUrl = this.room.roomImage;
			},
			uploadSuccess(res) {
				this.room.roomImage = res;
			},
			addRoomUploadSuccess(res) {
				this.addRoomData.roomImage = res;
			},
			cancelEnevt() {
				this.room.roomImage = this.tempImageUrl;
				this.dialogVisible = false;
			},
			defineEvent() {

				this.uploadRoom.description = this.room.description;
				this.uploadRoom.houseNumber = this.room.houseNumber;
				this.uploadRoom.roomImage = this.room.roomImage;
				this.uploadRoom.roomMoney = this.room.roomMoney;
				this.uploadRoom.roomNumber = this.room.roomNumber;

				let url = this.$store.state.IP + '/admin/update/room/info';

				this.$axios.post(url, this.uploadRoom, {
					headers: {
						ContentTyep: 'application/json',
						'token': localStorage.getItem('token')
					}
				}).then(res => {
					if (res.data.code == 200) {
						alert(res.data.msg)
						this.dialogVisible = false;
						console.log(res.data.msg)
					} else {
						alert('修改失败' + res.data)
					}
				})
			},
			addRoomEventOk() {
				let url = this.$store.state.IP + '/admin/add/room';
				this.$axios.post(url,this.addRoomData,{
					headers:{
						ContentTyep: 'application/json',
						'token':localStorage.getItem('token')
					}
				}).then(res=>{
					if(res.data.code==200){
						this.initRooms();
						this.dialogAddRoomm = false;
					}
					console.log(res)
					alert(res.data.msg)
				})
			}
		}
	}
</script>

<style>
	.room-manage .fragment-room-items .el-card {
		margin: 12px 24px;
	}

	.room-manage .fragment-room-items .el-card .image {
		width: 100%;
	}

	.room-manage .fragment-room-items .el-card .el-button {
		float: right;
	}

	.room-manage .fragment-room-items .el-card .el-button:after {
		content: '测试';
		display: block;
		clear: both;
		visibility: hidden;
	}
	.room-manage .dialog-add-room .el-dialog,
	.room-manage .dialog-room .el-dialog {
		min-width: 400px;
	}
	.room-manage .dialog-add-room .dialog-content .el-input,
	.room-manage .dialog-room .dialog-content .el-input {
		margin: 8px 0;
	}
	.room-manage .dialog-add-room .dialog-content .room-dialog-info,
	.room-manage .dialog-room .dialog-content .room-dialog-info {
		margin-bottom: 8px;
	}
	.room-manage .dialog-room .dialog-content .room-dialog-info .room-dialog-status {
		float: right;
	}

	.room-manage .dialog-room .dialog-content .room-dialog-info .room-dialog-type {}
</style>
