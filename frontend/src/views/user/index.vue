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
        <tr v-for="o in state.tableData.data">
			<td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
				{{ o.id }}
			  </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
			{{ o.name }}
		  </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
			{{ o.gender }}
		  </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            <button @click="onOpenEditUser('edit', o)" class="p-2 bg-sky-300 hover:bg-sky-400">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
	<Pagination 
	class="mt-6"
	ref="paginationRef"
	:total="state.tableData.total" 
	:pagesize="state.tableData.param.pageSize" 
	:currentPage="state.tableData.param.pageNum" 
	@change-page="onHandleCurrentChange" />
    <UserDialog ref="userDialogRef" @refresh="refresh()" />
  </div>

</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { UserApi } from "@/api/user/index";
import Pagination from "@/components/Pagination.vue";
const userDialogRef = ref();
const paginationRef = ref();
const userApi = UserApi();
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

const refresh = ()=>{
	paginationRef.value.currentPage = 1;
	state.tableData.param.pageNum = 1;
	getTableData();
}

// 初始化表格数据
const getTableData = () => {
	let params = {
		page:state.tableData.param.pageNum,
		size:state.tableData.param.pageSize
	}
	userApi.getUsers(params).then((res:any)=>{
		if (res && res.status ==0) {
			state.tableData.data = res.data.list;
			state.tableData.total = res.data.total;
		}

	});
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

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
