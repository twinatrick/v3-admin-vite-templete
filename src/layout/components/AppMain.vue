<script lang="ts" setup>
import { RouteRecordName } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

const tagsViewStore = useTagsViewStore()

const componentWithRouteName = (component: any, name?: RouteRecordName | null) => {
  component.type.__name = name || component.type.__name
  return component
}
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <div class="h-full flex flex-col">
            <keep-alive :include="tagsViewStore.cachedViews">
              <component :is="componentWithRouteName(Component, route.fullPath)" :key="route.path" />
            </keep-alive>
          </div>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
