<template>
	<div class="Login">
		<div class="LoginMain">
			<p class="Logintitle">登录</p>
			<el-form ref="LoginForm" status-icon :model="LoginForm" class="LoginForm demo-ruleForm" :rules="rulesLogin">
				<el-form-item prop="name">
					<el-input class="LoginInput" v-model="LoginForm.name" placeholder="用户名" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="passwd">
					<el-input class="LoginInput" type="password" v-model="LoginForm.passwd" placeholder="密码" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="submitForm(LoginForm)">登录</el-button>
					<el-button type="text" @click="register()">注册</el-button>
				</el-form-item>
			</el-form>
			<input type="text" v-model="$store.state.conut">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
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
			return {
				LoginForm: {
					name: 'test',
					passwd: '123456'
				},
				rulesLogin: {
					name: [{
						validator: validatorName,
						trigger: 'blur'
					}],
					passwd: [{
						validator: validatorpassword,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				formName.apikey = '3cd4f9b429aea866d1e8e393cb695873'
				
				this.$api.post(
					'loginUser', {},
					formName,
					successRes => {
							console.log(successRes)
					},
					failureRes => { //failure(data)方法
						console.log(failureRes)
					}
				)
			},
			register() {
				this.$router.push({
					path: '/Regis'
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
		height: 200px;
		text-align: center;
		z-index: 11;
	}
</style>
<style>
	.LoginMain .Logintitle {
		color: #fff;
		font-size: 24px;
		margin-bottom: 30px;
		margin-top: -50px;
		font-weight: bold;
		font-family: "宋体";
	}
	.LoginForm {
		z-index: 1000;
	}

	.LoginForm .LoginInput .el-input__inner {
		background-color: transparent;
		text-align: center;
		color: #FFFFFF;
	}

	.LoginForm .el-button {
		width: 125px;
	}

	.el-button--text {
		text-decoration: underline;
	}
</style>
