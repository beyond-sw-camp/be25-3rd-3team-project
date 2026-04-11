<script setup>
import BaseBadge from '../../components/common/BaseBadge.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'
import BaseSelect from '../../components/common/BaseSelect.vue'

const sites = [{ site: 'AMAZON', login: 'admin123', method: 'ID/PW 입력', status: '연동중' }]
</script>

<template>
  <div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <BaseSectionTitle>소싱 사이트 연동 상태</BaseSectionTitle>
        <div class="mt-6 flex items-center justify-center py-8">
          <BaseBadge variant="success">연동 중</BaseBadge>
        </div>
      </div>
      <div class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <BaseSectionTitle>수집 현황 요약</BaseSectionTitle>
        <div class="mt-6 flex justify-around border-t border-neutral-100 pt-4">
          <div>
            <p class="text-sm text-neutral-500">전체 수집 완료 건수</p>
            <p class="mt-1 text-2xl font-bold text-neutral-900">2,340</p>
            <p class="text-xs text-neutral-400">건</p>
          </div>
          <div class="w-px bg-neutral-200" />
          <div>
            <p class="text-sm text-neutral-500">실시간 수집 진행 건수</p>
            <p class="mt-1 text-2xl font-bold text-point">15</p>
            <p class="text-xs text-neutral-400">건</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <div class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <BaseSectionTitle>아마존 연동 정보 조회</BaseSectionTitle>
        <div class="mt-4 flex flex-wrap gap-2">
          <BaseSelect>
            <option>등록된 사이트</option>
            <option>AMAZON</option>
          </BaseSelect>
          <input
            type="search"
            placeholder="로그인 식별자(ID) 검색"
            class="min-w-[200px] flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div class="mt-4 overflow-hidden rounded-lg border border-neutral-200">
          <div
            class="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-2 border-b border-neutral-100 bg-neutral-50 px-3 py-2 text-xs text-neutral-600"
          >
            <span>사이트</span>
            <span>로그인식별자(ID)</span>
            <span>로그인 방식</span>
            <span>연동 상태</span>
            <span>관리</span>
          </div>
          <div
            v-for="(s, i) in sites"
            :key="i"
            class="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-2 border-b border-neutral-100 px-3 py-3 text-sm last:border-0"
          >
            <span>{{ s.site }}</span>
            <span>{{ s.login }}</span>
            <span>{{ s.method }}</span>
            <span class="flex items-center gap-1">
              <span class="size-2 rounded-full bg-emerald-500" />
              {{ s.status }}
            </span>
            <BaseButton variant="ghost">수정</BaseButton>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <BaseSectionTitle>아마존 연동 정보 등록 / 수정</BaseSectionTitle>
        <p class="mt-2 text-xs text-neutral-500">최근 동기화 : 2026-03-15 18:49:57</p>
        <div class="mt-6 space-y-4">
          <div>
            <label class="text-sm text-neutral-600">소싱 사이트 :</label>
            <BaseSelect class="mt-1 w-full">
              <option>AMAZON</option>
            </BaseSelect>
          </div>
          <div>
            <label class="text-sm text-neutral-600">로그인 방식 :</label>
            <BaseSelect class="mt-1 w-full">
              <option>ID / PASSWORD 입력</option>
            </BaseSelect>
          </div>
          <div>
            <label class="text-sm text-neutral-600">소싱 사이트 ID :</label>
            <input class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-neutral-600">소싱 사이트 PW :</label>
            <input
              type="password"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-600">연동 정보 활성화</span>
            <button
              type="button"
              class="relative h-6 w-10 rounded-full bg-point transition"
              aria-pressed="true"
            >
              <span class="absolute right-0.5 top-0.5 size-5 rounded-full bg-white shadow" />
            </button>
          </div>
          <BaseButton variant="secondary" block>연동 테스트</BaseButton>
          <BaseButton size="lg" block>연동 정보 저장하기</BaseButton>
          <p class="text-center text-xs text-emerald-600">연동 성공하였습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>
