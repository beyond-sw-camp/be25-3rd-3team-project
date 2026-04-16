<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const imgPackage = 'https://www.figma.com/api/mcp/asset/9b3f6b40-e76d-45fe-bb6f-c4ce378c0a54'
const imgSend = 'https://www.figma.com/api/mcp/asset/2190b7a2-2812-4e74-ad1a-a278b2780722'

const userId = ref('')
const password = ref('')
const rememberId = ref(false)

function onSubmit(e) {
  e.preventDefault()
  router.push('/app/sourcing/category')
}
</script>

<template>
  <div class="flex min-h-svh w-full flex-col bg-white font-sans md:flex-row">
    <!-- 좌측 브랜딩 -->
    <aside
      class="relative min-h-[42vh] w-full overflow-hidden bg-[rgba(255,122,51,0.94)] text-white md:min-h-svh md:w-1/2"
    >
      <div
        class="pointer-events-none absolute -top-12 left-[17%] h-[470px] w-[499px] overflow-hidden opacity-95 max-md:left-4 max-md:w-[280px]"
        aria-hidden="true"
      >
        <div class="absolute inset-[8.34%_12.5%_8%_12.5%]">
          <div class="absolute inset-[-1.02%_-1.07%]">
            <img :src="imgPackage" alt="" class="block size-full max-w-none" />
          </div>
        </div>
      </div>

      <div
        class="pointer-events-none absolute bottom-[8%] right-[8%] flex h-[280px] w-[280px] items-center justify-center max-md:hidden lg:h-[360px] lg:w-[360px]"
        aria-hidden="true"
      >
        <div class="flex-none -scale-y-100 rotate-180">
          <div class="relative h-full w-full overflow-hidden">
            <div class="absolute inset-[8.33%]">
              <div class="absolute inset-[-0.5%]">
                <img :src="imgSend" alt="" class="block size-full max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative z-[1] flex h-full flex-col justify-center px-8 py-12 sm:px-12 md:px-16 lg:pl-20"
      >
        <h2
          class="max-w-[553px] text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[70px] lg:leading-[1.15]"
        >
          <span class="block">지금 로그인하고</span>
          <span class="block">소싱 자동화를</span>
          <span class="block">경험하세요</span>
        </h2>
        <p
          class="mt-8 max-w-md text-base font-medium text-white/95 sm:mt-10 sm:text-lg md:text-[20px]"
        >
          Sourcing Automation System
          <br />
          - AutoSource
        </p>
      </div>
    </aside>

    <!-- 우측 폼 -->
    <section
      class="flex w-full flex-1 flex-col justify-center px-6 py-10 sm:px-10 md:w-1/2 md:py-16 lg:px-20"
    >
      <div class="mx-auto w-full max-w-[736px]">
        <RouterLink
          to="/"
          class="mb-6 inline-block text-sm text-neutral-500 no-underline hover:text-point md:mb-8"
        >
          ← 시작 페이지
        </RouterLink>
        <h1 class="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-10 md:text-[60px]">
          AutoSource
        </h1>

        <form class="space-y-6 md:space-y-8" @submit="onSubmit">
          <div>
            <label class="sr-only" for="login-id">아이디</label>
            <input
              id="login-id"
              v-model="userId"
              type="text"
              autocomplete="username"
              placeholder="아이디를 입력하세요."
              class="h-16 w-full rounded-[5px] border border-[#d9d9d9] px-4 text-lg text-neutral-900 placeholder:text-[#aaa] outline-none ring-point/30 focus:ring-2 md:h-[87px] md:px-6 md:text-[30px]"
            />
          </div>
          <div>
            <label class="sr-only" for="login-pw">비밀번호</label>
            <input
              id="login-pw"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="비밀번호를 입력하세요."
              class="h-16 w-full rounded-[5px] border border-[#d9d9d9] px-4 text-lg text-neutral-900 placeholder:text-[#aaa] outline-none ring-point/30 focus:ring-2 md:h-[87px] md:px-6 md:text-[30px]"
            />
          </div>

          <label class="flex cursor-pointer items-center gap-3 text-black md:gap-4 md:text-[30px]">
            <input
              v-model="rememberId"
              type="checkbox"
              class="size-9 shrink-0 rounded-[5px] border border-[#d9d9d9] text-point focus:ring-point md:size-[36px]"
            />
            아이디 저장
          </label>

          <button
            type="submit"
            class="flex h-16 w-full items-center justify-center rounded-[5px] border border-sub bg-[rgba(255,92,4,0.59)] text-lg font-medium text-white transition hover:bg-[rgba(255,92,4,0.72)] md:h-[87px] md:text-[30px]"
          >
            로그인
          </button>
        </form>

        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-3 text-lg font-medium text-[#aaa] md:mt-10 md:gap-6 md:text-[30px]"
        >
          <a href="#" class="no-underline hover:text-neutral-600">회원가입하기</a>
          <span class="text-neutral-300" aria-hidden="true">|</span>
          <a href="#" class="no-underline hover:text-neutral-600">비밀번호 찾기</a>
        </div>
      </div>
    </section>
  </div>
</template>
