<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const nickname = ref('')
const email = ref('')
const error = ref('')

onMounted(async () => {
  error.value = ''

  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
    email.value = response.data.email
  } catch (err) {
    if (err.response) {
      error.value = `정보 조회 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goToHome = () => {
  router.push('/')
}

const goToProfileInfo = () => {
  router.push('/profile/info')
}

const goToProfileEdit = () => {
  router.push('/profile/edit')
}

const goToProfileDelete = () => {
  router.push('/profile/delete')
}

const handleLogout = async () => {
  try {
    await api.post('/users/logout')
    alert('로그아웃되었습니다.')
    router.push('/login')
  } catch (err) {
    alert('로그아웃 실패')
  }
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
            마이페이지<br />
            계정을<br />
            관리하세요
          </h1>

          <p class="mt-[58px] text-[15px] font-medium leading-[1.5] text-[#fff7f2] sm:mt-[120px] sm:text-[18px]">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="flex items-center justify-center bg-[#f3f3f3] px-[18px] pb-10 pt-7 max-[1080px]:px-[22px] max-[1080px]:pb-11 max-[1080px]:pt-[34px] sm:px-10 sm:py-[46px]">
        <div class="w-full max-w-[620px]">
          <button class="mb-[18px] rounded-md border border-[#d8d8d8] bg-white px-[18px] py-3 text-[15px] font-bold text-[#444444]" @click="goToHome">
            ← 홈으로
          </button>

          <p class="mb-2 mt-0 text-[14px] font-bold tracking-[0.4px] text-[#ff6b1a]">MY PAGE</p>
          <h2 class="m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-[#101010] max-[1080px]:text-[38px] sm:text-[48px]">
            마이페이지
          </h2>
          <p class="mb-7 mt-[10px] text-[17px] font-medium text-[#7a7a7a]">{{ nickname || username }}님, 무엇을 하시겠어요?</p>

          <div v-if="error" class="mb-4 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
            {{ error }}
          </div>

          <div class="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2">
            <button class="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e2e2e2] bg-white px-6 py-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff8744]" @click="goToProfileInfo">
              <span class="text-[24px] font-extrabold text-[#ff6b1a]">01</span>
              <span class="text-[16px] font-bold text-[#222222]">내 정보 조회</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e2e2e2] bg-white px-6 py-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff8744]" @click="goToProfileEdit">
              <span class="text-[24px] font-extrabold text-[#ff6b1a]">02</span>
              <span class="text-[16px] font-bold text-[#222222]">정보 수정</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] px-6 py-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff8744]" @click="handleLogout">
              <span class="text-[24px] font-extrabold text-[#ff6b1a]">03</span>
              <span class="text-[16px] font-bold text-[#222222]">로그아웃</span>
            </button>

            <button class="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-6 py-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f87171]" @click="goToProfileDelete">
              <span class="text-[24px] font-extrabold text-[#dc2626]">04</span>
              <span class="text-[16px] font-bold text-[#b91c1c]">회원 탈퇴</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
