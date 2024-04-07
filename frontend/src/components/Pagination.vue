<template>
    <div class="my-pagination">
      <a href="javascript:;" :class="{ disabled: currentPage === 1 }" @click="changePage(false)">上一页</a>
      <span v-if="currentPage > 3">...</span>
      <a
        href="javascript:;" 
        v-for="item in list"
        :key="item"
        :class="{ active: currentPage === item }"
        @click="changePage(item)"
        >{{ item }}</a
      >
      <span v-if="currentPage < pages - 2">...</span>
      <a href="javascript:;" :class="{ disabled: currentPage === pages }" @click="changePage(true)">下一页</a>
    </div>
  </template>
  <script>
  import { computed, ref } from 'vue'
  export default {
    name: 'MyPagination',
    props: {
      total: {
        type: Number,
        default: 80
      },
      pagesize: {
        type: Number,
        default: 10
      }
    },
    setup(props, { emit, attrs }) {
      // 当前页
      const currentPage = ref(attrs.currentPage)
      // 计算总页数
      debugger
      const pages = computed(() => Math.ceil(props.total / props.pagesize))
      // 页码显示组合
      const list = computed(() => {
        const result = []
        // 总页数小于等于5页的时候
        if (pages.value <= 5) {
          for (let i = 1; i <= pages.value; i++) {
            result.push(i)
          }
        } else {
          // 总页数大于5页的时候
          // 控制两个极端那边的省略号的有无，页码的显示个数与选中页码居中
          if (currentPage.value <= 2) {
            for (let i = 1; i <= 5; i++) {
              result.push(i)
            }
          } else if (currentPage.value >= 3 && currentPage.value <= pages.value - 2) {
            for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
              result.push(i)
            }
          } else if (currentPage.value > pages.value - 2) {
            for (let i = pages.value - 4; i <= pages.value; i++) {
              result.push(i)
            }
          }
        }
        return result
      })
      // 点击上一页下一页页码改变页码
      const changePage = type => {
        // 点击上一页按钮
        if (type === false) {
          if (currentPage.value <= 1) return
          currentPage.value -= 1
        } else if (type === true) {
          // 点击下一页按钮
          if (currentPage.value >= pages.value) return
          currentPage.value += 1
        } else {
          // 点击页码
          currentPage.value = type
        }
        // 传给父组件当前页码，可以在该事件中做相关操作
        emit('change-page', currentPage.value)
      }
      return { currentPage, pages, list, changePage }
    }
  }
  </script>
  <style scoped >
  .my-pagination > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
  }
  .my-pagination > a:hover {
    color:#7dd3fc;
  }
  .my-pagination > a.active {
    background: #7dd3fc;
    color: #fff;
    border-color: #7dd3fc;
  }
  .my-pagination > a.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .my-pagination > a.disabled:hover {
    color: #333;
  }
  .my-pagination > span {
    margin-right: 10px;
  }
  </style>