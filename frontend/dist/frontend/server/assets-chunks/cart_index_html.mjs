export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" as="style"><style ng-app-id="ng">

[_nghost-ng-c3984273398] {
  display: block;
  min-height: 100vh;
}
.app-container[_ngcontent-ng-c3984273398] {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
/*# sourceMappingURL=/app.css.map */</style><style ng-app-id="ng">

.cart-layout[_ngcontent-ng-c844133436] {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content[_ngcontent-ng-c844133436] {
  flex: 1;
}
.smooth-transition[_ngcontent-ng-c844133436] {
  transition: all 0.3s ease;
}
.input-focus[_ngcontent-ng-c844133436]:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
.hover-lift[_ngcontent-ng-c844133436]:hover {
  transform: translateY(-2px);
}
.gradient-bg[_ngcontent-ng-c844133436] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.quantity-btn[_ngcontent-ng-c844133436] {
  transition: all 0.2s ease;
}
.quantity-btn[_ngcontent-ng-c844133436]:hover:not(:disabled) {
  transform: scale(1.1);
}
.quantity-btn[_ngcontent-ng-c844133436]:active:not(:disabled) {
  transform: scale(0.95);
}
.fade-in[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_fadeIn 0.5s ease-in;
}
@keyframes _ngcontent-ng-c844133436_fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.pulse-animation[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_pulse 2s infinite;
}
@keyframes _ngcontent-ng-c844133436_pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
.bounce-in[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_bounceIn 0.6s ease-out;
}
@keyframes _ngcontent-ng-c844133436_bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.shake[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_shake 0.5s ease-in-out;
}
@keyframes _ngcontent-ng-c844133436_shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.slide-out[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_slideOut 0.3s ease-in-out forwards;
}
@keyframes _ngcontent-ng-c844133436_slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
.cart-item[_ngcontent-ng-c844133436] {
  transition: all 0.3s ease;
}
.cart-item[_ngcontent-ng-c844133436]:hover {
  background-color: #fafafa;
}
.unavailable-item[_ngcontent-ng-c844133436] {
  opacity: 0.6;
  background-color: #fef2f2;
}
.unavailable-item[_ngcontent-ng-c844133436]:hover {
  background-color: #fef2f2 !important;
}
.checkout-btn[_ngcontent-ng-c844133436] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}
.checkout-btn[_ngcontent-ng-c844133436]:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  transform: translateY(-2px);
}
.checkout-btn[_ngcontent-ng-c844133436]:disabled {
  background: #9ca3af;
  box-shadow: none;
  transform: none;
}
.cart-item[_ngcontent-ng-c844133436]   .w-20[_ngcontent-ng-c844133436]:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
.skeleton[_ngcontent-ng-c844133436] {
  animation: _ngcontent-ng-c844133436_skeleton-loading 1s linear infinite alternate;
}
@keyframes _ngcontent-ng-c844133436_skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
@media (max-width: 768px) {
  .cart-item[_ngcontent-ng-c844133436] {
    padding: 1rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-main[_ngcontent-ng-c844133436] {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }
  .cart-item[_ngcontent-ng-c844133436]   .w-20.h-20[_ngcontent-ng-c844133436] {
    width: 5rem;
    height: 5rem;
    margin-bottom: 0.5rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .flex-1.min-w-0[_ngcontent-ng-c844133436] {
    width: 100%;
    min-width: 100%;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436] {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    width: 100%;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436]   .flex-1[_ngcontent-ng-c844133436] {
    width: 100%;
    text-align: center;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436]   .flex-1[_ngcontent-ng-c844133436]   h3[_ngcontent-ng-c844133436] {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436]   .flex-1[_ngcontent-ng-c844133436]   p[_ngcontent-ng-c844133436] {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436]   .cart-remove-btn[_ngcontent-ng-c844133436] {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-item-header[_ngcontent-ng-c844133436]   .cart-remove-btn[_ngcontent-ng-c844133436]   svg[_ngcontent-ng-c844133436] {
    width: 1rem;
    height: 1rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436] {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .quantity-section[_ngcontent-ng-c844133436] {
    justify-content: center;
    width: 100%;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .quantity-section[_ngcontent-ng-c844133436]   .text-sm[_ngcontent-ng-c844133436] {
    margin-right: 1rem;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .quantity-section[_ngcontent-ng-c844133436]   .flex.items-center.border[_ngcontent-ng-c844133436] {
    flex-shrink: 0;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .price-section[_ngcontent-ng-c844133436] {
    width: 100%;
    text-align: center;
    padding: 1rem 0 0.5rem 0;
    border-top: 1px solid #f3f4f6;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .price-section[_ngcontent-ng-c844133436]   .text-sm[_ngcontent-ng-c844133436] {
    margin-bottom: 0.25rem;
    color: #6b7280;
  }
  .cart-item[_ngcontent-ng-c844133436]   .cart-controls[_ngcontent-ng-c844133436]   .price-section[_ngcontent-ng-c844133436]   .text-xl[_ngcontent-ng-c844133436] {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436] {
    margin-bottom: 2rem;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436] {
    padding: 1rem;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436] {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   div[_ngcontent-ng-c844133436]:first-child {
    text-align: center;
    width: 100%;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   div[_ngcontent-ng-c844133436]:first-child   h2[_ngcontent-ng-c844133436] {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   div[_ngcontent-ng-c844133436]:first-child   p[_ngcontent-ng-c844133436] {
    font-size: 0.875rem;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   .flex.items-center.space-x-4[_ngcontent-ng-c844133436] {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    align-items: stretch;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   .flex.items-center.space-x-4[_ngcontent-ng-c844133436]   button[_ngcontent-ng-c844133436] {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    justify-content: center;
    border-radius: 0.5rem;
  }
  .max-w-6xl.mx-auto.px-6.mb-8[_ngcontent-ng-c844133436]   .bg-white.rounded-2xl.shadow-sm.p-6[_ngcontent-ng-c844133436]   .flex.items-center.justify-between[_ngcontent-ng-c844133436]   .flex.items-center.space-x-4[_ngcontent-ng-c844133436]   button[_ngcontent-ng-c844133436]   span[_ngcontent-ng-c844133436] {
    display: inline;
  }
  .lg\\\\[_ngcontent-ng-c844133436]:col-span-1   .bg-white.rounded-2xl.shadow-sm.p-6.sticky[_ngcontent-ng-c844133436] {
    position: static;
    margin-top: 2rem;
  }
}
[_ngcontent-ng-c844133436]::-webkit-scrollbar {
  width: 6px;
}
[_ngcontent-ng-c844133436]::-webkit-scrollbar-track {
  background: #f1f1f1;
}
[_ngcontent-ng-c844133436]::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 3px;
}
[_ngcontent-ng-c844133436]::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
input[type=number][_ngcontent-ng-c844133436]::-webkit-outer-spin-button, 
input[type=number][_ngcontent-ng-c844133436]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number][_ngcontent-ng-c844133436] {
  -moz-appearance: textfield;
  appearance: textfield;
}
/*# sourceMappingURL=/cart.component.css.map */</style><style ng-app-id="ng">

.smooth-transition[_ngcontent-ng-c2052491815] {
  transition: all 0.3s ease;
}
.user-dropdown[_ngcontent-ng-c2052491815] {
  position: relative;
}
.rotate-180[_ngcontent-ng-c2052491815] {
  transform: rotate(180deg);
}
.mobile-menu-container[_ngcontent-ng-c2052491815] {
  position: relative;
}
.mobile-menu-dropdown[_ngcontent-ng-c2052491815] {
  animation: _ngcontent-ng-c2052491815_slideDown 0.3s ease-out;
  transform-origin: top;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}
.mobile-menu-dropdown.hidden[_ngcontent-ng-c2052491815] {
  animation: _ngcontent-ng-c2052491815_slideUp 0.2s ease-in;
}
@keyframes _ngcontent-ng-c2052491815_slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes _ngcontent-ng-c2052491815_slideUp {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}
@media (max-width: 768px) {
  .mobile-menu-dropdown[_ngcontent-ng-c2052491815]   .user-info[_ngcontent-ng-c2052491815] {
    background:
      linear-gradient(
        135deg,
        #f3f4f6 0%,
        #e5e7eb 100%);
  }
  .mobile-menu-dropdown[_ngcontent-ng-c2052491815]   a[_ngcontent-ng-c2052491815]:active {
    transform: scale(0.98);
  }
}
@media (hover: hover) {
  .mobile-menu-dropdown[_ngcontent-ng-c2052491815]   a[_ngcontent-ng-c2052491815]:hover {
    background-color: rgba(243, 244, 246, 0.8);
    transform: translateX(4px);
  }
}
.cart-button[_ngcontent-ng-c2052491815]:active {
  transform: scale(0.95);
}
.mobile-menu-button[_ngcontent-ng-c2052491815]   svg[_ngcontent-ng-c2052491815] {
  transition: all 0.3s ease;
}
.mobile-menu-button[_ngcontent-ng-c2052491815]:hover   svg[_ngcontent-ng-c2052491815] {
  transform: scale(1.1);
}
/*# sourceMappingURL=/header.component.css.map */</style><style ng-app-id="ng">

.smooth-transition[_ngcontent-ng-c1913404311] {
  transition: all 0.3s ease;
}
a[_ngcontent-ng-c1913404311]:hover {
  transform: translateY(-2px);
}
@media (max-width: 768px) {
  .grid[_ngcontent-ng-c1913404311] {
    gap: 1.5rem;
  }
}
/*# sourceMappingURL=/footer.component.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>
  <app-root ng-version="20.3.1" _nghost-ng-c3984273398="" ngh="3" ng-server-context="ssg"><router-outlet _ngcontent-ng-c3984273398=""></router-outlet><app-cart _nghost-ng-c844133436="" ngh="2"><div _ngcontent-ng-c844133436="" class="cart-layout"><app-header _ngcontent-ng-c844133436="" _nghost-ng-c2052491815="" ngh="0"><nav _ngcontent-ng-c2052491815="" class="bg-white shadow-sm sticky top-0 z-50 relative"><div _ngcontent-ng-c2052491815="" class="max-w-6xl mx-auto px-4 sm:px-6 py-4"><div _ngcontent-ng-c2052491815="" class="flex justify-between items-center"><div _ngcontent-ng-c2052491815="" class="flex items-center space-x-3"><a _ngcontent-ng-c2052491815="" routerlink="/" class="flex items-center space-x-3" href="/" jsaction="click:;"><div _ngcontent-ng-c2052491815="" class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"> RC </div><h1 _ngcontent-ng-c2052491815="" class="text-xl font-bold text-gray-800">Rotisería Cacho</h1></a></div><div _ngcontent-ng-c2052491815="" class="hidden md:flex items-center space-x-8"><a _ngcontent-ng-c2052491815="" routerlink="/comidas" class="text-gray-600 hover:text-red-500 smooth-transition cursor-pointer" href="/comidas" jsaction="click:;">Comidas</a><a _ngcontent-ng-c2052491815="" routerlink="/comidas" class="text-gray-600 hover:text-red-500 smooth-transition cursor-pointer" href="/comidas" jsaction="click:;">Guarniciones</a></div><div _ngcontent-ng-c2052491815="" class="hidden md:flex items-center space-x-4"><div _ngcontent-ng-c2052491815="" class="relative user-dropdown"><button _ngcontent-ng-c2052491815="" class="flex items-center space-x-2 text-gray-700 hover:text-red-500 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2052491815="" class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold"> JD </div><span _ngcontent-ng-c2052491815="" class="hidden md:block font-medium">Juan Díaz</span><svg _ngcontent-ng-c2052491815="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 transition-transform duration-200"><path _ngcontent-ng-c2052491815="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div _ngcontent-ng-c2052491815="" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hidden"><a _ngcontent-ng-c2052491815="" routerlink="/user" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 smooth-transition cursor-pointer" href="/user" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3">👤</span> Mi Usuario </a><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 smooth-transition cursor-pointer"><span _ngcontent-ng-c2052491815="" class="mr-3">🔔</span> Notificaciones <span _ngcontent-ng-c2052491815="" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1"> 3 </span><!--container--></a><a _ngcontent-ng-c2052491815="" routerlink="/orders" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 smooth-transition cursor-pointer" href="/orders" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3">📦</span> Pedidos </a><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 smooth-transition cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3">⚙️</span> Panel de Administración </a><!--container--><hr _ngcontent-ng-c2052491815="" class="my-2 border-gray-200"><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 smooth-transition cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3">🚪</span> Cerrar Sesión </a></div></div><!--container--><!--container--><button _ngcontent-ng-c2052491815="" class="relative flex items-center space-x-2 text-gray-700 hover:text-red-500 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2052491815="" class="relative"><svg _ngcontent-ng-c2052491815="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path _ngcontent-ng-c2052491815="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4.01"></path></svg><!--container--></div><span _ngcontent-ng-c2052491815="" class="hidden md:block font-medium">Carrito</span></button></div><div _ngcontent-ng-c2052491815="" class="flex md:hidden items-center space-x-3"><button _ngcontent-ng-c2052491815="" class="relative flex items-center text-gray-700 hover:text-red-500 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2052491815="" class="relative"><svg _ngcontent-ng-c2052491815="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path _ngcontent-ng-c2052491815="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4.01"></path></svg><!--container--></div></button><div _ngcontent-ng-c2052491815="" class="mobile-menu-container"><button _ngcontent-ng-c2052491815="" class="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-red-500 smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c2052491815="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path _ngcontent-ng-c2052491815="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg><!--container--><!--container--></button></div></div></div><!--container--><div _ngcontent-ng-c2052491815="" class="absolute top-full left-0 right-0 md:hidden mobile-menu-dropdown bg-white shadow-lg border-t border-gray-200 z-40 hidden"><div _ngcontent-ng-c2052491815="" class="px-2 pt-4 pb-3 space-y-1"><a _ngcontent-ng-c2052491815="" routerlink="/comidas" class="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" href="/comidas" jsaction="click:;"> Comidas </a><a _ngcontent-ng-c2052491815="" routerlink="/comidas" class="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" href="/comidas" jsaction="click:;"> Guarniciones </a><div _ngcontent-ng-c2052491815="" class="border-t border-gray-200 mt-4 pt-4"><div _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-3 bg-gray-50 rounded-lg mb-3"><div _ngcontent-ng-c2052491815="" class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"> JD </div><div _ngcontent-ng-c2052491815=""><p _ngcontent-ng-c2052491815="" class="font-medium text-gray-800">Juan Díaz</p><p _ngcontent-ng-c2052491815="" class="text-sm text-gray-600">empleado</p></div></div><a _ngcontent-ng-c2052491815="" routerlink="/user" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" href="/user" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3 text-lg">👤</span> Mi Usuario </a><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3 text-lg">🔔</span> Notificaciones <span _ngcontent-ng-c2052491815="" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1"> 3 </span><!--container--></a><a _ngcontent-ng-c2052491815="" routerlink="/orders" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" href="/orders" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3 text-lg">📦</span> Pedidos </a><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 smooth-transition rounded-lg" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3 text-lg">⚙️</span> Panel de Administración </a><!--container--><a _ngcontent-ng-c2052491815="" class="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 smooth-transition rounded-lg mt-2" jsaction="click:;"><span _ngcontent-ng-c2052491815="" class="mr-3 text-lg">🚪</span> Cerrar Sesión </a></div><!--container--><!--container--></div></div></div></nav></app-header><main _ngcontent-ng-c844133436="" class="main-content bg-gray-50 min-h-screen"><div _ngcontent-ng-c844133436="" class="max-w-6xl mx-auto px-6 py-4"><nav _ngcontent-ng-c844133436="" class="flex items-center space-x-2 text-sm text-gray-600"><button _ngcontent-ng-c844133436="" class="hover:text-red-500 smooth-transition" jsaction="click:;">Inicio</button><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg><span _ngcontent-ng-c844133436="" class="text-gray-800 font-medium">Carrito de Compras</span></nav></div><div _ngcontent-ng-c844133436="" class="max-w-6xl mx-auto px-6 mb-8"><div _ngcontent-ng-c844133436="" class="bg-white rounded-2xl shadow-sm p-6"><div _ngcontent-ng-c844133436="" class="flex items-center justify-between"><div _ngcontent-ng-c844133436=""><h2 _ngcontent-ng-c844133436="" class="text-2xl font-bold text-gray-800 mb-2">Tu Pedido</h2><p _ngcontent-ng-c844133436="" class="text-gray-600"> 5 productos en tu carrito </p></div><div _ngcontent-ng-c844133436="" class="flex items-center space-x-4"><button _ngcontent-ng-c844133436="" class="flex items-center space-x-2 text-red-500 hover:text-red-600 smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg><span _ngcontent-ng-c844133436="" class="font-medium">Seguir comprando</span></button><button _ngcontent-ng-c844133436="" class="flex items-center space-x-2 text-gray-500 hover:text-red-500 smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg><span _ngcontent-ng-c844133436="" class="font-medium">Vaciar carrito</span></button><!--container--></div></div></div></div><div _ngcontent-ng-c844133436="" class="max-w-6xl mx-auto px-6 pb-12"><div _ngcontent-ng-c844133436="" class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div _ngcontent-ng-c844133436="" class="lg:col-span-2"><!--container--><div _ngcontent-ng-c844133436="" class="space-y-4"><div _ngcontent-ng-c844133436="" class="cart-item bg-white rounded-2xl shadow-sm p-6 smooth-transition"><div _ngcontent-ng-c844133436="" class="cart-item-main flex items-center space-x-6"><div _ngcontent-ng-c844133436="" class="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c844133436="" class="text-3xl">🍗</span></div><div _ngcontent-ng-c844133436="" class="flex-1 min-w-0"><div _ngcontent-ng-c844133436="" class="cart-item-header flex items-start justify-between"><div _ngcontent-ng-c844133436="" class="flex-1"><h3 _ngcontent-ng-c844133436="" class="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-red-500 smooth-transition" jsaction="click:;"> Pollo al Spiedo Entero </h3><p _ngcontent-ng-c844133436="" class="text-sm text-gray-500 mb-2">Pollos</p><!--container--></div><button _ngcontent-ng-c844133436="" title="Eliminar producto" class="cart-remove-btn text-gray-400 hover:text-red-500 smooth-transition p-2" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div _ngcontent-ng-c844133436="" class="cart-controls flex items-center justify-between mt-4 pt-4 border-t border-gray-100"><div _ngcontent-ng-c844133436="" class="quantity-section flex items-center space-x-4"><span _ngcontent-ng-c844133436="" class="text-sm text-gray-600">Cantidad:</span><div _ngcontent-ng-c844133436="" class="flex items-center border border-gray-300 rounded-lg"><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-l-lg smooth-transition opacity-50 cursor-not-allowed" disabled="" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span _ngcontent-ng-c844133436="" class="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">1</span><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-r-lg smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div></div><div _ngcontent-ng-c844133436="" class="price-section text-right"><div _ngcontent-ng-c844133436="" class="text-sm text-gray-500">\$3500 c/u</div><div _ngcontent-ng-c844133436="" class="text-xl font-bold text-red-500">\$3500</div></div></div></div><div _ngcontent-ng-c844133436="" class="cart-item bg-white rounded-2xl shadow-sm p-6 smooth-transition"><div _ngcontent-ng-c844133436="" class="cart-item-main flex items-center space-x-6"><div _ngcontent-ng-c844133436="" class="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c844133436="" class="text-3xl">🍖</span></div><div _ngcontent-ng-c844133436="" class="flex-1 min-w-0"><div _ngcontent-ng-c844133436="" class="cart-item-header flex items-start justify-between"><div _ngcontent-ng-c844133436="" class="flex-1"><h3 _ngcontent-ng-c844133436="" class="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-red-500 smooth-transition" jsaction="click:;"> Milanesas de Pollo (4 unidades) </h3><p _ngcontent-ng-c844133436="" class="text-sm text-gray-500 mb-2">Milanesas</p><!--container--></div><button _ngcontent-ng-c844133436="" title="Eliminar producto" class="cart-remove-btn text-gray-400 hover:text-red-500 smooth-transition p-2" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div _ngcontent-ng-c844133436="" class="cart-controls flex items-center justify-between mt-4 pt-4 border-t border-gray-100"><div _ngcontent-ng-c844133436="" class="quantity-section flex items-center space-x-4"><span _ngcontent-ng-c844133436="" class="text-sm text-gray-600">Cantidad:</span><div _ngcontent-ng-c844133436="" class="flex items-center border border-gray-300 rounded-lg"><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-l-lg smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span _ngcontent-ng-c844133436="" class="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">2</span><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-r-lg smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div></div><div _ngcontent-ng-c844133436="" class="price-section text-right"><div _ngcontent-ng-c844133436="" class="text-sm text-gray-500">\$2800 c/u</div><div _ngcontent-ng-c844133436="" class="text-xl font-bold text-red-500">\$5600</div></div></div></div><div _ngcontent-ng-c844133436="" class="cart-item bg-white rounded-2xl shadow-sm p-6 smooth-transition"><div _ngcontent-ng-c844133436="" class="cart-item-main flex items-center space-x-6"><div _ngcontent-ng-c844133436="" class="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c844133436="" class="text-3xl">🥟</span></div><div _ngcontent-ng-c844133436="" class="flex-1 min-w-0"><div _ngcontent-ng-c844133436="" class="cart-item-header flex items-start justify-between"><div _ngcontent-ng-c844133436="" class="flex-1"><h3 _ngcontent-ng-c844133436="" class="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-red-500 smooth-transition" jsaction="click:;"> Empanadas de Carne (6 unidades) </h3><p _ngcontent-ng-c844133436="" class="text-sm text-gray-500 mb-2">Empanadas</p><!--container--></div><button _ngcontent-ng-c844133436="" title="Eliminar producto" class="cart-remove-btn text-gray-400 hover:text-red-500 smooth-transition p-2" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div _ngcontent-ng-c844133436="" class="cart-controls flex items-center justify-between mt-4 pt-4 border-t border-gray-100"><div _ngcontent-ng-c844133436="" class="quantity-section flex items-center space-x-4"><span _ngcontent-ng-c844133436="" class="text-sm text-gray-600">Cantidad:</span><div _ngcontent-ng-c844133436="" class="flex items-center border border-gray-300 rounded-lg"><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-l-lg smooth-transition opacity-50 cursor-not-allowed" disabled="" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span _ngcontent-ng-c844133436="" class="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">1</span><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-r-lg smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div></div><div _ngcontent-ng-c844133436="" class="price-section text-right"><div _ngcontent-ng-c844133436="" class="text-sm text-gray-500">\$2700 c/u</div><div _ngcontent-ng-c844133436="" class="text-xl font-bold text-red-500">\$2700</div></div></div></div><div _ngcontent-ng-c844133436="" class="cart-item bg-white rounded-2xl shadow-sm p-6 smooth-transition unavailable-item"><div _ngcontent-ng-c844133436="" class="cart-item-main flex items-center space-x-6"><div _ngcontent-ng-c844133436="" class="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer" jsaction="click:;"><span _ngcontent-ng-c844133436="" class="text-3xl">🍕</span></div><div _ngcontent-ng-c844133436="" class="flex-1 min-w-0"><div _ngcontent-ng-c844133436="" class="cart-item-header flex items-start justify-between"><div _ngcontent-ng-c844133436="" class="flex-1"><h3 _ngcontent-ng-c844133436="" class="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-red-500 smooth-transition" jsaction="click:;"> Matambre a la Pizza </h3><p _ngcontent-ng-c844133436="" class="text-sm text-gray-500 mb-2">Carnes</p><div _ngcontent-ng-c844133436="" class="inline-flex items-center px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-3 h-3 mr-1"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg> No disponible </div><!--container--></div><button _ngcontent-ng-c844133436="" title="Eliminar producto" class="cart-remove-btn text-gray-400 hover:text-red-500 smooth-transition p-2" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div _ngcontent-ng-c844133436="" class="cart-controls flex items-center justify-between mt-4 pt-4 border-t border-gray-100"><div _ngcontent-ng-c844133436="" class="quantity-section flex items-center space-x-4"><span _ngcontent-ng-c844133436="" class="text-sm text-gray-600">Cantidad:</span><div _ngcontent-ng-c844133436="" class="flex items-center border border-gray-300 rounded-lg"><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-l-lg smooth-transition opacity-50 cursor-not-allowed" disabled="" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button><span _ngcontent-ng-c844133436="" class="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">1</span><button _ngcontent-ng-c844133436="" class="quantity-btn p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-r-lg smooth-transition" jsaction="click:;"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div></div><div _ngcontent-ng-c844133436="" class="price-section text-right"><div _ngcontent-ng-c844133436="" class="text-sm text-gray-500">\$5200 c/u</div><div _ngcontent-ng-c844133436="" class="text-xl font-bold text-red-500">\$5200</div></div></div></div><!--container--></div><!--container--></div><div _ngcontent-ng-c844133436="" class="lg:col-span-1"><div _ngcontent-ng-c844133436="" class="bg-white rounded-2xl shadow-sm p-6 sticky top-24"><h3 _ngcontent-ng-c844133436="" class="text-lg font-semibold text-gray-800 mb-6">Resumen del pedido</h3><div _ngcontent-ng-c844133436="" class="space-y-4 mb-6"><div _ngcontent-ng-c844133436="" class="flex justify-between text-gray-600"><span _ngcontent-ng-c844133436="">Productos (5)</span><span _ngcontent-ng-c844133436="">\$11.800</span></div><div _ngcontent-ng-c844133436="" class="flex justify-between text-gray-600"><span _ngcontent-ng-c844133436="">Servicio</span><span _ngcontent-ng-c844133436="" class="font-medium text-green-600">100\$</span></div><div _ngcontent-ng-c844133436="" class="border-t border-gray-200 pt-4"><div _ngcontent-ng-c844133436="" class="flex justify-between text-lg font-semibold text-gray-800"><span _ngcontent-ng-c844133436="">Total</span><span _ngcontent-ng-c844133436="">\$11.800</span></div></div></div><div _ngcontent-ng-c844133436="" class="bg-blue-50 rounded-lg p-4 mb-6"><div _ngcontent-ng-c844133436="" class="flex items-start space-x-3"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-blue-500 mt-0.5"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div _ngcontent-ng-c844133436=""><h4 _ngcontent-ng-c844133436="" class="font-medium text-blue-800 text-sm mb-1">Información de entrega</h4><p _ngcontent-ng-c844133436="" class="text-blue-700 text-xs"> • Tiempo estimado: 45-60 minutos<br _ngcontent-ng-c844133436=""> • Los productos se entregan calientes </p></div></div></div><button _ngcontent-ng-c844133436="" class="w-full checkout-btn text-white py-4 rounded-xl text-lg font-semibold smooth-transition" jsaction="click:;"><div _ngcontent-ng-c844133436="" class="flex items-center justify-center space-x-3"><svg _ngcontent-ng-c844133436="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path _ngcontent-ng-c844133436="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span _ngcontent-ng-c844133436="">Proceder al pago</span></div></button><div _ngcontent-ng-c844133436="" class="mt-6 pt-6 border-t border-gray-200"><h4 _ngcontent-ng-c844133436="" class="text-sm font-medium text-gray-700 mb-3">Métodos de pago aceptados</h4><div _ngcontent-ng-c844133436="" class="flex items-center space-x-3"><div _ngcontent-ng-c844133436="" class="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">💳</div><div _ngcontent-ng-c844133436="" class="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">💳</div><div _ngcontent-ng-c844133436="" class="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">💵</div><span _ngcontent-ng-c844133436="" class="text-xs text-gray-500">y más...</span></div></div></div></div></div></div><!--container--></main><app-footer _ngcontent-ng-c844133436="" _nghost-ng-c1913404311="" ngh="1"><footer _ngcontent-ng-c1913404311="" id="contacto" class="bg-gray-800 text-white py-12"><div _ngcontent-ng-c1913404311="" class="max-w-6xl mx-auto px-6"><div _ngcontent-ng-c1913404311="" class="grid md:grid-cols-3 gap-8"><div _ngcontent-ng-c1913404311=""><div _ngcontent-ng-c1913404311="" class="flex items-center space-x-3 mb-4"><div _ngcontent-ng-c1913404311="" class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"> RC </div><h3 _ngcontent-ng-c1913404311="" class="text-xl font-bold">Rotisería Cacho</h3></div><p _ngcontent-ng-c1913404311="" class="text-gray-300 mb-4"> Más de 35 años llevando el auténtico sabor argentino a tu mesa. </p><div _ngcontent-ng-c1913404311="" class="flex space-x-4"><a _ngcontent-ng-c1913404311="" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 smooth-transition text-white" href="https://facebook.com" title="Facebook"><span _ngcontent-ng-c1913404311="">f</span></a><a _ngcontent-ng-c1913404311="" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 smooth-transition text-white" href="https://instagram.com" title="Instagram"><span _ngcontent-ng-c1913404311="">📷</span></a><a _ngcontent-ng-c1913404311="" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 smooth-transition text-white" href="https://twitter.com" title="Twitter"><span _ngcontent-ng-c1913404311="">🐦</span></a><!--container--></div></div><div _ngcontent-ng-c1913404311=""><h4 _ngcontent-ng-c1913404311="" class="text-lg font-bold mb-4">Contacto</h4><div _ngcontent-ng-c1913404311="" class="space-y-2 text-gray-300"><p _ngcontent-ng-c1913404311="">📞 (011) 4567-8900</p><p _ngcontent-ng-c1913404311="">📍 Av. Principal 123, Ciudad</p><p _ngcontent-ng-c1913404311="">✉️ info@rotiseriasabor.com</p></div></div><div _ngcontent-ng-c1913404311=""><h4 _ngcontent-ng-c1913404311="" class="text-lg font-bold mb-4">Horarios de Atención</h4><div _ngcontent-ng-c1913404311="" class="space-y-2 text-gray-300"><p _ngcontent-ng-c1913404311="">Lun - Vie: 11:00 - 22:00</p><p _ngcontent-ng-c1913404311="">Sábados: 11:00 - 23:00</p><p _ngcontent-ng-c1913404311="">Domingos: 12:00 - 22:00</p></div></div></div><div _ngcontent-ng-c1913404311="" class="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400"><div _ngcontent-ng-c1913404311="" class="flex flex-col md:flex-row justify-center items-center"><p _ngcontent-ng-c1913404311="" class="mb-2 md:mb-0"> © 2025 Rotisería El Buen Sabor. Todos los derechos reservados. </p></div></div></div></footer></app-footer></div></app-cart><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"15":"t0","16":"t3","21":"t4","29":"t5","32":"t6","33":"t7","34":"t8","41":"t9","42":"t12"},"c":{"15":[{"i":"t0","r":1,"t":{"17":"t1","22":"t2"},"c":{"17":[{"i":"t1","r":1}],"22":[{"i":"t2","r":1}]}}],"16":[],"21":[],"29":[],"32":[{"i":"t6","r":1}],"33":[],"34":[],"41":[{"i":"t9","r":1,"t":{"17":"t10","22":"t11"},"c":{"17":[{"i":"t10","r":1}],"22":[{"i":"t11","r":1}]}}],"42":[]}},{"t":{"12":"t19"},"c":{"12":[{"i":"t19","r":1,"x":3}]}},{"t":{"25":"t13","29":"t14","30":"t15","81":"t18"},"c":{"25":[{"i":"t13","r":1}],"29":[],"30":[{"i":"t15","r":1,"t":{"2":"t16"},"c":{"2":[{"i":"t16","r":1,"t":{"12":"t17"},"c":{"12":[]},"x":3},{"i":"t16","r":1,"t":{"12":"t17"},"c":{"12":[{"i":"t17","r":1}]}}]}}],"81":[]}},{"c":{"0":[{"i":"c844133436","r":1}]}}]}</script></body></html>`;