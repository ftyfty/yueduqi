<template>
	<div class="header-box">
		<span class="title">小说阅读</span>
		<span class="menu">
			
				<img src="../assets/images/menu.png"/>
			
		</span>
		<span class="magnifier">
			<router-link to="/search">
				<img src="../assets/images/magnifier.png"/>
			</router-link>		
		</span>
	</div>
</template>

<script>
</script>

<style>
	.header-box{ position: fixed; width: 100%; height: 1.6rem; background: #ff9200;padding: 0 0.4rem; }
	.header-box .title{ color: #fff; font-size: 20px;line-height: 1.6rem;}
	[data-dpr = "2"] .header-box .title{ font-size: 40px;}
	[data-dpr = "3"] .header-box .title{ font-size: 60px;}
	.header-box .magnifier,.header-box .menu{float: right;}
	.header-box .magnifier{ padding: 0.45rem 0.2rem 0;}
	.header-box .menu{ padding: 0.5rem 0rem 0 0.4rem;}
	.header-box .magnifier img{ width: 0.8rem;}
	.header-box .menu img{ width: 0.8rem;}
</style>