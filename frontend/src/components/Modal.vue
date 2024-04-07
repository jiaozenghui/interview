<template>
  <div class="modal-backdrop" v-if="modalShow">
     <div class="modal" >
        <div class="modal-header">
          <div><h3>{{title}}</h3></div>
          <div class="close-img" @click="onCancel(false)">
            X
          </div>
        </div>
        <div class="modal-body">
          <!-- 插槽 官方文档：https://cn.vuejs.org/v2/guide/components-slots.html -->
          <slot />
        </div>
        <div class="modal-footer" v-if="footerShow">
            <button type="button" class="btn-close" @click="confirmModal(false)">关闭</button>
            <button type="button" class="btn-confirm bg-sky-300 hover:bg-sky-400" @click="confirmModal(true)">确认</button>
        </div>
    </div>
 
  </div>
</template>
 <style scoped>
  @import "./modal.css";
</style>
 
<script lang="ts">
// 引入路由
import {  
    reactive, 
    toRefs, 
} from "vue";

export default {
  name: 'modal',
  props: {  
    modalShow: {
        type: Boolean,
        default: false, 
    },
    footerShow: {
      type: Boolean,
        default: false, 
    },
    title: {
        type: String,
        default: '提示', 
    },
  },

  setup(props: any, content: any)
  {             
    const data = reactive({
        // 菜单显示标识
        modalShow: props.modalShow
    });
 
    const onCancel = (sign:boolean) => {
      // 子组件向父组件传值 
      content.emit('onCancel', sign);
    }

    const confirmModal = (sign:boolean) => {
      // 子组件向父组件传值 
      content.emit('confirmModal', sign);
    } 
    const dataRef = toRefs(data);
    return {
      confirmModal,
      onCancel,
      ...dataRef
    }
  },
}
</script>