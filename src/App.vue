<template>
<el-container class="app-w">
  <sl-side></sl-side>
  <el-container direction="vertical">
    <sl-top></sl-top>
    <el-main>
      content
    </el-main>
  </el-container>
</el-container>
</template>

<script setup>
  import SlSide from './components/Layout/SlSide.vue';
  import SlTop from './components/Layout/SlTop.vue';
</script>