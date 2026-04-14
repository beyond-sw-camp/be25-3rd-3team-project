<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const email = ref('')
const nickname = ref('')
const phoneNumber = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const handleSignup = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '아이디를 입력해주세요.'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = '비밀번호를 입력해주세요.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = '비밀번호는 8자 이상이어야 합니다.'
    return
  }

  if (!confirmPassword.value.trim()) {
    errorMessage.value = '비밀번호 확인을 입력해주세요.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  if (!name.value.trim()) {
    errorMessage.value = '이름을 입력해주세요.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해주세요.'
    return
  }

  if (!nickname.value.trim()) {
    errorMessage.value = '닉네임을 입력해주세요.'
    return
  }

  if (!phoneNumber.value.trim()) {
    errorMessage.value = '전화번호를 입력해주세요.'
    return
  }

  const phoneRegex = /^010\d{8}$/
  if (!phoneRegex.test(phoneNumber.value)) {
    errorMessage.value = '전화번호는 010으로 시작하는 11자리 숫자만 가능합니다. 예: 01012345678'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('password', password.value)
    params.append('confirmPassword', confirmPassword.value)
    params.append('name', name.value)
    params.append('email', email.value)
    params.append('nickname', nickname.value)
    params.append('phoneNumber', phoneNumber.value)

    await api.post('/users/signup', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    successMessage.value = '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.'

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (err) {
    if (err.response) {
      errorMessage.value = `회원가입 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-0 sm:p-6">
    <div class="grid min-h-screen w-full max-w-[1280px] overflow-hidden bg-[#f3f3f3] max-[1080px]:min-h-0 max-[1080px]:max-w-[760px] max-[1080px]:grid-cols-1 sm:min-h-[860px] md:grid-cols-[1fr_1.1fr]">
      <section class="relative flex min-h-[250px] items-start justify-start overflow-hidden bg-[#ff8744] px-[28px] py-[38px] max-[1080px]:min-h-[320px] sm:px-[34px] sm:py-[54px]">
        <div class="pointer-events-none absolute right-[92px] top-[18px] z-[1] h-[160px] w-[220px] rotate-[-32deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.8)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[120px] right-[-30px] z-[1] h-[230px] w-[230px] rotate-[28deg] skew-x-[-8deg] skew-y-[-8deg] rounded-[28px] border-4 border-[rgba(255,234,222,0.7)] opacity-[0.32]"></div>
        <div class="pointer-events-none absolute bottom-[26px] left-[-20px] z-[1] h-[70px] w-[180px] rounded-[10px] border-b-[5px] border-b-[rgba(255,234,222,0.55)] border-l-[5px] border-l-transparent opacity-[0.32]"></div>

        <div class="relative z-[2] mt-5">
          <h1 class="m-0 break-keep text-[34px] font-extrabold leading-[1.14] tracking-[-1.5px] text-white max-[1080px]:text-[42px] sm:text-[58px]">
            회원가입하고<br />
            소싱 자동화를<br />
            시작하세요
          </h1>

          <p class="mt-[58px] text-[15px] font-medium leading-[1.5] text-[#fff7f2] sm:mt-[120px] sm:text-[18px]">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="flex items-center justify-center bg-[#f3f3f3] px-[18px] pb-10 pt-7 max-[1080px]:px-[22px] max-[1080px]:pb-11 max-[1080px]:pt-[34px] sm:px-10 sm:py-[46px]">
        <div class="w-full max-w-[620px]">
          <h2 class="m-0 text-[34px] font-extrabold leading-[1.1] tracking-[-1px] text-[#101010] max-[1080px]:text-[40px] sm:text-[50px]">
            AutoSource
          </h2>
          <p class="mb-[30px] mt-[10px] text-[17px] font-medium text-[#7a7a7a]">
            필요한 정보를 입력하고 계정을 만들어주세요.
          </p>

          <div class="mb-6 grid grid-cols-1 gap-y-[18px] sm:gap-x-4 sm:grid-cols-2">
            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">아이디</label>
              <input v-model="username" type="text" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="아이디를 입력하세요" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">이름</label>
              <input v-model="name" type="text" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="이름을 입력하세요" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">비밀번호</label>
              <input v-model="password" type="password" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="비밀번호는 최소 8자 이상이어야 합니다" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">비밀번호 확인</label>
              <input v-model="confirmPassword" type="password" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="비밀번호를 다시 입력하세요" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">이메일</label>
              <input v-model="email" type="email" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="이메일을 입력하세요" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">닉네임</label>
              <input v-model="nickname" type="text" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="닉네임을 입력하세요" />
            </div>

            <div class="flex flex-col sm:col-span-2">
              <label class="mb-2 text-[15px] font-bold text-[#222222]">전화번호</label>
              <input v-model="phoneNumber" type="text" class="h-[58px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none transition-[border-color,background-color] duration-200 placeholder:text-[16px] placeholder:text-[#b3b3b3] focus:border-[#ff8744] focus:bg-white sm:h-[62px]" placeholder="01012345678" />
            </div>
          </div>

          <button class="mb-3 h-[58px] w-full rounded-md bg-[#f39a66] text-[20px] font-bold text-white transition-[background-color,transform] duration-200 hover:bg-[#ef884b] active:translate-y-px sm:h-[62px]" @click="handleSignup">
            회원가입
          </button>

          <button class="h-[58px] w-full rounded-md border border-[#d8d8d8] bg-white text-[18px] font-bold text-[#444444] transition-colors hover:bg-[#fafafa] sm:h-[62px]" @click="goToLogin">
            로그인으로 돌아가기
          </button>

          <p v-if="errorMessage" class="mt-5 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="mt-5 rounded-lg border border-[#cde9d3] bg-[#eefaf0] px-4 py-[14px] text-[15px] font-semibold text-[#1a7f37]">
            {{ successMessage }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
