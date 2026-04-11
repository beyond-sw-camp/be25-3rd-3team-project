<script setup>
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'

const filters = [
  { title: '브랜드 유형', hint: '브랜드 유형을 선택하세요.' },
  { title: '검색어 유형', hint: '검색어 유형을 선택하세요.' },
  { title: '시장 규모', hint: '시장 규모를 선택하세요.' },
  { title: '계절성', hint: '많이 팔리는 달을 선택하세요.' },
  { title: '검색 제한', hint: '최대 검색양을 선택하세요.' },
]
const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]
</script>

<template>
  <div>
    <section>
      <BaseSectionTitle>검색 필터</BaseSectionTitle>
      <div class="mt-3 h-px bg-neutral-200" />
      <div class="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(f, i) in filters"
          :key="i"
          class="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <p class="font-medium text-neutral-900">{{ f.title }}</p>
          <p class="mt-2 text-sm text-neutral-500">{{ f.hint }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <label v-for="m in ['A', 'B', 'C']" :key="m" class="flex items-center gap-2 text-sm">
              <input type="radio" :name="`f-${i}`" class="text-point" />
              {{ m }}형
            </label>
          </div>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="m in months"
          :key="m"
          class="inline-flex items-center gap-2 rounded border border-neutral-200 bg-white px-3 py-1 text-sm"
        >
          <span class="size-2 rounded-full bg-point/60" />
          {{ m }}
        </span>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
        >
          검색하기
        </button>
        <button
          type="button"
          class="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
        >
          필터 초기화
        </button>
        <button
          type="button"
          class="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
        >
          카테고리 불러오기
        </button>
      </div>
    </section>

    <section class="mt-10">
      <BaseSectionTitle>검색 결과</BaseSectionTitle>
      <div class="mt-3 h-px bg-neutral-200" />
      <p class="mt-4 text-sm text-neutral-600">2026년 2월 14일 기준 · 검색 완료 : 500 개</p>
      <div class="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table class="min-w-[900px] w-full text-left text-sm">
          <thead class="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-600">
            <tr>
              <th class="px-3 py-3 font-medium">키워드</th>
              <th class="px-3 py-3 font-medium">유형</th>
              <th class="px-3 py-3 font-medium">브랜드</th>
              <th class="px-3 py-3 font-medium">트렌드</th>
              <th class="px-3 py-3 font-medium">최근 30일 검색량</th>
              <th class="px-3 py-3 font-medium">작년 총 검색량</th>
              <th class="px-3 py-3 font-medium">경쟁 강도</th>
              <th class="px-3 py-3 font-medium">추천 지수</th>
              <th class="px-3 py-3 font-medium">계절성</th>
              <th class="px-3 py-3 font-medium">1년 평균 트렌드</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in 5" :key="k" class="border-b border-neutral-100">
              <td class="px-3 py-3 font-medium">샘플키워드{{ k }}</td>
              <td class="px-3 py-3 text-neutral-600">브랜드</td>
              <td class="px-3 py-3 text-neutral-600">—</td>
              <td class="px-3 py-3 text-point">상승</td>
              <td class="px-3 py-3">12,400</td>
              <td class="px-3 py-3">98,200</td>
              <td class="px-3 py-3">중</td>
              <td class="px-3 py-3 font-semibold text-point">82</td>
              <td class="px-3 py-3">봄</td>
              <td class="px-3 py-3 text-neutral-500">+4.2%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button type="button" class="rounded border border-neutral-300 px-3 py-1.5 text-xs">
          표 상태 저장
        </button>
        <button type="button" class="rounded border border-neutral-300 px-3 py-1.5 text-xs">
          표 상태 초기화
        </button>
        <button
          type="button"
          class="rounded border border-point bg-point/10 px-3 py-1.5 text-xs text-point"
        >
          선택한 키워드 저장
        </button>
        <button type="button" class="rounded border border-neutral-300 px-3 py-1.5 text-xs">
          현재 결과 액셀 저장
        </button>
      </div>
    </section>
  </div>
</template>
