<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const password = ref('')
const confirmText = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const goBack = () => {
  router.push('/profile')
}

const handleDelete = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!password.value.trim()) {
    errorMessage.value = '현재 비밀번호를 입력해줘.'
    return
  }

  if (confirmText.value !== '탈퇴합니다') {
    errorMessage.value = '확인 문구를 정확히 입력해줘.'
    return
  }

  if (!confirm('정말 탈퇴할 거야? 이 작업은 되돌릴 수 없어.')) {
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('password', password.value)

    const response = await api.post('/users/delete', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const finalUrl = response?.request?.responseURL || ''

    if (finalUrl.includes('/users/login')) {
      successMessage.value = '회원 탈퇴가 완료됐어.'
      setTimeout(() => {
        router.push('/login')
      }, 800)
      return
    }

    successMessage.value = '회원 탈퇴 요청이 처리됐어.'
    setTimeout(() => {
      router.push('/login')
    }, 800)
  } catch (err) {
    if (err.response) {
      errorMessage.value = `회원 탈퇴 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
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
            계정 탈퇴는<br />
            신중하게<br />
            결정하세요
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

          <p class="mb-2 mt-0 text-[14px] font-bold tracking-[0.4px] text-[#dc2626]">DANGER ZONE</p>
          <h2 class="m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-1px] text-[#7f1d1d] max-[1080px]:text-[38px] sm:text-[46px]">
            회원 탈퇴
          </h2>
          <p class="mb-5 mt-[10px] text-[17px] font-medium text-[#7a7a7a]">
            탈퇴하면 계정과 관련된 모든 데이터가 삭제되고, 되돌릴 수 없어.
          </p>

          <div class="mb-[18px] rounded-[10px] border border-[#fed7aa] bg-[#fff7ed] px-[18px] py-4 text-[14px] font-semibold text-[#9a3412]">
            <strong>주의:</strong> 탈퇴 후에는 모든 데이터가 영구 삭제되며 복구할 수 없어.
          </div>

          <div class="rounded-[10px] border border-[#e2e2e2] bg-white p-[22px]">
            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">현재 비밀번호</label>
              <input v-model="password" type="password" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none focus:border-[#ff8744] focus:bg-white" placeholder="현재 비밀번호를 입력해줘" />
            </div>

            <div class="mb-4">
              <label class="mb-2 block text-[15px] font-bold text-[#222222]">확인 문구 입력</label>
              <input v-model="confirmText" type="text" class="h-[62px] w-full rounded-md border border-[#dddddd] bg-[#f7f7f7] px-[18px] text-[17px] text-[#222222] outline-none focus:border-[#ff8744] focus:bg-white" placeholder="'탈퇴합니다'를 입력하세요." />
              <span class="mt-1 block text-[12px] text-[#999999]">안전을 위해 '탈퇴합니다'라고 입력해줘.</span>
            </div>

            <div v-if="errorMessage" class="mb-4 rounded-lg border border-[#ffcccc] bg-[#fff0f0] px-4 py-[14px] text-[15px] font-semibold text-[#d93025]">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="mb-4 rounded-lg border border-[#cde9d3] bg-[#eefaf0] px-4 py-[14px] text-[15px] font-semibold text-[#1a7f37]">
              {{ successMessage }}
            </div>

            <div class="mt-5 flex flex-col gap-3 min-[721px]:flex-row">
              <button class="h-[62px] flex-1 rounded-md bg-[#dc2626] text-[18px] font-bold text-white hover:bg-[#b91c1c]" @click="handleDelete">
                탈퇴하기
              </button>

              <button class="h-[62px] flex-1 rounded-md border border-[#d8d8d8] bg-white text-[18px] font-bold text-[#444444]" @click="goBack">
                취소
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
