<script setup>
const tableRows = [
  {
    date: '03.16',
    orders: '7건',
    expSales: '₩1,360,000',
    actSales: '₩1,540,000',
    expProfit: '₩280,000',
    actProfit: '₩180,000',
    diff: '-3.1%',
  },
]
</script>

<template>
  <div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-neutral-600">예상 마진</p>
        <p class="mt-2 text-3xl font-bold text-neutral-900">₩660,000</p>
        <p class="mt-2 text-sm text-sub">예상 수익률 23.5%</p>
        <div class="mt-6 flex h-40 items-center justify-center rounded-lg bg-point/5">
          <span class="text-sm text-neutral-500">도넛 차트 영역</span>
        </div>
      </div>
      <div class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-neutral-600">실제 마진</p>
        <p class="mt-2 text-3xl font-bold text-neutral-900">₩596,000</p>
        <p class="mt-2 text-sm text-sub">실제 수익률 21.2%</p>
        <div class="mt-6 flex h-40 items-center justify-center rounded-lg bg-sub/5">
          <span class="text-sm text-neutral-500">도넛 차트 영역</span>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-wrap gap-2 rounded-lg border border-neutral-200 bg-white p-4">
      <button type="button" class="rounded-md border border-neutral-300 px-3 py-2 text-sm">
        마켓 🔻
      </button>
      <button type="button" class="rounded-md bg-point/10 px-3 py-2 text-sm font-medium text-point">
        최근 7일
      </button>
      <button type="button" class="rounded-md border border-neutral-300 px-3 py-2 text-sm">
        최근 1개월
      </button>
      <button type="button" class="rounded-md border border-neutral-300 px-3 py-2 text-sm">
        최근 3개월
      </button>
      <button type="button" class="rounded-md border border-neutral-300 px-3 py-2 text-sm">
        기타
      </button>
    </div>

    <div
      class="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600"
    >
      <p class="font-medium text-neutral-800">비용 구성</p>
      <p class="mt-1">상품 원가 · 플랫폼 수수료 · 광고비 · 배송비 · 운영비</p>
    </div>

    <div class="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table class="min-w-[1000px] w-full text-left text-sm">
        <thead class="border-b border-neutral-100 bg-neutral-50 text-xs text-neutral-600">
          <tr>
            <th class="px-3 py-3 font-medium">날짜</th>
            <th class="px-3 py-3 font-medium">주문 수</th>
            <th class="px-3 py-3 font-medium">예상 매출</th>
            <th class="px-3 py-3 font-medium">실제 매출</th>
            <th class="px-3 py-3 font-medium">예상 수익</th>
            <th class="px-3 py-3 font-medium">실제 수익</th>
            <th class="px-3 py-3 font-medium">수익률 차이</th>
            <th class="px-3 py-3 font-medium">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(r, i) in [...tableRows, ...tableRows, ...tableRows]"
            :key="i"
            class="border-b border-neutral-100"
          >
            <td class="px-3 py-4">{{ r.date }}</td>
            <td class="px-3 py-4">{{ r.orders }}</td>
            <td class="px-3 py-4">{{ r.expSales }}</td>
            <td class="px-3 py-4">{{ r.actSales }}</td>
            <td class="px-3 py-4">{{ r.expProfit }}</td>
            <td class="px-3 py-4">{{ r.actProfit }}</td>
            <td class="px-3 py-4 font-medium text-red-600">{{ r.diff }}</td>
            <td class="px-3 py-4">
              <button type="button" class="text-point hover:underline">상세보기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
