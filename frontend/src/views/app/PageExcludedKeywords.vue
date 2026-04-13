<script setup>
import { ref } from 'vue'
import BaseButton from '../../components/common/BaseButton.vue'
import BaseCheckTable from '../../components/common/BaseCheckTable.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'

const forbidden = ref('')
const exclude = ref('')
const selectedKeys = ref([])
const columns = [
  { key: 'type', label: '구분' },
  { key: 'word', label: '단어', cellClass: 'font-medium' },
  { key: 'note', label: '메모', cellClass: 'text-neutral-600' },
  { key: 'management', label: '관리' },
]
const rows = [
  { id: 'forbidden-1', type: '금지', word: '정품보장', note: '과장 표현' },
  { id: 'exclude-1', type: '제외', word: '해외직구', note: '카테고리 제외' },
]
</script>

<template>
  <div>
    <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <BaseSectionTitle>금지단어</BaseSectionTitle>
      <div class="mt-2 flex">
        <!-- <p class="mt-2 text-sm text-neutral-600">상품명·옵션에 사용할 수 없는 단어를 등록합니다.</p> -->
        <span class="mr-2 text-amber-600">ⓘ</span>
        <p class="text-sm text-neutral-700">
          상품명에 해당 단어가 포함되면 검색, 수집, 업로드 과정에서 자동으로 제외됩니다.
        </p>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <input
          v-model="forbidden"
          type="text"
          placeholder="금지어 입력 후 추가"
          class="min-w-[240px] flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <BaseButton>+ 추가하기</BaseButton>
      </div>

      <BaseSectionTitle class="mt-10">치환 단어</BaseSectionTitle>
      <div class="mt-2 flex">
        <span class="mr-2 text-amber-600">ⓘ</span>
        <p class="text-sm text-neutral-700">
          특정 단어를 다른 표현으로 자동 변경됩니다. (예 : 무료배송 → 배송비 포함)
        </p>
      </div>
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

    <section class="mt-8">
      <div class="mb-3 flex items-center justify-between gap-3">
        <BaseSectionTitle>등록 단어 목록</BaseSectionTitle>
        <span class="text-sm text-neutral-500">{{ selectedKeys.length }}개 선택</span>
      </div>
      <BaseCheckTable
        v-model:selected-keys="selectedKeys"
        :columns="columns"
        :rows="rows"
        row-key="id"
        select-all-label="등록 단어 전체 선택"
        :row-select-label="(row) => `${row.word} 선택`"
      >
        <template #cell-management>
          <BaseButton variant="danger">삭제</BaseButton>
        </template>
      </BaseCheckTable>
    </section>
  </div>
</template>
