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

.admin-layout[_ngcontent-ng-c916637769] {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}
.main-content[_ngcontent-ng-c916637769] {
  flex: 1;
  margin-left: 4.2rem;
  padding: 2rem;
  padding-top: 10rem;
}
.stats-card[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  transition: all 0.3s ease;
}
.stats-card[_ngcontent-ng-c916637769]:hover {
  transform: translateY(-2px);
}
.gradient-bg[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.hover-lift[_ngcontent-ng-c916637769]:hover {
  transform: translateY(-2px);
}
.admin-card[_ngcontent-ng-c916637769] {
  transition: all 0.3s ease;
  border-left: 4px solid #ef4444;
}
.admin-card[_ngcontent-ng-c916637769]:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.fade-in[_ngcontent-ng-c916637769] {
  animation: _ngcontent-ng-c916637769_fadeIn 0.5s ease-in;
}
@keyframes _ngcontent-ng-c916637769_fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.modal-backdrop[_ngcontent-ng-c916637769] {
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.modal-content[_ngcontent-ng-c916637769] {
  animation: _ngcontent-ng-c916637769_modalSlideIn 0.3s ease-out;
}
@keyframes _ngcontent-ng-c916637769_modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.status-active[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #10b981 0%,
      #059669 100%);
}
.status-inactive[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.status-pending[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #f59e0b 0%,
      #d97706 100%);
}
.role-admin[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #8b5cf6 0%,
      #7c3aed 100%);
}
.role-user[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #4f46e5 100%);
}
.action-button[_ngcontent-ng-c916637769] {
  transition: all 0.2s ease;
}
.action-button[_ngcontent-ng-c916637769]:hover {
  transform: scale(1.05);
}
.user-avatar[_ngcontent-ng-c916637769] {
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #8b5cf6 100%);
}
.status-badge[_ngcontent-ng-c916637769] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.role-badge[_ngcontent-ng-c916637769] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
input[_ngcontent-ng-c916637769]:focus, 
select[_ngcontent-ng-c916637769]:focus, 
textarea[_ngcontent-ng-c916637769]:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
@media (max-width: 768px) {
  .main-content[_ngcontent-ng-c916637769] {
    margin-top: 7rem;
    margin-left: 3.7rem;
    padding: 1rem;
  }
  .admin-layout[_ngcontent-ng-c916637769] {
    flex-direction: column;
  }
  .modal-content[_ngcontent-ng-c916637769] {
    max-width: calc(100vw - 2rem);
    margin: 1rem;
  }
  .stats-card[_ngcontent-ng-c916637769] {
    margin-bottom: 1rem;
  }
  .admin-card[_ngcontent-ng-c916637769] {
    margin-bottom: 1rem;
  }
}
/*# sourceMappingURL=/admin-users.component.css.map */</style><style ng-app-id="ng">

.sidebar-item[_ngcontent-ng-c2156486322] {
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.sidebar-item[_ngcontent-ng-c2156486322]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));
  transform: translateX(4px);
}
.sidebar-item.active[_ngcontent-ng-c2156486322] {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.sidebar-item.active[_ngcontent-ng-c2156486322]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}
.tooltip[_ngcontent-ng-c2156486322] {
  pointer-events: none;
  position: absolute;
  left: 4rem;
  top: 50%;
  z-index: 50;
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  white-space: nowrap;
  border-radius: 0.375rem;
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.tooltip[_ngcontent-ng-c2156486322]::before {
  content: "";
  position: absolute;
  left: -0.25rem;
  top: 50%;
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-width: 4px;
  border-color: transparent;
  --tw-border-opacity: 1;
  border-right-color: rgb(31 41 55 / var(--tw-border-opacity, 1));
}
.sidebar-item[_ngcontent-ng-c2156486322]:hover   .tooltip[_ngcontent-ng-c2156486322] {
  opacity: 1;
}
/*# sourceMappingURL=/admin-sidebar.component.css.map */</style><style ng-app-id="ng">

[_nghost-ng-c308276287] {
  display: block;
}
@media (max-width: 768px) {
  .subtitle[_ngcontent-ng-c308276287] {
    display: none;
  }
}
.dropdown-menu[_ngcontent-ng-c308276287] {
  animation: _ngcontent-ng-c308276287_slideIn 0.2s ease-out;
  transform-origin: top right;
}
@keyframes _ngcontent-ng-c308276287_slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.dropdown-item[_ngcontent-ng-c308276287] {
  transition: all 0.2s ease;
}
.dropdown-item[_ngcontent-ng-c308276287]:hover {
  background-color: #f9fafb;
  transform: translateX(2px);
}
.rotate-180[_ngcontent-ng-c308276287] {
  transform: rotate(180deg);
}
.user-button[_ngcontent-ng-c308276287] {
  transition: all 0.2s ease;
}
.user-button[_ngcontent-ng-c308276287]:hover {
  background-color: #f9fafb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.user-avatar[_ngcontent-ng-c308276287] {
  transition: all 0.2s ease;
}
.user-button[_ngcontent-ng-c308276287]:hover   .user-avatar[_ngcontent-ng-c308276287] {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
/*# sourceMappingURL=/admin-header.component.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>
  <app-root ng-version="20.3.1" _nghost-ng-c3984273398="" ngh="3" ng-server-context="ssg"><router-outlet _ngcontent-ng-c3984273398=""></router-outlet><app-admin-users _nghost-ng-c916637769="" ngh="2"><div _ngcontent-ng-c916637769="" class="admin-layout"><app-admin-sidebar _ngcontent-ng-c916637769="" _nghost-ng-c2156486322="" ngh="0"><div _ngcontent-ng-c2156486322="" class="fixed left-0 top-0 h-full w-16 bg-white shadow-lg z-50"><div _ngcontent-ng-c2156486322="" class="flex flex-col h-full"><div _ngcontent-ng-c2156486322="" class="flex items-center justify-center h-16 border-b border-gray-200"><div _ngcontent-ng-c2156486322="" routerlink="/" class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm" tabindex="0" jsaction="click:;"> RC </div></div><nav _ngcontent-ng-c2156486322="" class="flex-1 py-4"><div _ngcontent-ng-c2156486322="" class="space-y-2 px-2"><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition active" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Panel General</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Productos</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition active" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Usuarios</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Pedidos</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Email Marketing</div></div><!--container--></div></nav></div></div></app-admin-sidebar><div _ngcontent-ng-c916637769="" class="main-content"><app-admin-header _ngcontent-ng-c916637769="" title="Gestión de Usuarios" subtitle="Administra usuarios, roles y permisos del sistema" _nghost-ng-c308276287="" ngh="1"><header _ngcontent-ng-c308276287="" class="bg-white shadow-sm border-b border-gray-200 top-0 z-40 absolute left-0 w-full pl-16"><div _ngcontent-ng-c308276287="" class="px-6 py-4"><div _ngcontent-ng-c308276287="" class="flex items-center justify-between"><div _ngcontent-ng-c308276287=""><h1 _ngcontent-ng-c308276287="" class="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1><p _ngcontent-ng-c308276287="" class="text-gray-600 text-sm mt-1 subtitle">Administra usuarios, roles y permisos del sistema</p></div><div _ngcontent-ng-c308276287="" class="flex items-center space-x-4"><div _ngcontent-ng-c308276287="" class="flex items-center space-x-2 text-sm text-gray-600"><svg _ngcontent-ng-c308276287="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c308276287="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c308276287="">07:36:36 p.&nbsp;m.</span></div><div _ngcontent-ng-c308276287="" class="h-6 w-px bg-gray-300"></div><div _ngcontent-ng-c308276287="" class="relative"><button _ngcontent-ng-c308276287="" class="user-button flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer" jsaction="click:;"><div _ngcontent-ng-c308276287="" class="user-avatar w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium"> A </div><span _ngcontent-ng-c308276287="" class="text-sm font-medium text-gray-700 md:block hidden">Admin</span><svg _ngcontent-ng-c308276287="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 transition-transform duration-200"><path _ngcontent-ng-c308276287="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><!--container--></div></div></div></div></header></app-admin-header><div _ngcontent-ng-c916637769="" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div _ngcontent-ng-c916637769="" class="stats-card rounded-xl p-6 border border-gray-200 bg-blue-100"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><div _ngcontent-ng-c916637769=""><p _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Total Usuarios</p><p _ngcontent-ng-c916637769="" class="text-2xl font-bold text-blue-600">8</p></div><div _ngcontent-ng-c916637769="" class="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-blue-600"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div></div></div><div _ngcontent-ng-c916637769="" class="stats-card rounded-xl p-6 border border-gray-200 bg-green-100"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><div _ngcontent-ng-c916637769=""><p _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Activos</p><p _ngcontent-ng-c916637769="" class="text-2xl font-bold text-green-600">4</p></div><div _ngcontent-ng-c916637769="" class="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-green-600"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div></div><div _ngcontent-ng-c916637769="" class="stats-card rounded-xl p-6 border border-gray-200 bg-yellow-100"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><div _ngcontent-ng-c916637769=""><p _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Pendientes</p><p _ngcontent-ng-c916637769="" class="text-2xl font-bold text-yellow-600">3</p></div><div _ngcontent-ng-c916637769="" class="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-yellow-600"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div></div><div _ngcontent-ng-c916637769="" class="stats-card rounded-xl p-6 border border-gray-200 bg-purple-100"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><div _ngcontent-ng-c916637769=""><p _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Administradores</p><p _ngcontent-ng-c916637769="" class="text-2xl font-bold text-purple-600">2</p></div><div _ngcontent-ng-c916637769="" class="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-purple-600"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div></div></div><!--container--></div><div _ngcontent-ng-c916637769="" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"><div _ngcontent-ng-c916637769="" class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"><div _ngcontent-ng-c916637769=""><h2 _ngcontent-ng-c916637769="" class="text-xl font-bold text-gray-900">Gestión de Usuarios</h2><p _ngcontent-ng-c916637769="" class="text-gray-600">Administra usuarios, roles y permisos del sistema</p></div><div _ngcontent-ng-c916637769="" class="flex items-center space-x-3"><button _ngcontent-ng-c916637769="" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span _ngcontent-ng-c916637769="">Exportar</span></button><button _ngcontent-ng-c916637769="" class="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover-lift transition-all duration-200 flex items-center space-x-2" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg><span _ngcontent-ng-c916637769="">Agregar Usuario</span></button></div></div></div><div _ngcontent-ng-c916637769="" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-3"><button _ngcontent-ng-c916637769="" class="px-4 py-2 rounded-lg font-medium bg-red-500 text-white transition-all duration-200" jsaction="click:;">Todos</button><button _ngcontent-ng-c916637769="" class="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200" jsaction="click:;"> Activos </button><button _ngcontent-ng-c916637769="" class="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200" jsaction="click:;"> Pendientes </button><button _ngcontent-ng-c916637769="" class="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200" jsaction="click:;"> Inactivos </button><button _ngcontent-ng-c916637769="" class="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200" jsaction="click:;"> Administradores </button></div></div><div _ngcontent-ng-c916637769="" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> JP </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Juan Pérez</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">juan@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 1234-5678</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-active"> Activo </span></div><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Rol:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">Admin</span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">14/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><!--container--><!--container--><span _ngcontent-ng-c916637769="" title="Usuario Administrador" class="action-button bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Administrador </span><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><button _ngcontent-ng-c916637769="" title="Dar de Baja" class="action-button bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path></svg> Dar de Baja </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> MG </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">María González</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">maria@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 2345-6789</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-active"> Activo </span></div><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Rol:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">Usuario</span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">17/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><button _ngcontent-ng-c916637769="" title="Dar de Baja" class="action-button bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path></svg> Dar de Baja </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> CR </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Carlos Rodríguez</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">carlos@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 3456-7890</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-pending"> Pendiente </span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">19/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><button _ngcontent-ng-c916637769="" title="Validar Usuario" class="action-button bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Validar </button><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> AM </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Ana Martínez</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">ana@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 4567-8901</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-active"> Activo </span></div><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Rol:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">Usuario</span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">15/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><button _ngcontent-ng-c916637769="" title="Dar de Baja" class="action-button bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path></svg> Dar de Baja </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> LT </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Luis Torres</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">luis@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 5678-9012</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-pending"> Pendiente </span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">20/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><button _ngcontent-ng-c916637769="" title="Validar Usuario" class="action-button bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Validar </button><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> SL </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Sofia López</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">sofia@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 6789-0123</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-active"> Activo </span></div><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Rol:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">Admin</span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">9/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><!--container--><!--container--><span _ngcontent-ng-c916637769="" title="Usuario Administrador" class="action-button bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Administrador </span><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><button _ngcontent-ng-c916637769="" title="Dar de Baja" class="action-button bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path></svg> Dar de Baja </button><!--container--><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> DF </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Diego Fernández</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">diego@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 7890-1234</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-inactive"> Inactivo </span></div><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Rol:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">Usuario</span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">11/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><!--container--><button _ngcontent-ng-c916637769="" title="Reactivar" class="action-button bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Reactivar </button><!--container--></div></div><div _ngcontent-ng-c916637769="" class="admin-card bg-white rounded-xl shadow-sm p-6 fade-in"><div _ngcontent-ng-c916637769="" class="flex items-start space-x-4 mb-4"><div _ngcontent-ng-c916637769="" class="user-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"> LS </div><div _ngcontent-ng-c916637769="" class="flex-1"><div _ngcontent-ng-c916637769="" class="flex items-center space-x-2 mb-1"><h3 _ngcontent-ng-c916637769="" class="text-lg font-bold text-gray-900">Laura Sánchez</h3></div><p _ngcontent-ng-c916637769="" class="text-gray-600 text-sm">laura@email.com</p><p _ngcontent-ng-c916637769="" class="text-gray-500 text-xs">+54 9 11 8901-2345</p></div></div><div _ngcontent-ng-c916637769="" class="space-y-3 mb-4"><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Estado:</span><span _ngcontent-ng-c916637769="" class="status-badge text-white text-xs px-3 py-1 rounded-full font-medium status-pending"> Pendiente </span></div><!--container--><div _ngcontent-ng-c916637769="" class="flex items-center justify-between"><span _ngcontent-ng-c916637769="" class="text-sm font-medium text-gray-600">Registro:</span><span _ngcontent-ng-c916637769="" class="text-sm text-gray-700">21/1/2024</span></div></div><div _ngcontent-ng-c916637769="" class="flex flex-wrap gap-2"><button _ngcontent-ng-c916637769="" title="Validar Usuario" class="action-button bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Validar </button><!--container--><button _ngcontent-ng-c916637769="" title="Hacer Administrador" class="action-button bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Promover </button><!--container--><!--container--><button _ngcontent-ng-c916637769="" title="Editar" class="action-button bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover-lift transition-all duration-200" jsaction="click:;"><svg _ngcontent-ng-c916637769="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 inline mr-1"><path _ngcontent-ng-c916637769="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><!--container--><!--container--></div></div><!--container--></div></div></div><!--container--><!--container--></app-admin-users><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"7":"t13"},"c":{"7":[{"i":"t13","r":1,"x":5}]}},{"t":{"23":"t14"},"c":{"23":[]}},{"t":{"5":"t15","37":"t16","38":"t23","39":"t24"},"c":{"5":[{"i":"t15","r":1,"x":4}],"37":[{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[{"i":"t17","r":1}],"25":[],"26":[],"27":[{"i":"t20","r":1}],"32":[{"i":"t21","r":1}],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[{"i":"t17","r":1}],"25":[],"26":[{"i":"t19","r":1}],"27":[],"32":[{"i":"t21","r":1}],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[],"25":[{"i":"t18","r":1}],"26":[{"i":"t19","r":1}],"27":[],"32":[],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[{"i":"t17","r":1}],"25":[],"26":[{"i":"t19","r":1}],"27":[],"32":[{"i":"t21","r":1}],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[],"25":[{"i":"t18","r":1}],"26":[{"i":"t19","r":1}],"27":[],"32":[],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[{"i":"t17","r":1}],"25":[],"26":[],"27":[{"i":"t20","r":1}],"32":[{"i":"t21","r":1}],"33":[]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[{"i":"t17","r":1}],"25":[],"26":[{"i":"t19","r":1}],"27":[],"32":[],"33":[{"i":"t22","r":1}]}},{"i":"t16","r":1,"t":{"18":"t17","25":"t18","26":"t19","27":"t20","32":"t21","33":"t22"},"c":{"18":[],"25":[{"i":"t18","r":1}],"26":[{"i":"t19","r":1}],"27":[],"32":[],"33":[]}}],"38":[],"39":[]}},{"c":{"0":[{"i":"c916637769","r":1}]}}]}</script></body></html>`;