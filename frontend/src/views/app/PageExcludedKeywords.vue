<script setup>
import { ref } from 'vue'
import BaseButton from '../../components/common/BaseButton.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'

const forbidden = ref('')
const exclude = ref('')
const rows = [
  { type: '금지', word: '정품보장', note: '과장 표현' },
  { type: '제외', word: '해외직구', note: '카테고리 제외' },
]
</script>

<template>
  <div>
    <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div class="flex gap-2 text-sm text-neutral-700">
        <span class="text-amber-600">ⓘ</span>
        <p>수집·등록 시 아래 단어가 포함된 상품은 자동으로 필터링됩니다.</p>
      </div>

      <BaseSectionTitle class="mt-8">금지단어</BaseSectionTitle>
      <p class="mt-2 text-sm text-neutral-600">상품명·옵션에 사용할 수 없는 단어를 등록합니다.</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <input
          v-model="forbidden"
          type="text"
          placeholder="금지어 입력 후 추가"
          class="min-w-[240px] flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <BaseButton>+ 추가하기</BaseButton>
      </div>

      <BaseSectionTitle class="mt-10">제외 단어</BaseSectionTitle>
      <p class="mt-2 text-sm text-neutral-600">소싱 대상에서 제외할 키워드입니다.</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <input
          v-model="exclude"
          type="text"
          placeholder="제외어 입력 후 추가"
          class="min-w-[240px] flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <BaseButton variant="secondary">+ 추가하기</BaseButton>
      </div>
    </section>

    <section class="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-neutral-100 bg-neutral-50 text-xs text-neutral-600">
          <tr>
            <th class="px-4 py-3 font-medium">구분</th>
            <th class="px-4 py-3 font-medium">단어</th>
            <th class="px-4 py-3 font-medium">메모</th>
            <th class="px-4 py-3 font-medium">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="i" class="border-b border-neutral-100">
            <td class="px-4 py-4">{{ r.type }}</td>
            <td class="px-4 py-4 font-medium">{{ r.word }}</td>
            <td class="px-4 py-4 text-neutral-600">{{ r.note }}</td>
            <td class="px-4 py-4">
              <BaseButton variant="danger">삭제</BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
