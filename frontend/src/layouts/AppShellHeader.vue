<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarNav } from '../config/appShellLayoutConfig'

const route = useRoute()

const currentPageTitle = computed(() => {
  // link에 parentLabel이 있으면 "상위 제목 > 현재 제목" 형식으로 표시한다.
  const activeItem = sidebarNav.find(
    (item) =>
      ['head_link', 'link'].includes(item.type) &&
      (route.path === item.to || route.path.startsWith(item.to + '/')),
  )

  if (!activeItem) return ''

  return activeItem.parentLabel
    ? `${activeItem.parentLabel} > ${activeItem.label}`
    : activeItem.label
})
</script>

<template>
  <header
    class="flex h-[66px] shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:px-10"
  >
    <h1 class="m-0 text-xl font-bold leading-none text-neutral-900">{{ currentPageTitle }}</h1>
    <div
      class="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-600"
    >
      <span class="size-2 rounded-full bg-emerald-500" />
      로그인중
    </div>
  </header>
</template>
