<template>
	<div class="Login">
		<div class="LoginMain">
			<p class="Logintitle">注册</p>
			<el-form ref="regisForm" status-icon :model="regisForm" class="loginForm demo-ruleForm" :rules="rulesLogin">
				<el-form-item prop="name">
					<el-input class="LoginInput" v-model="regisForm.name" placeholder="用户名" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="passwd">
					<el-input class="LoginInput" type="password" v-model="regisForm.passwd" placeholder="密码" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="nikeName">
					<el-input class="LoginInput" v-model="regisForm.nikeName" placeholder="昵称" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input class="LoginInput" v-model="regisForm.phone" placeholder="手机号" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input class="LoginInput" v-model="regisForm.email" placeholder="邮箱" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="regis(regisForm)">注册</el-button>
					<el-button type="text" @click="login()">返回登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Regis',
		data() {
			var validatorName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('用户名不能为空'))
				} else {
					callback()
				}
			};
			var validatorpassword = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('密码不能为空'))
				} else {
					callback()
				}
			};
			var validatornikeName = (rule, value, callback) => {
				if (value !== '') {
					callback()
				}
			};
			var validatorphone = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('手机号不能为空'))
				} else {
					callback()
				}
			};
			var validatoremail = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('邮箱不能为空'))
				} else {
					callback()
				}
			};

			return {
				regisForm: {
					name: '',
					passwd: '',
					nikeName: '',
					phone: '',
					email: ''
				},
				rulesLogin: {
					name: [{
						validator: validatorName,
						trigger: 'blur'
					}],
					passwd: [{
						validator: validatorpassword,
						trigger: 'blur'
					}],
					nikeName: [{
						validator: validatornikeName,
						trigger: 'blur'
					}],
					phone: [{
						validator: validatorphone,
						trigger: 'blur'
					}],
					email: [{
						validator: validatoremail,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			regis(formName) {
				formName.apikey = '3cd4f9b429aea866d1e8e393cb695873'
				this.$api.post(
					'registerUser', {},
					formName,
					successRes => {
						this.$router.push({
							path: '/'
						})
					},
					failureRes => { //failure(data)方法
						console.log(failureRes)
					}
				)
			},
			login() {
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.Login {
		width: 100%;
		height: 100%;
		background: url(../assets/Login3.jpg) no-repeat;
		background-position: center;
		background-size: cover;
		/* filter: blur(5px); */
	}

	.Login:after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: inherit;
		filter: blur(5px);
	}
	.LoginMain {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 270px;
		height: 400px;
		text-align: center;
		z-index: 11;
	}
</style>
<style>
	.LoginMain .Logintitle {
		color: #fff;
		font-size: 24px;
		margin-bottom: 30px;
		margin-top: -20px;
		font-weight: bold;
		font-family: "宋体";
	}
	.loginForm {
		z-index: 1000;
	}

	.loginForm .LoginInput .el-input__inner {
		background-color: transparent;
		text-align: center;
		color: #FFFFFF;
	}

	.loginForm .el-button {
		width: 125px;
	}

	.el-button--text {
		text-decoration: underline;
	}
</style>
