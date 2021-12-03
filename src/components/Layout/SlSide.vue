<template>
  <el-aside width="220px" class="app-aside">
    <el-menu :default-openeds="['1', '3']"
      background-color="#273238"
      text-color="#b4b4b4"
      class="aside-menu"
      active-text-color="#14ae67">
      <el-submenu index="1">
        <template #title><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.app-aside{
  background-color: rgb(39, 50, 56);
}
.aside-menu{
  border-right: 0;
}
.app-aside::-webkit-scrollbar
{
  width: 12px;
  height: 12px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
.app-aside::-webkit-scrollbar-track
{
  background-color: rgb(39, 50, 56, .8);;
}

/*定义滑块 内阴影+圆角*/
.app-aside::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>