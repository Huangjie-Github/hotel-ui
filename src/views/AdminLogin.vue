<template>
	<div class="login">
		<div class="login-fragment">
			<el-card class="box-card">
				<span class="login-title">管理员登录</span>
				<el-input class="distance-input" placeholder="账号" v-model="username" clearable></el-input>
				<el-input class="distance-input" placeholder="密码" v-model="password" show-password></el-input>
				<el-button type="success" v-on:click="adminLogin()">登录</el-button>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AdminLogin',
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			adminLogin() {
				let adminLoginUrl = this.$store.state.IP + '/admin/login';
				let adminData = {
					"username": this.username,
					"password": this.password
				}
				this.$axios.post(adminLoginUrl, adminData, {
					header: {
						ContentType: 'application/json'
					}
				}).then(res => {
					console.log(res.data)
					if (res.data.code == 200) {
						console.log(res)
						this.$alert('登录成功', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								localStorage.setItem("token",res.data.msg)
								this.$router.replace("/admin/management")
							}
						});
					} else {
						this.$alert(res.data.msg, '提示', {
							confirmButtonText: '确定',
						});
					}
				}).cache(err => {
					console.log('error', res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	body {
		background-image: url(../assets/images/background.jpg);
		background-repeat: no-repeat;
		background-size: 100%;
		width: 100%;
		height: 100%;
	}
	.login-fragment {
		position: absolute;
		left: 50%;
		width: 300px;
		top: 10%;
	}

	.login-fragment .login-title {
		display: block;
		margin-bottom: 12px;
		font-weight: bold;
	}

	.login-fragment .distance-input {
		margin-bottom: 10px;
	}
</style>
