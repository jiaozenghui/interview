<template>
   <div @click="openModal()">打开模态框</div>
    <Modal v-on:confirmModal="confirmModal" :modalShow="modalShow" :footerShow="footerShow" :title="modalTitle">
        <form
        @submit="checkForm"
        method="post"
      >         
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border-b border-gray-900/10 pb-12">
            <div class="sm:col-span-4">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div class="mt-2">
                <input type="text" name="name" id="name" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
            <div class="sm:col-span-4">
              <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
              <div class="mt-2">
                <select   id="gender"
                v-model="gender"
                name="gender" autocomplete="gender" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">
                    <option >Male</option>
                    <option>Female</option>
                </select>
              </div>
            </div>
          </div>  
          <div class="mt-6 flex items-center justify-end gap-x-6 ">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
          </div>
      </form>
    </Modal>
</template>
<script lang="ts">

import {
    reactive,
    toRefs,
} from "vue";
import Modal from "./../../components/Modal.vue";

export default {
    name: "articleDetail",
    components: {
        Modal,
    },
    setup(props: any, content: any) {
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18
         */
        const data = reactive({
            modalShow: false,
            footerShow: false,
            errors: {},
            name: null,
            age: null,
            gender: null
        });
 
        const checkForm = (e:any) => {
            e.preventDefault();
            if (data.name && data.age) {
                return true;
            }

            data.errors = {};

            if (!data.name) {
                data.errors['name'] = 'Name required.';
            }
            if (!data.gender) {;
                data.errors['gender'] = 'Gender required.';
            }
        }
        /**
         * @name: 提交回复(点击模态框确定或者取消)
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         * @param:  sign    boolean 点击确定传true，点击取消传false
         */
        const confirmModal = (sign: boolean) => {
            // 关闭模态框
            if (!sign) 
            {
                data.modalShow = false; return;
            }
            // 编写你想做的操作
        }
 
        /**
         * @name: 打开模态框
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         */
        const openModal = () => {
            data.modalShow = true;
        }
        
        /**
         * @name: 获取评论回复wangeditor数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-27 
         */
        const getWangEditorReplayValue = (str: string) => {
            data.comment_content_replay = str;
        }
        /**
         * @name: 将data绑定值dataRef
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10
         */
        const dataRef = toRefs(data);
        return {
            confirmModal, getWangEditorReplayValue, openModal, checkForm,
            ...dataRef
        }
    }
};
</script>