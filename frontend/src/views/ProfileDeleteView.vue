<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const password = ref('')
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

  try {
    const params = new URLSearchParams()
    params.append('password', password.value)

    const response = await api.post('/users/delete', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('회원 탈퇴 응답:', response)

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
    console.error('회원 탈퇴 실패:', err)

    if (err.response) {
      errorMessage.value = `회원 탈퇴 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}
</script>

<template>
  <div class="delete-page">
    <div class="delete-shell">
      <section class="brand-panel">
        <div class="brand-shape brand-cube"></div>
        <div class="brand-shape brand-paper"></div>
        <div class="brand-shape brand-line"></div>

        <div class="brand-content">
          <h1 class="brand-copy">
            계정 탈퇴는<br />
            신중하게<br />
            결정하세요
          </h1>

          <p class="brand-sub">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="content-panel">
        <div class="content-wrap">
          <button class="back-btn" @click="goBack">
            ← 마이페이지로
          </button>

          <p class="page-kicker danger-kicker">DANGER ZONE</p>
          <h2 class="page-title danger-title">회원 탈퇴</h2>
          <p class="page-desc">
            탈퇴하면 계정과 관련된 모든 데이터가 삭제되고, 되돌릴 수 없어.
          </p>

          <div class="warning-box">
            정말 탈퇴할 거면 현재 비밀번호를 입력해줘.
          </div>

          <div class="form-card">
            <div class="form-group">
              <label class="input-label">비밀번호 확인</label>
              <input
                  v-model="password"
                  type="password"
                  class="text-input"
                  placeholder="현재 비밀번호를 입력해줘"
              />
            </div>

            <div v-if="errorMessage" class="message error-message">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="message success-message">
              {{ successMessage }}
            </div>

            <div class="action-row">
              <button class="danger-btn" @click="handleDelete">
                탈퇴하기
              </button>

              <button class="secondary-btn" @click="goBack">
                취소
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.delete-page {
  min-height: 100vh;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.delete-shell {
  width: 100%;
  max-width: 1280px;
  min-height: 760px;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  background: #f3f3f3;
  overflow: hidden;
}

.brand-panel {
  position: relative;
  background: #ff8744;
  padding: 54px 34px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
}

.brand-content {
  position: relative;
  z-index: 2;
  margin-top: 20px;
}

.brand-copy {
  margin: 0;
  color: #ffffff;
  font-size: 56px;
  line-height: 1.14;
  font-weight: 800;
  letter-spacing: -1.5px;
  word-break: keep-all;
}

.brand-sub {
  margin-top: 120px;
  color: #fff7f2;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 500;
}

.brand-shape {
  position: absolute;
  opacity: 0.32;
  z-index: 1;
  pointer-events: none;
}

.brand-cube {
  top: 18px;
  right: 92px;
  width: 220px;
  height: 160px;
  border: 4px solid rgba(255, 234, 222, 0.8);
  border-radius: 28px;
  transform: rotate(-32deg);
}

.brand-paper {
  right: -30px;
  bottom: 120px;
  width: 230px;
  height: 230px;
  border: 4px solid rgba(255, 234, 222, 0.7);
  border-radius: 28px;
  transform: rotate(28deg) skew(-8deg, -8deg);
}

.brand-line {
  left: -20px;
  bottom: 26px;
  width: 180px;
  height: 70px;
  border-bottom: 5px solid rgba(255, 234, 222, 0.55);
  border-left: 5px solid transparent;
  border-radius: 10px;
}

.content-panel {
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 46px 40px;
}

.content-wrap {
  width: 100%;
  max-width: 620px;
}

.back-btn {
  margin-bottom: 18px;
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid #d8d8d8;
  background: #ffffff;
  color: #444444;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.page-kicker {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.danger-kicker {
  color: #dc2626;
}

.page-title {
  margin: 0;
  font-size: 46px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.danger-title {
  color: #7f1d1d;
}

.page-desc {
  margin: 10px 0 20px 0;
  color: #7a7a7a;
  font-size: 17px;
  font-weight: 500;
}

.warning-box {
  margin-bottom: 18px;
  padding: 16px 18px;
  border-radius: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  color: #9a3412;
  font-size: 14px;
  font-weight: 600;
}

.form-card {
  padding: 22px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
}

.form-group {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  color: #222222;
  font-size: 15px;
  font-weight: 700;
}

.text-input {
  width: 100%;
  height: 62px;
  padding: 0 18px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background: #f7f7f7;
  color: #222222;
  font-size: 17px;
  outline: none;
}

.text-input:focus {
  border-color: #ff8744;
  background: #ffffff;
}

.action-row {
  display: flex;
  gap: 12px;
}

.danger-btn,
.secondary-btn {
  flex: 1;
  height: 62px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.danger-btn {
  border: none;
  background: #dc2626;
  color: #ffffff;
}

.secondary-btn {
  border: 1px solid #d8d8d8;
  background: #ffffff;
  color: #444444;
}

.message {
  margin-bottom: 16px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
}

.error-message {
  background: #fff0f0;
  border: 1px solid #ffcccc;
  color: #d93025;
}

.success-message {
  background: #eefaf0;
  border: 1px solid #cde9d3;
  color: #1a7f37;
}

@media (max-width: 1080px) {
  .delete-shell {
    grid-template-columns: 1fr;
    max-width: 760px;
    min-height: auto;
  }

  .brand-panel {
    min-height: 320px;
    padding: 38px 28px;
  }

  .brand-copy {
    font-size: 40px;
  }

  .brand-sub {
    margin-top: 58px;
    font-size: 15px;
  }

  .content-panel {
    padding: 34px 22px 44px 22px;
  }

  .page-title {
    font-size: 38px;
  }
}

@media (max-width: 720px) {
  .delete-page {
    padding: 0;
  }

  .delete-shell {
    min-height: 100vh;
  }

  .brand-panel {
    min-height: 250px;
  }

  .brand-copy {
    font-size: 32px;
  }

  .page-title {
    font-size: 32px;
  }

  .action-row {
    flex-direction: column;
  }
}
</style>