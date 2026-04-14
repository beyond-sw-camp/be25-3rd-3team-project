<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const name = ref('')
const nickname = ref('')
const email = ref('')
const phoneNumber = ref('')
const error = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
    email.value = response.data.email

    if (response.data.name) {
      name.value = response.data.name
    }

    if (response.data.phoneNumber) {
      phoneNumber.value = response.data.phoneNumber
    }
  } catch (err) {
    if (err.response) {
      error.value = `내 정보 조회 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goBack = () => {
  router.push('/profile')
}

const goToEdit = () => {
  router.push('/profile/edit')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-0 sm:p-6">
    <div class="grid min-h-screen w-full max-w-[1280px] overflow-hidden bg-[#f3f3f3] max-[1080px]:min-h-0 max-[1080px]:max-w-[760px] max-[1080px]:grid-cols-1 sm:min-h-[760px] md:grid-cols-[1fr_1.05fr]">
      <section class="relative flex min-h-[250px] items-start justify-start overflow-hidden bg-[#ff8744] px-[28px] py-[38px] max-[1080px]:min-h-[320px] sm:px-[34px] sm:py-[54px]">
        <div class="pointer-events-none absolute right-[92px] top-[18px] z-[1] h-[160px] w-[220px] rotate-[-32deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.8)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[120px] right-[-30px] z-[1] h-[230px] w-[230px] rotate-[28deg] skew-x-[-8deg] skew-y-[-8deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.7)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[26px] left-[-20px] z-[1] h-[70px] w-[180px] rounded-[10px] border-b-[5px] border-b-[rgba(255,234,222,0.55)] border-l-[5px] border-l-transparent opacity-[0.32]"></div>

        <div class="relative z-[2] mt-5">
          <h1 class="m-0 break-keep text-[32px] font-extrabold leading-[1.14] tracking-[-1.5px] text-white max-[1080px]:text-[40px] sm:text-[56px]">
            내 계정 정보를<br />
            한눈에<br />
            확인하세요
          </h1>

          <p class="mt-[58px] text-[15px] font-medium leading-[1.5] text-[#fff7f2] sm:mt-[120px] sm:text-[18px]">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="flex items-center justify-center bg-[#f3f3f3] px-[18px] pb-10 pt-7 max-[1080px]:px-[22px] max-[1080px]:pb-11 max-[1080px]:pt-[34px] sm:px-10 sm:py-[46px]">
        <div class="w-full max-w-[620px]">
          <button class="mb-[18px] rounded-md border border-[#d8d8d8] bg-white px-[18px] py-3 text-[15px] font-bold text-[#444444]" @click="goBack">
            ← 마이페이지로
          </button>

          <p class="mb-2 mt-0 text-[14px] font-bold tracking-[0.4px] text-[#ff6b1a]">ACCOUNT INFO</p>
          <h2 class="m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-[#101010] max-[1080px]:text-[38px] sm:text-[48px]">
            내 정보
          </h2>
          <p class="mb-7 mt-[10px] text-[17px] font-medium text-[#7a7a7a]">현재 계정에 저장된 정보를 확인할 수 있어요.</p>

          <div v-if="error" class="mb-4 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
            {{ error }}
          </div>

          <div v-if="!error" class="mb-[18px] overflow-hidden rounded-[10px] border border-[#e2e2e2] bg-white">
            <div class="flex flex-col gap-1 border-b border-[#eeeeee] px-5 py-[18px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
              <span class="text-[15px] font-bold text-[#7a7a7a]">로그인 ID</span>
              <span class="break-all text-left text-[16px] font-bold text-[#111111] min-[721px]:text-right">{{ username }}</span>
            </div>
            <div class="flex flex-col gap-1 border-b border-[#eeeeee] px-5 py-[18px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
              <span class="text-[15px] font-bold text-[#7a7a7a]">사용자명</span>
              <span class="break-all text-left text-[16px] font-bold text-[#111111] min-[721px]:text-right">{{ name || '-' }}</span>
            </div>
            <div class="flex flex-col gap-1 border-b border-[#eeeeee] px-5 py-[18px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
              <span class="text-[15px] font-bold text-[#7a7a7a]">닉네임</span>
              <span class="break-all text-left text-[16px] font-bold text-[#111111] min-[721px]:text-right">{{ nickname }}</span>
            </div>
            <div class="flex flex-col gap-1 border-b border-[#eeeeee] px-5 py-[18px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
              <span class="text-[15px] font-bold text-[#7a7a7a]">이메일</span>
              <span class="break-all text-left text-[16px] font-bold text-[#111111] min-[721px]:text-right">{{ email }}</span>
            </div>
            <div class="flex flex-col gap-1 px-5 py-[18px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
              <span class="text-[15px] font-bold text-[#7a7a7a]">전화번호</span>
              <span class="break-all text-left text-[16px] font-bold text-[#111111] min-[721px]:text-right">{{ phoneNumber || '-' }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button class="h-[62px] flex-1 rounded-md bg-[#f39a66] text-[18px] font-bold text-white transition-colors hover:bg-[#ef884b]" @click="goToEdit">
              정보 수정
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
