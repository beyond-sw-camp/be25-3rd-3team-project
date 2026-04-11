<script setup>
import BaseSelect from '../../components/common/BaseSelect.vue'

const summary = [
  { label: '자동 결제 실패', value: '15', sub: '최근 7일 자동결제 실패 건수' },
  { label: '한도 초과 감지', value: '12', sub: '하루 결제 한도 초과 시도' },
  { label: '결제수단 차단 감지', value: '3', sub: '카드/ 결제 수단 차단 발생' },
  { label: '로그인 차단 감지', value: '1', sub: '비정상 로그인 차단' },
]
const rows = [
  {
    when: '2026.03.16 17:54 결제 실패/ 일일 결제 한도 ₩3,000,000 초과',
    type: '한도 초과 감지',
    amount: '₩2,800,000/ 일일 한도 ₩3,000,000',
    method: 'Amazon Prime',
  },
  {
    when: '2026.03.16 18:26 결제 실패/ 잔액 부족',
    type: '자동 결제 실패',
    amount: '₩294,300/ ₩316,000',
    method: 'VISA ****1254',
  },
  {
    when: '2026.03.16 20:02 결제 실패/ 결제 오류',
    type: '로그인 차단 감지',
    amount: '₩256,000',
    method: 'Smart Checkout',
  },
]
</script>

<template>
  <div>
    <div
      class="mt-4 flex flex-wrap items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <span class="mt-0.5 text-lg">⚠</span>
      <p>
        결제수단 차단 감지 시 해당 결제수단 확인 후 차단 해제 또는 다른 결제수단으로 결제를 시도해
        주세요.
      </p>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="s in summary"
        :key="s.label"
        class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
      >
        <p class="text-sm font-medium text-neutral-700">{{ s.label }}</p>
        <p class="mt-2 text-3xl font-bold text-neutral-900">{{ s.value }}</p>
        <p class="mt-1 text-xs text-neutral-500">{{ s.sub }}</p>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
      <BaseSelect>
        <option>마켓</option>
        <option>전체</option>
      </BaseSelect>
      <BaseSelect>
        <option>최근 7일</option>
      </BaseSelect>
      <BaseSelect>
        <option>실패 유형</option>
      </BaseSelect>
      <input
        type="search"
        placeholder="로그인 식별자(ID) 검색"
        class="min-w-[200px] flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
    </div>

    <div class="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table class="min-w-[800px] w-full text-left text-sm">
        <thead class="border-b border-neutral-100 bg-neutral-50 text-xs text-neutral-600">
          <tr>
            <th class="px-4 py-3 font-medium">No</th>
            <th class="px-4 py-3 font-medium">발생 일시 / 오류 메시지</th>
            <th class="px-4 py-3 font-medium">실패 유형</th>
            <th class="px-4 py-3 font-medium">결제 금액/ 설정 한도</th>
            <th class="px-4 py-3 font-medium">결제 수단</th>
            <th class="px-4 py-3 font-medium">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="i" class="border-b border-neutral-100">
            <td class="px-4 py-4">{{ i + 1 }}</td>
            <td class="max-w-xs px-4 py-4 text-neutral-700">{{ r.when }}</td>
            <td class="px-4 py-4">{{ r.type }}</td>
            <td class="px-4 py-4">{{ r.amount }}</td>
            <td class="px-4 py-4">{{ r.method }}</td>
            <td class="px-4 py-4">
              <button type="button" class="text-point hover:underline">상세</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
