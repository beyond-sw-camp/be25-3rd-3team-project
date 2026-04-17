<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const rememberId = ref(false)

const usernameError = ref('')
const passwordError = ref('')
const generalError = ref('')
const successMessage = ref('')

const oauthBaseUrl = (api.defaults.baseURL || '').replace(/\/$/, '')

const handleLogin = async () => {
  usernameError.value = ''
  passwordError.value = ''
  generalError.value = ''
  successMessage.value = ''

  if (!username.value.trim()) {
    usernameError.value = '아이디를 입력하세요.'
    return
  }

  if (!password.value.trim()) {
    passwordError.value = '비밀번호를 입력하세요.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('password', password.value)

    await api.post('/users/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    await api.get('/users/me')

    successMessage.value = '로그인 성공'
    router.push('/')
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        generalError.value = '아이디나 비밀번호가 맞지 않습니다.'
      } else {
        generalError.value = `로그인 실패 / status: ${err.response.status}`
      }
    } else {
      generalError.value = '서버 연결 실패'
    }
  }
}

const goToSignup = () => {
  router.push('/signup')
}

const goToFindId = () => {
  router.push('/find-id')
}

const goToFindPassword = () => {
  router.push('/find-password')
}

const goToHome = () => {
  router.push('/')
}

const handleGoogleLogin = () => {
  window.location.href = `${oauthBaseUrl}/oauth2/authorization/google`
}

const handleKakaoLogin = () => {
  window.location.href = `${oauthBaseUrl}/oauth2/authorization/kakao`
}

const handleNaverLogin = () => {
  window.location.href = `${oauthBaseUrl}/oauth2/authorization/naver`
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-white">
    <div class="grid h-full w-full grid-cols-1 md:grid-cols-[9fr_11fr]">
      <section class="relative flex flex-col justify-between overflow-hidden bg-[#ff7b39] px-12 py-8 md:px-20 md:py-10">
        <div class="pointer-events-none absolute right-20 top-10 z-[1] h-32 w-48 rotate-[-25deg] rounded-2xl border-4 border-white/20"></div>
        <div class="pointer-events-none absolute bottom-32 right-[-20px] z-[1] h-48 w-48 rotate-[20deg] rounded-2xl border-4 border-white/20"></div>
        <div class="pointer-events-none absolute left-[-40px] top-1/3 z-[1] h-24 w-24 rotate-[45deg] rounded-xl border-4 border-white/15"></div>
        <div class="pointer-events-none absolute bottom-20 right-1/4 z-[1] h-16 w-16 rotate-[-15deg] rounded-lg bg-white/10"></div>

        <div class="relative z-[2]">
          <h1 class="m-0 text-[40px] font-bold leading-[1.2] text-white md:text-[52px] lg:text-[60px]">
            <span class="inline-flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80" @click="goToHome">
              AutoSource
            </span>
            <br />
            <span class="text-[34px] md:text-[44px] lg:text-[50px]">로그인</span>
          </h1>
          <p class="mt-4 text-[18px] font-medium text-white/80 md:text-[20px]">
            지금 로그인하고 소싱과 주문을 관리해 보세요.
          </p>
        </div>

        <div class="relative z-[2]">
          <p class="text-[16px] font-medium leading-[1.6] text-white/90 md:text-[18px]">
            Sourcing Automation System
          </p>
        </div>
      </section>

      <section class="flex flex-col justify-center overflow-y-auto bg-white px-6 py-8 md:px-12 lg:px-20">
        <div class="mx-auto w-full max-w-[600px]">
          <h2 class="mb-4 mt-8 text-[28px] font-bold text-[#111827] md:text-[32px]">
            로그인
          </h2>

          <div class="mb-6 h-[1.5px] w-full bg-[#d1d5db]"></div>

          <div class="mb-2 flex items-center gap-3">
            <label class="w-[120px] flex-shrink-0 text-[17px] font-bold text-[#111827]">아이디</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="h-[50px] w-[calc(100%-120px)] rounded-md border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#111827] outline-none transition-all duration-200 placeholder:text-[14px] placeholder:text-[#9ca3af] focus:border-[#ff7b39] md:h-[56px] md:text-[15px]"
              placeholder="아이디를 입력하세요."
            />
          </div>
          <p v-if="usernameError" class="mb-4 ml-[132px] text-[13px] font-medium text-[#dc2626]">
            {{ usernameError }}
          </p>

          <div class="mb-2 flex items-center gap-3">
            <label class="w-[120px] flex-shrink-0 text-[17px] font-bold text-[#111827]">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="h-[50px] w-[calc(100%-120px)] rounded-md border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#111827] outline-none transition-all duration-200 placeholder:text-[14px] placeholder:text-[#9ca3af] focus:border-[#ff7b39] md:h-[56px] md:text-[15px]"
              placeholder="비밀번호를 입력하세요."
              @keyup.enter="handleLogin"
            />
          </div>
          <p v-if="passwordError" class="mb-4 ml-[132px] text-[13px] font-medium text-[#dc2626]">
            {{ passwordError }}
          </p>

          <div class="mb-6 flex items-center gap-2 pl-[132px]">
            <input v-model="rememberId" type="checkbox" class="h-[16px] w-[16px] accent-[#ff7b39]" />
            <span class="text-[14px] font-medium text-[#374151]">아이디 저장</span>
          </div>

          <div class="mb-6 flex items-center gap-4">
            <button
              class="h-[50px] flex-1 rounded-md bg-[#9ca3af] text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#6b7280] md:h-[56px] md:text-[15px]"
              @click="goToSignup"
            >
              회원가입
            </button>
            <button
              class="h-[50px] flex-1 rounded-md bg-[#ff7b39] text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#ee864b] md:h-[56px] md:text-[15px]"
              @click="handleLogin"
            >
              로그인
            </button>
          </div>

          <div class="mb-8 flex items-center justify-center gap-4">
            <button class="text-[14px] font-bold text-[#6b7280] transition-colors hover:text-[#ff7b39]" @click="goToFindId">
              아이디 찾기
            </button>
            <span class="text-[14px] text-[#d1d5db]">|</span>
            <button class="text-[14px] font-bold text-[#6b7280] transition-colors hover:text-[#ff7b39]" @click="goToFindPassword">
              비밀번호 찾기
            </button>
          </div>

          <div class="mb-6 h-[1.5px] w-full bg-[#d1d5db]"></div>

          <div>
            <p class="mb-4 text-center text-[15px] font-bold text-[#374151]">소셜 로그인</p>

            <button class="mb-3 flex h-[48px] w-full items-center justify-center gap-2 rounded-md border border-[#d1d5db] bg-white text-[14px] font-bold text-[#374151] transition-all duration-200 hover:bg-[#f9fafb] md:h-[52px] md:text-[15px]" @click="handleGoogleLogin">
              Google로 로그인
            </button>

            <button class="mb-3 flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#fee500] text-[14px] font-bold text-[#191919] transition-all duration-200 hover:brightness-[0.98] md:h-[52px] md:text-[15px]" @click="handleKakaoLogin">
              Kakao로 로그인
            </button>

            <button class="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#03c75a] text-[14px] font-bold text-white transition-all duration-200 hover:brightness-[1.05] md:h-[52px] md:text-[15px]" @click="handleNaverLogin">
              Naver로 로그인
            </button>
          </div>

          <p v-if="generalError" class="mt-6 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] font-medium text-[#dc2626]">
            {{ generalError }}
          </p>

          <p v-if="successMessage" class="mt-6 rounded-lg border border-[#86efac] bg-[#f0fdf4] px-4 py-3 text-[13px] font-medium text-[#16a34a]">
            {{ successMessage }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
