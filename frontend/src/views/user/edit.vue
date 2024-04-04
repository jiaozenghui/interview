<template>
   <div @click="openModal()">打开模态框</div>
    <Modal v-on:confirmModal="confirmModal" :modalShow="modalShow" :title="modalTitle">
      <div style="width:100%;padding-left:20px" >
        <div class="input-button" style="margin-bottom:0px" v-if="!loginSign">
          <input type="text" placeholder="请输入您的邮箱！" v-model="email"  style="width:100%">
        </div>
      </div>
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
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档
    // https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18
         */
        const data = reactive({
            // 是否登录标识
            loginSign: false,
            // modal显示标识
            modalShow: false,
            // modal标题
            modalTitle: '评论回复',
            // 回复评论内容
            comment_content_replay: '',
            // 邮箱
            email:'',
        });
 
 
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
            confirmModal, getWangEditorReplayValue, openModal,
            ...dataRef
        }
    }
};
</script>