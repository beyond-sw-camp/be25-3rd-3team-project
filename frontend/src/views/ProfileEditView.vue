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
    console.error('내 정보 조회 실패:', err)

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

const goToDelete = () => {
  router.push('/profile/delete')
}

const handleLogout = async () => {
  try {
    await api.post('/users/logout')
    alert('로그아웃됐어.')
    router.push('/login')
  } catch (err) {
    console.error('로그아웃 실패:', err)
    alert('로그아웃 실패')
  }
}
</script>

<template>
  <div class="info-page">
    <div class="info-shell">
      <section class="brand-panel">
        <div class="brand-shape brand-cube"></div>
        <div class="brand-shape brand-paper"></div>
        <div class="brand-shape brand-line"></div>

        <div class="brand-content">
          <h1 class="brand-copy">
            내 계정 정보를<br />
            한눈에<br />
            확인하세요
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

          <p class="page-kicker">ACCOUNT INFO</p>
          <h2 class="page-title">내 정보</h2>
          <p class="page-desc">현재 계정에 저장된 정보를 확인할 수 있어.</p>

          <div v-if="error" class="message error-message">
            {{ error }}
          </div>

          <div v-if="!error" class="info-card">
            <div class="info-row">
              <span class="info-label">로그인 ID</span>
              <span class="info-value">{{ username }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">사용자명</span>
              <span class="info-value">{{ name || '-' }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">닉네임</span>
              <span class="info-value">{{ nickname }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">이메일</span>
              <span class="info-value">{{ email }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">전화번호</span>
              <span class="info-value">{{ phoneNumber || '-' }}</span>
            </div>
          </div>

          <div class="action-row">
            <button class="primary-btn" @click="goToEdit">
              정보 수정
            </button>

            <button class="danger-btn" @click="goToDelete">
              회원 탈퇴
            </button>
          </div>

          <button class="secondary-btn" @click="handleLogout">
            로그아웃
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.info-page {
  min-height: 100vh;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.info-shell {
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
  color: #ff6b1a;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.page-title {
  margin: 0;
  color: #101010;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.page-desc {
  margin: 10px 0 28px 0;
  color: #7a7a7a;
  font-size: 17px;
  font-weight: 500;
}

.info-card {
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  background: #ffffff;
  overflow: hidden;
  margin-bottom: 18px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid #eeeeee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: #7a7a7a;
  font-size: 15px;
  font-weight: 700;
}

.info-value {
  color: #111111;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  word-break: break-all;
}

.action-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.primary-btn,
.danger-btn,
.secondary-btn {
  height: 62px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.primary-btn {
  flex: 1;
  border: none;
  background: #f39a66;
  color: #ffffff;
}

.primary-btn:hover {
  background: #ef884b;
}

.danger-btn {
  flex: 1;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
}

.secondary-btn {
  width: 100%;
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

@media (max-width: 1080px) {
  .info-shell {
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
  .info-page {
    padding: 0;
  }

  .info-shell {
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

  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-value {
    text-align: left;
  }
}
</style>