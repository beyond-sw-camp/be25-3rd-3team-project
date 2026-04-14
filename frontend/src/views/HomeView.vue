<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const nickname = ref('')
const email = ref('')
const error = ref('')
const isLoggedIn = ref(false)

onMounted(async () => {
  error.value = ''

  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
    email.value = response.data.email
    isLoggedIn.value = true
  } catch (err) {
    isLoggedIn.value = false

    if (err.response) {
      if (err.response.status === 401) {
        error.value = ''
      } else {
        error.value = `상태 확인 실패 / status: ${err.response.status}`
      }
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}

const goToProfile = () => {
  router.push('/profile')
}

const handleLogout = async () => {
  try {
    await api.post('/users/logout')
    alert('로그아웃되었습니다.')
    isLoggedIn.value = false
    username.value = ''
    nickname.value = ''
    email.value = ''
    router.push('/login')
  } catch (err) {
    if (err.response) {
      alert(`로그아웃 실패 / status: ${err.response.status}`)
    } else {
      alert('서버 연결 실패')
    }
  }
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-[#f3f3f3]">
    <header class="relative flex min-h-[53px] flex-wrap items-center justify-center gap-3 px-4 py-4 min-[641px]:h-[59px] min-[641px]:justify-between min-[641px]:px-[25px] min-[641px]:py-0">
      <div class="h-[31px] w-[31px] rotate-45 rounded-[6px] border-2 border-[#ffb28a] opacity-55"></div>

      <nav class="flex flex-wrap items-center justify-center gap-4 min-[641px]:justify-end min-[981px]:gap-5">
        <button class="bg-transparent text-[14px] font-semibold text-[#111111]">사용 가이드</button>
        <button class="bg-transparent text-[14px] font-semibold text-[#111111]">서비스 소개</button>

        <button v-if="!isLoggedIn" class="rounded border-2 border-[#ff5a00] bg-transparent px-[18px] py-[5px] text-[14px] font-bold text-[#444444]" @click="goToLogin">
          로그인
        </button>

        <button v-if="isLoggedIn" class="rounded border-2 border-[#ff5a00] bg-transparent px-[18px] py-[5px] text-[14px] font-bold text-[#444444]" @click="goToProfile">
          마이페이지
        </button>
      </nav>
    </header>

    <main class="relative flex h-[calc(100vh-53px)] items-center justify-center px-4 pb-12 pt-6 min-[641px]:h-[calc(100vh-59px)] min-[641px]:px-[17px] min-[641px]:pb-10 min-[641px]:pt-7">
      <div class="pointer-events-none absolute left-[-28px] top-[14px] h-[200px] w-[200px] rotate-[32deg] rounded-[28px] border-4 border-[#ffbf9e] opacity-[0.32]"></div>
      <div class="pointer-events-none absolute bottom-10 right-[-70px] h-[220px] w-[260px] rotate-[24deg] skew-x-[-8deg] skew-y-[-8deg] rounded-[28px] border-4 border-[#ffbf9e] opacity-[0.32]"></div>

      <div class="relative z-[2] w-full max-w-[686px] text-center">
        <h1 class="m-0 text-[34px] font-semibold leading-none tracking-[-1px] text-[#ff5a00] min-[641px]:text-[45px] min-[981px]:text-[63px]">
          AutoSource
        </h1>
        <p class="mb-[35px] mt-[7px] text-[14px] font-medium text-[#ff7b39]">Sourcing Automation System</p>

        <div class="mb-[18px] flex flex-col items-center justify-center gap-[10px] text-[13px] font-semibold tracking-[-0.6px] text-[#4b5563] min-[641px]:flex-row min-[641px]:flex-wrap min-[641px]:gap-[18px] min-[981px]:text-[19px] min-[981px]:gap-[42px]">
          <span>자동 상품 소싱</span>
          <span>국내 마켓 자동 업로드</span>
          <span>최고 마진 자동 선택</span>
        </div>

        <div class="mx-auto max-w-[504px] rounded-[13px] border border-[#ececec] bg-[rgba(255,255,255,0.78)] px-5 py-[21px] backdrop-blur-[4px]">
          <template v-if="isLoggedIn">
            <p class="mb-[7px] mt-0 text-[10px] font-bold tracking-[0.4px] text-[#6b7280]">현재 로그인 상태</p>
            <p class="mb-2 mt-0 text-[15px] font-semibold tracking-[-0.6px] text-[#111827] min-[981px]:text-[20px]">{{ nickname }}님, 반갑습니다.</p>
            <p class="my-[3px] text-[11px] font-medium text-[#4b5563]">아이디 {{ username }}</p>
            <p class="my-[3px] text-[11px] font-medium text-[#4b5563]">이메일 {{ email }}</p>

            <div class="mt-[17px] flex flex-wrap justify-center gap-[10px]">
              <button class="min-h-[38px] min-w-[119px] rounded-md bg-[#ff7b39] px-[17px] text-[13px] font-bold text-white hover:bg-[#ee864b]" @click="goToProfile">
                마이페이지
              </button>
              <button class="min-h-[38px] min-w-[119px] rounded-md border border-[#d1d5db] bg-white px-[17px] text-[13px] font-bold text-[#374151] hover:bg-[#f9fafb]" @click="handleLogout">
                로그아웃
              </button>
            </div>
          </template>

          <template v-else>
            <p class="mb-[7px] mt-0 text-[10px] font-bold tracking-[0.4px] text-[#6b7280]"></p>
            <p class="mb-2 mt-0 text-[15px] font-semibold tracking-[-0.6px] text-[#111827] min-[981px]:text-[20px]">
              로그인하면 더 많은 기능을 사용할 수 있습니다.
            </p>
            <p class="my-[3px] text-[11px] font-medium text-[#4b5563]">소싱 자동화 기능을 바로 사용해보세요.</p>

            <div class="mt-[17px] flex flex-wrap justify-center gap-[10px]">
              <button class="min-h-[38px] w-full rounded-md bg-[#ff7b39] px-[17px] text-[13px] font-bold text-white hover:bg-[#ee864b] min-[641px]:w-auto min-[641px]:min-w-[119px]" @click="goToLogin">
                로그인
              </button>
              <button class="min-h-[38px] w-full rounded-md border border-[#d1d5db] bg-white px-[17px] text-[13px] font-bold text-[#374151] hover:bg-[#f9fafb] min-[641px]:w-auto min-[641px]:min-w-[119px]" @click="goToSignup">
                회원가입
              </button>
            </div>
          </template>
        </div>

        <div v-if="error" class="mx-auto mt-[14px] max-w-[504px] rounded-[7px] border border-[#ffcccc] bg-[#fff0f0] px-[11px] py-[10px] text-[10px] font-semibold text-[#d93025]">
          {{ error }}
        </div>
      </div>
    </main>
  </div>
</template>
