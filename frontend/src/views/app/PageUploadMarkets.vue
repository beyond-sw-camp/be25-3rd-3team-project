<script setup>
import { computed, ref } from 'vue'
import BaseButton from '../../components/common/BaseButton.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'
import BaseSelect from '../../components/common/BaseSelect.vue'

const amazonPriceAdjust = ref(true)
const competeAdjust = ref(true)
const autoPublish = ref(true)
const shippingType = ref('PAID')
const isFreeShipping = computed(() => shippingType.value === 'FREE')
</script>

<template>
  <div>
    <div class="grid gap-6 xl:grid-cols-2">
      <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div
          class="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
        >
          <label for="market-select" class="shrink-0">국내 마켓</label>
          <BaseSelect id="market-select" class="w-full">
            <option>쿠팡</option>
            <option>스마트스토어</option>
            <option>11번가</option>
            <option>옥션</option>
            <option>아마존</option>
          </BaseSelect>
        </div>

        <div
          class="mt-6 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 items-center"
        >
          <span class="px-2">ⓘ</span>
          <p>
            이 설정은 앞으로 등록할 상품의 가격에 반영됩니다.
            <br />
            이미 업로드된 제품에는 적용되지 않습니다.
          </p>
        </div>

        <BaseSectionTitle class="mt-6">기본 판매 가격 설정</BaseSectionTitle>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <label class="block text-sm">
            <span class="text-neutral-600">목표 마진율 (%)</span>
            <input
              type="number"
              value="30"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label class="block text-sm">
            <span class="text-neutral-600">최소 마진 (원)</span>
            <input
              type="number"
              value="8000"
              step="100"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label class="block text-sm">
            <span class="text-neutral-600">마켓 수수료 (%)</span>
            <input
              type="number"
              value="10"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label class="block text-sm">
            <span class="text-neutral-600">카드 수수료 (%)</span>
            <input
              type="number"
              value="3.3"
              step="0.1"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label class="block text-sm">
            <span class="text-neutral-600">환율</span>
            <input
              type="number"
              value="1350"
              step="50"
              class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label for="roundingUnit" class="block text-sm text-neutral-600">
            단위 올림
            <BaseSelect id="roundingUnit" class="mt-1 w-full">
              <option>10000원</option>
              <option>1000원</option>
              <option>100원</option>
              <option>50원</option>
              <option>10원</option>
            </BaseSelect>
          </label>
        </div>

        <div class="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p class="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <span class="text-point">✓</span>
            가격 계산 기준
          </p>
          <p class="mt-2 text-sm text-neutral-600">
            Amazon 상품 가격을 기준으로 환율과 수수료를 적용하여 판매 가격을 자동 계산
          </p>
        </div>

        <BaseSectionTitle class="mt-6">AI 기반 자동 최적화</BaseSectionTitle>
        <div class="space-y-4 border-t border-neutral-100 pt-6">
          <label class="flex items-start gap-3 text-sm">
            <input
              v-model="amazonPriceAdjust"
              type="checkbox"
              class="mt-1 rounded border-neutral-300 text-point"
            />
            <span>
              <span class="font-medium text-neutral-900">Amazon 가격 기준 자동 조정</span>
              <span class="mt-1 block text-neutral-600"
                >Amazon 가격 변동에 따라 판매 가격을 자동으로 조정합니다.</span
              >
            </span>
          </label>
          <label class="flex items-start gap-3 text-sm">
            <input
              v-model="competeAdjust"
              type="checkbox"
              class="mt-1 rounded border-neutral-300 text-point"
            />
            <span>
              <span class="font-medium text-neutral-900">경쟁 상품 가격 자동 조정</span>
              <span class="mt-1 block text-neutral-600"
                >경쟁 상품 최저가보다 100원 낮게 자동 설정</span
              >
            </span>
          </label>
        </div>
      </section>

      <section class="space-y-6">
        <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <BaseSectionTitle>자동 보호 설정</BaseSectionTitle>
          <label class="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" checked class="mt-1 rounded border-neutral-300 text-point" />
            <span>
              <span class="font-medium">최소 마진 보호</span>
              <span class="mt-1 block text-neutral-600">
                설정한 최소 마진 이하로 이익이 내려가지 않도록 자동으로 가격을 조정합니다.
              </span>
            </span>
          </label>
          <label class="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" checked class="mt-1 rounded border-neutral-300 text-point" />
            <span>
              <span class="font-medium">환율 변동 시 가격 자동 업데이트</span>
              <span class="mt-1 block text-neutral-600"
                >환율 변동이 발생하면 판매 가격을 자동으로 업데이트합니다.</span
              >
            </span>
          </label>
          <label class="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" checked class="mt-1 rounded border-neutral-300 text-point" />
            <span>
              <span class="font-medium">손실 발생 시 판매 중지</span>
              <span class="mt-1 block text-neutral-600">
                가격 변동으로 손실이 발생할 경우 해당 상품을 자동으로 판매 중지합니다.
              </span>
            </span>
          </label>
        </div>

        <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <BaseSectionTitle>배송비 설정</BaseSectionTitle>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label class="text-sm">
              <span class="text-neutral-600">배송비 종류</span>
              <BaseSelect v-model="shippingType" class="mt-1 w-full">
                <option value="PAID">유료 배송</option>
                <option value="FREE">무료 배송</option>
              </BaseSelect>
            </label>
            <label class="text-sm">
              <span class="text-neutral-600">기본 배송비</span>
              <input
                type="number"
                value="5000"
                step="1000"
                class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm disabled:bg-neutral-100 disabled:text-neutral-400"
                :disabled="isFreeShipping"
              />
            </label>
            <label class="text-sm">
              <span class="text-neutral-600">제주 도서산간 추가비용</span>
              <input
                type="number"
                value="8000"
                step="1000"
                class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>
            <label class="text-sm">
              <span class="text-neutral-600">반품비 (편도)</span>
              <input
                type="number"
                value="10000"
                step="1000"
                class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div
            class="mt-4 flex gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-900"
          >
            <span></span>
            <p>
              ⓘ 국내 마켓 업로드 시, 마켓 배송비 정책에 맞지 않으면 상품 배송비가 자동으로 변경되어
              업로드될 수 있습니다.
              <br />
              ⓘ 해외 상품(구매대행)은 무료배송이라도 반품비/ 교환비를 반드시 입력해야 합니다.
              <br />
              ⓘ 국내 마켓 정책에 따라 해외 상품 반품비(편도)는 최소 5,000원 이상 권장됩니다.
            </p>
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <BaseSectionTitle>상품 소싱 등록 설정</BaseSectionTitle>
          <label class="mt-3 flex items-start gap-3 text-sm">
            <input
              v-model="autoPublish"
              type="checkbox"
              class="mt-1 rounded border-neutral-300 text-point"
            />
            <span>
              <span class="font-medium text-neutral-900">국내 마켓 자동 등록</span>
              <span class="mt-1 block text-neutral-600"
                >소싱 상품을 가공 한 이후 등록 대기 상태를 거치지 않고 마켓켓에 자동으로
                등록하니다.</span
              >
            </span>
          </label>
        </div>

        <BaseButton size="lg" block> 설정 정보 저장하기 </BaseButton>
      </section>
    </div>
  </div>
</template>
