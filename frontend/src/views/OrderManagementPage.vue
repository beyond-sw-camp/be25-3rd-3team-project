<template>

<div class="layout">

<!-- 사이드바 -->
<aside class="sidebar">

<h3 class="menu-title">주문 관리</h3>

<ul class="menu">
<li :class="{active:currentPage==='all'}" @click="changePage('all')">전체 주문</li>
<li :class="{active:currentPage==='auto'}" @click="changePage('auto')">자동 주문 현황</li>
<li :class="{active:currentPage==='failed'}" @click="changePage('failed')">취소 / 환불</li>
</ul>

<h3 class="menu-title">정산</h3>

<ul class="menu">
<li>정산 관리</li>
<li>수익 관리</li>
</ul>

</aside>


<!-- 메인 -->
<main class="content">

<h2 class="page-title">{{pageTitle}}</h2>


<!-- 필터 -->
<div class="filters">

<button
class="filter-btn"
:class="{active:currentPage==='all'}"
@click="changePage('all')">
전체 주문
</button>

<button
class="filter-btn"
:class="{active:currentPage==='auto'}"
@click="changePage('auto')">
자동 주문 현황
</button>

<div class="search-box">
<input v-model="keyword" placeholder="상품 ID 또는 키워드 검색"/>
</div>

</div>


<table class="order-table">

<thead>

<tr v-if="currentPage==='all'">
<th></th>
<th>주문번호</th>
<th>고객</th>
<th>연락처</th>
<th>상품</th>
<th>해외몰</th>
<th>결제금액</th>
<th>마진</th>
<th>상태</th>
<th>관리</th>
</tr>

<tr v-if="currentPage==='auto'">
<th></th>
<th>주문번호</th>
<th>마켓</th>
<th>자동주문 상태</th>
<th>상품</th>
<th>결제금액</th>
<th>로그</th>
<th>관리</th>
</tr>

<tr v-if="currentPage==='failed'">
<th>주문번호</th>
<th>고객</th>
<th>상품</th>
<th>상태</th>
</tr>

</thead>


<tbody>

<tr v-for="o in orders" :key="o.orderId || o.id">

<!-- 전체 주문 -->
<template v-if="currentPage==='all'">

<td><input type="checkbox"/></td>
<td>{{o.orderId}}</td>
<td>{{o.customerName}}</td>
<td>{{o.customerPhone}}</td>
<td>{{o.productName}}</td>
<td>{{o.overseasMall}}</td>
<td>{{format(o.paymentAmount)}}</td>
<td>{{format(o.margin)}}</td>

<td>
<span class="status" :class="statusClass(o.autoOrderStatus)">
{{o.autoOrderStatus}}
</span>
</td>

<td>
<button class="cancel" @click="cancelOrderHandler(o.orderId)">
주문취소
</button>
</td>

</template>


<!-- 자동 주문 -->
<template v-if="currentPage==='auto'">

<td><input type="checkbox"/></td>
<td>{{o.orderId}}</td>
<td><span class="mall">coupang</span></td>

<td>
<span class="status" :class="statusClass(o.autoOrderStatus)">
{{o.autoOrderStatus}}
</span>
</td>

<td>{{o.productName}}</td>
<td>{{format(o.paymentAmount)}}</td>

<td>
<div class="log-box">

<p><b>상태:</b> {{o.autoOrderStatus}}</p>

<p v-if="o.autoOrderStatus==='Ready'">
주문 대기중
</p>

<p v-if="o.autoOrderStatus==='Ordered'">
쿠팡 주문 완료
</p>

<p v-if="o.autoOrderStatus==='Shipping'">
배송 진행중
</p>

<p v-if="o.autoOrderStatus==='Failed'">
주문 실패
</p>

</div>
</td>

<td>
<button class="manage-btn" @click="openManage(o)">
관리
</button>
</td>

</template>


<!-- 실패 -->
<template v-if="currentPage==='failed'">

<td>{{o.id}}</td>
<td>{{o.customerName}}</td>
<td>{{o.productName}}</td>

<td>
<span class="status status-failed">FAILED</span>
</td>

</template>

</tr>

</tbody>

</table>

</main>

</div>

</template>



<script>

import {
getOrderManagement,
cancelOrder,
getFailedOrders
} from "../api/orderApi"

export default{

data(){

return{
orders:[],
currentPage:"all",
pageTitle:"전체 주문",
keyword:""
}

},

async mounted(){

const savedPage = localStorage.getItem("orderPage")

if(savedPage){

this.currentPage = savedPage

}

await this.changePage(this.currentPage)

},

methods:{


async changePage(page){

this.currentPage = page

localStorage.setItem("orderPage",page)

if(page==="all"){

this.pageTitle="전체 주문"
this.orders = await getOrderManagement()

}

else if(page==="auto"){

this.pageTitle="자동 주문 현황"

const all = await getOrderManagement()

this.orders = all.filter(o =>
o.autoOrderStatus==="Ready" ||
o.autoOrderStatus==="Ordered" ||
o.autoOrderStatus==="Shipping"
)

}

else if(page==="failed"){

this.pageTitle="취소 / 환불"

this.orders = await getFailedOrders()

}

},


async cancelOrderHandler(orderId){

if(!confirm("주문을 취소하시겠습니까?")) return

await cancelOrder(orderId)

alert("주문 취소 완료")

this.loadOrders()

},


format(v){

if(!v) return "0원"

return v.toLocaleString()+"원"

},


statusClass(status){

if(!status) return ""

const s = status.toLowerCase()

if(s==="ready") return "status-ready"
if(s==="ordered") return "status-ordered"
if(s==="shipping") return "status-shipping"
if(s==="failed") return "status-failed"

return ""

}

}

}

</script>



<style scoped>

.layout{
display:flex;
background:#f6f7f8;
min-height:100vh;
}

.sidebar{
width:220px;
background:white;
padding:20px;
border-right:1px solid #eee;
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

.content{
flex:1;
padding:30px;
}

.filters{
display:flex;
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

.order-table{
width:100%;
border-collapse:collapse;
background:white;
}

.order-table th{
background:#fafafa;
padding:10px;
}

.order-table td{
padding:10px;
border-bottom:1px solid #eee;
}

.status{
padding:4px 8px;
border-radius:6px;
font-size:12px;
font-weight:600;
}

.status-ready{
background:#e8f6f0;
color:#28a745;
}

.status-ordered{
background:#e6f4ff;
color:#1677ff;
}

.status-shipping{
background:#e6f4ff;
color:#1677ff;
}

.status-failed{
background:#ffecec;
color:#ff4d4f;
}

.cancel{
background:#ff4d4f;
color:white;
border:none;
padding:5px 10px;
border-radius:4px;
cursor:pointer;
}

.manage-btn{
background:#28a745;
color:white;
border:none;
padding:5px 10px;
border-radius:4px;
cursor:pointer;
}

/* 로그 박스 */

.log-box{
font-size:12px;
line-height:1.6;
background:#f7f7f7;
padding:8px;
border-radius:6px;
}


/* 모달 */

.modal-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.4);
display:flex;
justify-content:center;
align-items:center;
z-index:1000;
}

.modal{
background:white;
padding:30px;
border-radius:8px;
width:400px;
box-shadow:0 5px 20px rgba(0,0,0,0.2);
}

.close-btn{
margin-top:20px;
padding:6px 12px;
border:none;
background:#ff4d4f;
color:white;
border-radius:4px;
cursor:pointer;
}

</style>