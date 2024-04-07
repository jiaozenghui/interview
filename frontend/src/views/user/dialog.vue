<template>
	<div class="user-container">
        <Modal v-on:onCancel="onCancel"  :modalShow="state.dialog.isShowDialog" :isShowFooter="state.dialog.isShowFooter" :title="state.dialog.title">
            <form
            method="post"
          >         
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border-b border-gray-900/10 pb-12">
                <div class="sm:col-span-4">
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                  <div class="mt-2">
                    <input type="text" name="name" id="name" autocomplete="name"
                    v-model="state.userForm.name"
					@input="checkForm($event, 'name')"
                     class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
					<p class="text-rose-600" v-if="state.errors.name.validate!=undefined &&!state.errors.name.validate">{{state.errors.name.msg}}</p>
					</div>
                </div>
                <div class="sm:col-span-4">
                  <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                  <div class="mt-2">
                    <select   id="gender"
                    v-model="state.userForm.gender"
					@change="checkForm($event, 'gender')"
                    name="gender" autocomplete="gender" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">
                        <option >Male</option>
                        <option>Female</option>
                    </select>
					<p class="text-rose-600" v-if="state.errors.gender.validate!=undefined &&!state.errors.gender.validate">
						{{ state.errors.gender.msg }}
					</p>
                  </div>
                </div>
              </div>  
              <div class="mt-6 flex items-center justify-end gap-x-6 ">
                <button type="button" @click="onCancel" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"  @click="onSubmit" class="rounded-md  px-3 py-2 text-sm  hover:bg-indigo-500 focus-visible:outline bg-sky-300 hover:bg-sky-400">
                    {{ state.dialog.submitTxt }}
                </button>
              </div>
          </form>
        </Modal>
	</div>
</template>

<script setup lang="ts" name="userDialog">
import { reactive, ref } from 'vue';
import { UserApi } from "@/api/user/index";
import Modal from "./../../components/Modal.vue";
import Message from '@/components/Message'
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();

const userApi = UserApi();
const state = reactive({
	userForm: {
		name: '',
        gender: ''
	},
	dialog: {
		isShowDialog: false,
        isShowFooter: false,
		type: '',
		title: '',
		submitTxt: 'Confirm',
	},
	formValidate: false,
	errors:{
		name: {
			msg: 'Name Required'
		},
		gender: {
			msg: 'Gender Required'
		}
	} as any
});

// 打开弹窗
const openDialog = (type: string, row: RowUserType) => {
	state.dialog.type = type;
	state.userForm = {
		name: '',
        gender: ''
	}
	state.errors = {
		name: {
			msg: 'Name Required'
		},
		gender: {
			msg: 'Gender Required'
		}
	}
	if (type === 'edit') {
		state.userForm = JSON.parse(JSON.stringify(row));
		state.dialog.title = 'Update User';
	} else {
		state.dialog.title = 'Add User';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	userDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const checkForm = (e:any, filed:any) => {
	e.preventDefault();
	if (filed) {
		state.errors[filed]['validate'] = !!state.userForm[filed];
	}
	let validate = true;
	Object.keys(state.userForm).forEach(key => {
		if (!state.userForm[key]) {
			validate = false;
		}
		if (!filed) {
			if (!state.userForm[key]) {
				state.errors[key]['validate'] = false;
			}
		}
	})

	state.formValidate = validate;

}

const nameChange = ()=>{

}

// 提交
const onSubmit = (e:any) => {
	checkForm(e);
	if (!state.formValidate) return;
	closeDialog();
	
	if (state.dialog.type === 'add') {
		userApi.addUser(state.userForm).then((res:any)=>{
			if (res.status ==0) {
				Message({ type: 'success', text: 'Successfully added' })
				emit('refresh');
			} else {
				Message({ type: 'error', text: 'Add Failed' })
			}
		},()=>{
			Message({ type: 'error', text: 'Add Failed' })
		});
	 } else {
		let params = state.userForm;
		let id = state.userForm.id;
		delete state.userForm.id
		userApi.updateUser(id, params).then((res:any)=>{
			if (res.status ==0) {
				Message({type: 'success', text: 'Successfully updated' })
				emit('refresh');
			} else {
				Message({ type: 'error', text: 'Update Failed' })
			}
		}).error(()=>{
			Message({ type: 'error', text: 'Update Failed' })
		});
	 }
};



// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped >
.system-role-dialog-container .menu-data-tree{
	width: 100%;
	border: 1px solid var(--el-border-color);
	border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
	padding: 5px;
}
</style>
