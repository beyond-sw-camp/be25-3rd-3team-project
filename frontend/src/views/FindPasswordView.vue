<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const email = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const goToLogin = () => {
  router.push('/login')
}

const goToFindId = () => {
  router.push('/find-id')
}

const handleResetPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '아이디를 입력해주세요.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해주세요.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('email', email.value)

    const response = await api.post('/users/reset-pw', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const html = typeof response.data === 'string' ? response.data : ''

    if (html.includes('임시 비밀번호가 이메일로 발송되었습니다')) {
      successMessage.value = '임시 비밀번호가 이메일로 발송되었습니다.'
      return
    }

    errorMessage.value = '아이디와 이메일 정보를 다시 확인해주세요.'
  } catch (err) {
    if (err.response) {
      errorMessage.value = `비밀번호 찾기 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-0 sm:p-6">
    <div class="grid min-h-screen w-full max-w-[1180px] overflow-hidden bg-[#f3f3f3] max-[980px]:min-h-0 max-[980px]:max-w-[700px] max-[980px]:grid-cols-1 sm:min-h-[760px] md:grid-cols-2">
      <section class="relative flex min-h-[280px] items-start justify-start overflow-hidden bg-[#ff8744] px-[28px] py-[38px] max-[980px]:min-h-[340px] sm:px-[34px] sm:py-[54px]">
        <div class="pointer-events-none absolute right-[92px] top-[18px] z-[1] h-[160px] w-[220px] rotate-[-32deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.8)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[120px] right-[-30px] z-[1] h-[230px] w-[230px] rotate-[28deg] skew-x-[-8deg] skew-y-[-8deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.7)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[26px] left-[-20px] z-[1] h-[70px] w-[180px] rounded-[10px] border-b-[5px] border-b-[rgba(255,234,222,0.55)] border-l-[5px] border-l-transparent opacity-[0.32]"></div>

        <div class="relative z-[2] mt-5">
          <h1 class="m-0 break-keep text-[32px] font-extrabold leading-[1.14] tracking-[-1.5px] text-white max-[980px]:text-[40px] sm:text-[56px]">
            임시 비밀번호를<br />
            발급받고<br />
            다시 로그인하세요
          </h1>

          <p class="mt-[60px] text-[15px] font-medium leading-[1.5] text-[#fff7f2] sm:mt-[120px] sm:text-[18px]">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="flex items-center justify-center bg-[#f3f3f3] px-[18px] pb-10 pt-7 max-[980px]:px-6 max-[980px]:pb-12 max-[980px]:pt-[38px] sm:px-[46px] sm:py-[54px]">
        <div class="w-full max-w-[460px]">
          <h2 class="m-0 text-[34px] font-extrabold leading-[1.1] tracking-[-1px] text-[#101010] max-[980px]:text-[38px] sm:text-[50px]">
            비밀번호 찾기
          </h2>
          <p class="mb-8 mt-[10px] text-[17px] font-medium text-[#7a7a7a]">
            가입한 아이디와 이메일을 입력하면 임시 비밀번호를 발급해드립니다.
          </p>

          <div class="mb-[22px]">
            <label class="mb-2 block text-[15px] font-bold text-[#222222]">아이디</label>
            <input
              v-model="username"
              type="text"
              class="h-16 w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[22px] text-[18px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[18px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[72px] sm:text-[20px] sm:placeholder:text-[20px]"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div class="mb-[22px]">
            <label class="mb-2 block text-[15px] font-bold text-[#222222]">이메일</label>
            <input
              v-model="email"
              type="email"
              class="h-16 w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[22px] text-[18px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[18px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[72px] sm:text-[20px] sm:placeholder:text-[20px]"
              placeholder="이메일을 입력하세요"
              @keyup.enter="handleResetPassword"
            />
          </div>

          <button class="h-[60px] w-full rounded-md bg-[#f39a66] text-[19px] font-bold text-white transition-[background-color,transform] duration-200 hover:bg-[#ef884b] active:translate-y-px sm:h-[66px] sm:text-[22px]" @click="handleResetPassword">
            비밀번호 찾기
          </button>

          <div class="mt-7 flex flex-wrap items-center justify-center gap-[10px] sm:gap-[18px]">
            <button class="bg-transparent p-0 text-[15px] font-semibold text-[#9d9d9d] transition-colors hover:text-[#555555] max-[980px]:text-[17px] sm:text-[19px]" @click="goToLogin">
              로그인으로
            </button>
            <span class="text-[18px] text-[#b5b5b5]">|</span>
            <button class="bg-transparent p-0 text-[15px] font-semibold text-[#9d9d9d] transition-colors hover:text-[#555555] max-[980px]:text-[17px] sm:text-[19px]" @click="goToFindId">
              아이디 찾기
            </button>
          </div>

          <p v-if="errorMessage" class="mt-6 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="mt-6 rounded-lg border border-[#cde9d3] bg-[#eefaf0] px-4 py-[14px] text-[15px] font-semibold text-[#1a7f37]">
            {{ successMessage }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
