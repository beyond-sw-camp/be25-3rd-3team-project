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

const originalData = ref({})
const error = ref('')
const successMessage = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    name.value = response.data.name || ''
    nickname.value = response.data.nickname
    email.value = response.data.email
    phoneNumber.value = response.data.phoneNumber || ''

    originalData.value = {
      name: response.data.name || '',
      nickname: response.data.nickname,
      phoneNumber: response.data.phoneNumber || '',
    }
  } catch (err) {
    if (err.response) {
      error.value = `정보 조회 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goBack = () => {
  router.push('/profile/info')
}

const handleSave = async () => {
  error.value = ''
  successMessage.value = ''

  if (!nickname.value.trim()) {
    error.value = '닉네임을 입력해줘.'
    return
  }

  if (phoneNumber.value) {
    const phoneRegex = /^010\d{8}$/
    if (!phoneRegex.test(phoneNumber.value)) {
      error.value = '전화번호는 010으로 시작하는 11자리 숫자만 가능해.'
      return
    }
  }

  try {
    const params = new URLSearchParams()
    params.append('name', name.value)
    params.append('nickname', nickname.value)
    params.append('phoneNumber', phoneNumber.value)

    await api.put('/users/me', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    successMessage.value = '정보가 수정됐어.'
    originalData.value = {
      name: name.value,
      nickname: nickname.value,
      phoneNumber: phoneNumber.value,
    }
  } catch (err) {
    if (err.response) {
      error.value = `정보 수정 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
}

const hasChanges = () => {
  return (
    name.value !== originalData.value.name ||
    nickname.value !== originalData.value.nickname ||
    phoneNumber.value !== originalData.value.phoneNumber
  )
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
            내 정보를<br />
            수정하고<br />
            업데이트하세요
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
            ← 내 정보로
          </button>

          <p class="mb-2 mt-0 text-[14px] font-bold tracking-[0.4px] text-[#ff6b1a]">EDIT PROFILE</p>
          <h2 class="m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-[#101010] max-[1080px]:text-[38px] sm:text-[48px]">
            정보 수정
          </h2>
          <p class="mb-7 mt-[10px] text-[17px] font-medium text-[#7a7a7a]">변경할 정보를 입력하고 저장해줘.</p>

          <div v-if="error" class="mb-4 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
            {{ error }}
          </div>

          <div v-if="successMessage" class="mb-4 rounded-lg border border-[#cde9d3] bg-[#eefaf0] px-4 py-[14px] text-[15px] font-semibold text-[#1a7f37]">
            {{ successMessage }}
          </div>

          <div class="mb-[18px] rounded-[10px] border border-[#e2e2e2] bg-white p-[22px]">
            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">로그인 ID</label>
              <input v-model="username" type="text" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f0f0f0] px-[18px] text-[17px] text-[#888888] outline-none" readonly />
              <span class="mt-1 block text-[12px] text-[#999999]">아이디는 변경할 수 없어.</span>
            </div>

            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">이메일</label>
              <input v-model="email" type="email" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f0f0f0] px-[18px] text-[17px] text-[#888888] outline-none" readonly />
              <span class="mt-1 block text-[12px] text-[#999999]">이메일은 변경할 수 없어.</span>
            </div>

            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">사용자명</label>
              <input v-model="name" type="text" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none focus:border-[#ff8744] focus:bg-white" placeholder="이름을 입력하세요." />
            </div>

            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">닉네임 *</label>
              <input v-model="nickname" type="text" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none focus:border-[#ff8744] focus:bg-white" placeholder="닉네임을 입력하세요." />
            </div>

            <div>
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">전화번호</label>
              <input v-model="phoneNumber" type="text" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none focus:border-[#ff8744] focus:bg-white" placeholder="01012345678" />
              <span class="mt-1 block text-[12px] text-[#999999]">010으로 시작하는 11자리 숫자</span>
            </div>
          </div>

          <div class="flex flex-col gap-3 min-[721px]:flex-row">
            <button class="h-[62px] flex-1 rounded-md bg-[#f39a66] text-[18px] font-bold text-white transition-colors enabled:hover:bg-[#ef884b] disabled:cursor-not-allowed disabled:bg-[#cccccc]" :disabled="!hasChanges()" @click="handleSave">
              저장하기
            </button>
            <button class="h-[62px] flex-1 rounded-md border border-[#d8d8d8] bg-white text-[18px] font-bold text-[#444444]" @click="goBack">
              취소
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
