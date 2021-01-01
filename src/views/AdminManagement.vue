<template>
	<div class="management">
		<div class="header">
			<el-menu :default-active="switchPageIndex" class="el-menu-demo" mode="horizontal" @select="switchPage">
				<el-menu-item index="0">处理中心</el-menu-item>
				<el-menu-item index="1">会员管理</el-menu-item>
				<el-menu-item index="2">营收记录</el-menu-item>
				<el-menu-item index="3">房间管理</el-menu-item>
			</el-menu>
		</div>
		<div class="body">
			<ProcessCenter :class="fragment0" msg="欢迎来到管理中心"></ProcessCenter>
			<UserManagement :class="fragment1"></UserManagement>
			<AdminOrdersAll :class="fragment2" msg="小萍果2"></AdminOrdersAll>
			<RoomManage :class="fragment3" msg="小萍果3"></RoomManage>
		</div>
	</div>
</template>

<script>
	import ProcessCenter from '../components/ProcessCenter.vue'
	import UserManagement from '../components/UserManagement.vue'
	import AdminOrdersAll from '../components/AdminOrdersAll.vue'
	import RoomManage from '../components/RoomManage.vue'
	export default {
		name: 'AdminManagement',
		components: {
			ProcessCenter,
			UserManagement,
			AdminOrdersAll,
			RoomManage
		},
		data() {
			return {
				switchPageIndex: '0',
				fragment0: 'fragment show-fragment',
				fragment1: 'fragment hidden-fragment',
				fragment2: 'fragment hidden-fragment',
				fragment3: 'fragment hidden-fragment',
			}
		},
		methods: {
			switchPage(key, keyPath) {
				switch (this.switchPageIndex) {
					case '0':
						this.fragment0 = 'fragment hidden-fragment';
						console.log(this.fragment0)
						break;
					case '1':
						this.fragment1 = 'fragment hidden-fragment';
						break;
					case '2':
						this.fragment2 = 'fragment hidden-fragment';
						break;
					case '3':
						this.fragment3 = 'fragment hidden-fragment';
						break;
				
				}
				this.switchPageIndex = key;
				switch (key) {
					case '0':
						this.fragment0 = 'fragment show-fragment';
						break;
					case '1':
						this.fragment1 = 'fragment show-fragment';
						break;
					case '2':
						this.fragment2 = 'fragment show-fragment';
						break;
					case '3':
						this.fragment3 = 'fragment show-fragment';
						break;

				}
			},
			
		}
	}
</script>

<style>
	.hidden-fragment {
		display: none;
	}

	.show-fragment {
		display: block;
	}
</style>
