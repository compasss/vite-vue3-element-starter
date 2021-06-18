<template>
  <el-container class="app-w">
    <sl-side></sl-side>
    <el-container direction="vertical">
      <sl-top></sl-top>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SlSide from '@/components/Layout/SlSide.vue';
import SlTop from '@/components/Layout/SlTop.vue';
import routes from '@/router/routes.js';
import { onMounted, ref } from 'vue';

export default {
  components: { SlSide, SlTop },
  setup() {
    // render side menu
    let menu = []
    routes.forEach(item => {
      if (item.menu) {
        if (item.children && item.children.length) {
          
        } else {
          menu.push(item)
        }
      }
    });
    const cc = ref(3)
    const accountClick = () => {
      cc.value += 1;
    }
    console.log('c', cc)

    onMounted(() => {
      console.log('mounted')
    })

    return {
      cc,
      accountClick
    }
  }
}
</script>