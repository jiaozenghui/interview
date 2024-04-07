<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';



const userDialogRef = ref();

const state = reactive<any>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
});

const UserDialog = defineAsyncComponent(() => import('./dialog.vue'));

// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
	userDialogRef.value.openDialog(type);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
	userDialogRef.value.openDialog(type, row);
};


// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	const data = [];
	for (let i = 0; i < 2; i++) {
		data.push({
			userName: i === 0 ? 'admin' : 'test',
			userNickname: i === 0 ? '我是管理员' : '我是普通用户',
			roleSign: i === 0 ? 'admin' : 'common',
			department: i === 0 ? ['vueNextAdmin', 'IT外包服务'] : ['vueNextAdmin', '资本控股'],
			phone: '12345678910',
			email: 'vueNextAdmin@123.com',
			sex: '女',
			password: '123456',
			overdueTime: new Date(),
			status: true,
			describe: i === 0 ? '不可删除' : '测试用户',
			createTime: new Date().toLocaleString(),
		});
	}
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});

</script>

<template>
  <div>
    <div class="m-6">
      <button @click="onOpenAddUser('add')" class="p-2 bg-sky-300 hover:bg-sky-400">Add User</button>
    </div>
    <table class="table-auto border-collapse table-fixed w-full text-sm">
      <thead>
        <tr>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">id</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">name</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">gender</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">edit</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Malcolm Lockyer</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1961</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            <button class="p-2 bg-sky-300 hover:bg-sky-400">Edit</button>
          </td>
        </tr>
        <tr>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Witchy Woman</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Eagles</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1972</td>
        </tr>
        <tr>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Shining Star</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Earth, Wind, and Fire</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">1975</td>
        </tr>
      </tbody>
    </table>

    <UserDialog ref="userDialogRef" @refresh="getTableData()" />
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
