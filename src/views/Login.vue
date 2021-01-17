<template>
	<div class="login">
		<div class="login-fragment" v-show="isShowLoginFragment">
			<el-card class="box-card">
				<span class="login-title">用户登录</span>
				<el-input class="distance-input" placeholder="账号" v-model="userLogin.username" clearable></el-input>
				<el-input class="distance-input" placeholder="密码" v-model="userLogin.password" show-password></el-input>
				<el-button type="success" v-on:click="login()">登录</el-button>
				<div>
					<span class="switchLoginOrRegister" @click="switchLoginOrRegister()">注册</span>
					<el-link class="switchLoginOrRegister" type="primary" @click="()=>{this.$router.push('/admin/login')}" style="float: left;">管理登录</el-link>
				</div>
			</el-card>
		</div>
		<div class="register-fragment" v-show="!isShowLoginFragment">
			<el-card class="box-card">
				<span class="register-title">用户注册</span>
				<el-input class="distance-input" placeholder="账号" v-model="registerUser.username" clearable></el-input>
				<el-input class="distance-input" placeholder="密码" v-model="registerUser.password" show-password></el-input>
				<el-input class="distance-input" placeholder="重复密码" v-model="registerUser.rePassword" show-password></el-input>
				<el-input class="distance-input el-input-red" placeholder="手机号" v-model="registerUser.phone" clearable></el-input>
				
				<div class="distance-input">
					<el-radio v-model="registerUser.sex"  label="1">男</el-radio>
					<el-radio v-model="registerUser.sex" label="2">女</el-radio>
				</div>
				<el-button type="success" v-on:click="register()">注册</el-button>
				<div>
					<span class="switchLoginOrRegister" @click="switchLoginOrRegister()">登录</span>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Login',
		data() {
			return {
				userLogin: {
					username: '',
					password: '',
					rePassword: '',
					phone: ''
					
				},
				regularPhone: /^1[3|4|5|7|8][0-9]{9}$/,
				regularCarId: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				registerUser: {
					sex: '1',
					username: '',
					password: '',
					rePassword: '',
					phone: ''
				},
				isShowLoginFragment: true
			}
		},
		methods: {
			login(){
				let url = this.$store.state.IP + '/user/login';
				this.$axios.post(url,this.userLogin,{
					ContentType: 'application/json'
				}).then(res=>{
					if(res.data.code==200){
						localStorage.setItem('userToken',res.data.msg);
						alert("登录成功");
						this.$router.replace("/home")
					}else{
						alert("登录失败："+res.data.msg)
					}
				})
			},
			register(){
				
				if(this.regularPhone.test(this.registerUser.phone)){
					if(this.registerUser.password!=this.registerUser.rePassword){
						alert("两次密码输入不一致");
						return;
					}
					let url = this.$store.state.IP + '/user/register';
					this.$axios.post(url,this.registerUser,{
						headers:{
							ContentType: 'application/json'
						}
					}).then(res=>{
						if(res.data.code==200){
							this.isShowLoginFragment = true;
							alert(res.data.msg)
							
						}else{
							alert("请求错误"+res.data.msg)
						}
					})
				}else{
					alert("手机号码不正确")
				}
			},
			switchLoginOrRegister(){
				this.isShowLoginFragment = this.isShowLoginFragment?false:true;
			}
		}
	}
</script>
<style>

	.login .login-fragment , .login .register-fragment {
		position: absolute;
		left: 50%;
		width: 300px;
		top: 10%;
		
	}
	

	.login-fragment .login-title , .register-fragment .register-title {
		display: block;
		margin-bottom: 12px;
		font-weight: bold;
	}

	.login-fragment .distance-input, .register-fragment .distance-input {
		margin-bottom: 10px;
	}
	
	.login-fragment .switchLoginOrRegister , .register-fragment .switchLoginOrRegister{
		display: block;
		font-size: 12px;
		color: #409EFF;
		margin: 8px 0;
		float: right;
		cursor: pointer;
	}
	
	.login-fragment .switchLoginOrRegister:after,.register-fragment .switchLoginOrRegister:after{
		content: '测试';
		display: block;
		clear: both;
		visibility: hidden;
		
	}
</style>
