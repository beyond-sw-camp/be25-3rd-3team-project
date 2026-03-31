<template>

  <div class="layout">

    <!-- 사이드바 -->
    <aside class="sidebar">

      <h3 class="menu-title">카드 관리</h3>

      <ul class="menu">

        <li class="active">결제 수단</li>
        <li></li>
        <li></li>

      </ul>

    </aside>
    
    <CardList/>

  </div>

  

</template>

<script>

import CardList from "../components/card/CardList.vue"

export default{

  components:{
    CardList
  }

}

</script>


<style scoped>

.layout{
  display:flex;
  background:#f6f7f8;
  min-height:100vh;
}

/* 사이드바 */

.sidebar{
  width:220px;
  background:white;
  padding:20px;
  border-right:1px solid #eee;
}

.menu-title{
  font-size:14px;
  margin-top:20px;
  margin-bottom:10px;
  color:#666;
}

.menu{
  list-style:none;
  padding:0;
}

.menu li{
  padding:8px;
  cursor:pointer;
  border-radius:4px;
}

.menu li.active{
  background:#ffecec;
  color:#ff4d4f;
  font-weight:bold;
}

/* 메인 */

.content{
  flex:1;
  padding:30px;
}

.page-title{
  margin-bottom:20px;
}

/* 필터 */

.filters{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:20px;
}

.filter-btn{
  border:1px solid #ddd;
  background:white;
  padding:6px 12px;
  border-radius:4px;
  cursor:pointer;
}

.filter-btn.active{
  background:#ff4d4f;
  color:white;
}

.search-box{
  margin-left:auto;
}

.search-box input{
  padding:6px 10px;
  border:1px solid #ddd;
  border-radius:4px;
}

/* 테이블 */

.order-table{
  width:100%;
  border-collapse:collapse;
  background:white;
}

.order-table th{
  background:#fafafa;
  border-bottom:1px solid #eee;
  padding:10px;
  font-size:13px;
}

.order-table td{
  border-bottom:1px solid #f1f1f1;
  padding:10px;
  font-size:13px;
}

.mall{
  font-size:11px;
  color:#888;
}

.phone{
  font-size:12px;
  color:#888;
}

/* 상태 */

.status{
  padding:4px 8px;
  border-radius:6px;
  font-size:12px;
}

.status.ready{
  background:#e8f6f0;
  color:#28a745;
}

.margin{
  font-size:12px;
  color:#999;
}

</style>