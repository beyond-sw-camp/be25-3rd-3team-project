<script setup>
import BaseBadge from '../../components/common/BaseBadge.vue'
import BaseButton from '../../components/common/BaseButton.vue'

const cards = [
  { name: 'Amazon Prime', mask: '**** 4242', primary: true },
  { name: 'VISA', mask: '**** 1254', primary: false },
  { name: 'Smart Checkout', mask: '연동 계정', primary: false },
]
</script>

<template>
  <div>
    <p class="mt-2 text-sm text-neutral-600">
      Figma (10) 화면은 이미지 레이어로만 제공되어, 동일 메뉴 구조에 맞춘 관리 UI로 구성했습니다.
    </p>
    <div class="mt-8 flex flex-wrap gap-3">
      <BaseButton> 결제수단 추가 </BaseButton>
      <BaseButton variant="secondary"> 기본 결제수단 변경 </BaseButton>
    </div>
    <ul class="mt-8 space-y-4">
      <li
        v-for="(c, i) in cards"
        :key="i"
        class="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
      >
        <div>
          <p class="font-semibold text-neutral-900">{{ c.name }}</p>
          <p class="text-sm text-neutral-500">{{ c.mask }}</p>
        </div>
        <div class="flex items-center gap-2">
          <BaseBadge v-if="c.primary" variant="primary"> 기본 </BaseBadge>
          <BaseButton variant="ghost">수정</BaseButton>
          <BaseButton variant="danger">삭제</BaseButton>
        </div>
      </li>
    </ul>
  </div>
</template>
