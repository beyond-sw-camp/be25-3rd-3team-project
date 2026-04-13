<script setup>
import BaseStatCard from '../../components/common/BaseStatCard.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'
import BaseSelect from '../../components/common/BaseSelect.vue'

const stats = [
  { label: '오늘 수집', value: 128 },
  { label: '업로드 대기', value: 42 },
  { label: '판매 중', value: 890 },
  { label: '품절/중지', value: 12 },
]
const chips = (items) => items
</script>

<template>
  <div>
    <section>
      <BaseSectionTitle>수집 / 등록 건수</BaseSectionTitle>
      <div class="mt-3 h-px bg-neutral-200" />
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BaseStatCard
          v-for="stat in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
        />
      </div>
    </section>

    <section class="mt-10">
      <BaseSectionTitle>수집 / 등록 상품 조회</BaseSectionTitle>
      <div class="mt-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <div class="space-y-4 text-sm">
          <div>
            <p class="mb-2 text-neutral-600">수집 날짜별 보기</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in chips(['전체', '오늘', '7일', '1개월', '맞춤'])"
                :key="c"
                type="button"
                class="rounded border border-neutral-300 px-3 py-1.5 hover:bg-neutral-50"
              >
                {{ c }}
              </button>
            </div>
          </div>
          <div>
            <p class="mb-2 text-neutral-600">업로드 날짜별 보기</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in chips(['전체', '오늘', '7일', '1개월', '맞춤'])"
                :key="c"
                type="button"
                class="rounded border border-neutral-300 px-3 py-1.5 hover:bg-neutral-50"
              >
                {{ c }}
              </button>
            </div>
          </div>
          <div>
            <p class="mb-2 text-neutral-600">상태별 보기</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in chips(['전체', '수집 완료', '판매 중'])"
                :key="c"
                type="button"
                class="rounded border border-neutral-300 px-3 py-1.5 hover:bg-neutral-50"
              >
                {{ c }}
              </button>
            </div>
          </div>
          <div>
            <p class="mb-2 text-neutral-600">업로드 상태</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in chips(['전체', '업로드됨', '미업로드'])"
                :key="c"
                type="button"
                class="rounded border border-neutral-300 px-3 py-1.5 hover:bg-neutral-50"
              >
                {{ c }}
              </button>
            </div>
          </div>
          <div>
            <p class="mb-2 text-neutral-600">마켓 타입 · 소싱처</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in chips([
                  '쿠팡',
                  '스마트스토어',
                  '11번가',
                  '옥션',
                  '아마존',
                  '라쿠텐',
                  '타오바오',
                  '알리바바',
                ])"
                :key="c"
                type="button"
                class="rounded border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-50"
              >
                {{ c }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-10">
      <BaseSectionTitle>수집 / 등록 상품 목록</BaseSectionTitle>
      <div class="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table class="min-w-[1000px] w-full text-left text-sm">
          <thead class="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-600">
            <tr>
              <th class="px-3 py-3 font-medium">수정</th>
              <th class="px-3 py-3 font-medium">잠금</th>
              <th class="px-3 py-3 font-medium">해외 마켓 ID</th>
              <th class="px-3 py-3 font-medium">마켓 그룹</th>
              <th class="px-3 py-3 font-medium">썸네일</th>
              <th class="px-3 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 6" :key="n" class="border-b border-neutral-100">
              <td class="px-3 py-3">
                <button type="button" class="text-point hover:underline">수정</button>
              </td>
              <td class="px-3 py-3">—</td>
              <td class="px-3 py-3 font-mono text-xs">B08XYZ{{ n }}KR</td>
              <td class="px-3 py-3">쿠팡</td>
              <td class="px-3 py-3">
                <span class="inline-block size-12 rounded bg-neutral-100" />
              </td>
              <td class="px-3 py-3">
                <span class="rounded bg-emerald-50 px-2 py-0.5 text-xs">판매 중</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 flex items-center justify-end gap-2 text-sm">
        <span class="text-neutral-500">페이지당</span>
        <BaseSelect size="sm">
          <option>10</option>
        </BaseSelect>
      </div>
    </section>
  </div>
</template>
