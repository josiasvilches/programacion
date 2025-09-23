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
/*# sourceMappingURL=/app.css.map */</style><style ng-app-id="ng">@import "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";



.admin-content[_ngcontent-ng-c2006698747] {
  font-family: "Inter", sans-serif;
}
.smooth-transition[_ngcontent-ng-c2006698747] {
  transition: all 0.3s ease;
}
.gradient-bg[_ngcontent-ng-c2006698747] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.card-hover[_ngcontent-ng-c2006698747] {
  transition: all 0.3s ease;
}
.card-hover[_ngcontent-ng-c2006698747]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.animate-fade-in[_ngcontent-ng-c2006698747] {
  animation: _ngcontent-ng-c2006698747_fadeIn 0.5s ease-in;
}
@keyframes _ngcontent-ng-c2006698747_fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.modal-overlay[_ngcontent-ng-c2006698747] {
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.modal-content[_ngcontent-ng-c2006698747] {
  animation: _ngcontent-ng-c2006698747_modalSlideIn 0.3s ease-out;
}
@keyframes _ngcontent-ng-c2006698747_modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.profile-header[_ngcontent-ng-c2006698747]   .cover-gradient[_ngcontent-ng-c2006698747] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.profile-header[_ngcontent-ng-c2006698747]   .profile-avatar[_ngcontent-ng-c2006698747]   .avatar-initials[_ngcontent-ng-c2006698747] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.profile-header[_ngcontent-ng-c2006698747]   .profile-avatar[_ngcontent-ng-c2006698747]   .edit-avatar-btn[_ngcontent-ng-c2006698747]:hover {
  transform: scale(1.1);
}
.profile-header[_ngcontent-ng-c2006698747]   .profile-layout[_ngcontent-ng-c2006698747] {
  transition: all 0.3s ease;
}
@media (max-width: 1024px) {
  .profile-header[_ngcontent-ng-c2006698747]   .profile-layout[_ngcontent-ng-c2006698747] {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
}
.profile-header[_ngcontent-ng-c2006698747]   .profile-avatar-container[_ngcontent-ng-c2006698747] {
  position: relative;
}
@media (max-width: 1024px) {
  .profile-header[_ngcontent-ng-c2006698747]   .profile-avatar-container[_ngcontent-ng-c2006698747] {
    display: flex;
    justify-content: center;
  }
}
@media (max-width: 1024px) {
  .profile-header[_ngcontent-ng-c2006698747]   .profile-content[_ngcontent-ng-c2006698747] {
    margin-left: 0;
    margin-top: 1rem;
  }
}
@media (max-width: 1024px) {
  .profile-header[_ngcontent-ng-c2006698747]   .profile-actions-container[_ngcontent-ng-c2006698747] {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .profile-header[_ngcontent-ng-c2006698747]   .profile-actions-container[_ngcontent-ng-c2006698747]   button[_ngcontent-ng-c2006698747] {
    width: 100%;
    max-width: 200px;
  }
}
.stats-grid[_ngcontent-ng-c2006698747]   .stat-item[_ngcontent-ng-c2006698747]   .stat-value[_ngcontent-ng-c2006698747] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.toggle-switch[_ngcontent-ng-c2006698747]   input[_ngcontent-ng-c2006698747]:checked    + .toggle-slider[_ngcontent-ng-c2006698747] {
  background-color: #ef4444;
}
.toggle-switch[_ngcontent-ng-c2006698747]   input[_ngcontent-ng-c2006698747]:focus    + .toggle-slider[_ngcontent-ng-c2006698747] {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
}
.security-btn[_ngcontent-ng-c2006698747]:hover {
  background-color: rgba(243, 244, 246, 0.5);
  transform: translateX(4px);
}
.security-btn[_ngcontent-ng-c2006698747]   .icon-wrapper.blue[_ngcontent-ng-c2006698747] {
  background-color: rgba(59, 130, 246, 0.1);
}
.security-btn[_ngcontent-ng-c2006698747]   .icon-wrapper.green[_ngcontent-ng-c2006698747] {
  background-color: rgba(34, 197, 94, 0.1);
}
.security-btn[_ngcontent-ng-c2006698747]   .icon-wrapper.purple[_ngcontent-ng-c2006698747] {
  background-color: rgba(168, 85, 247, 0.1);
}
.logout-btn[_ngcontent-ng-c2006698747] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
}
.logout-btn[_ngcontent-ng-c2006698747]:hover {
  background:
    linear-gradient(
      135deg,
      #dc2626 0%,
      #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}
.form-input[_ngcontent-ng-c2006698747] {
  transition: all 0.2s ease;
}
.form-input[_ngcontent-ng-c2006698747]:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  transform: translateY(-1px);
}
.form-textarea[_ngcontent-ng-c2006698747] {
  resize: vertical;
  min-height: 120px;
}
.loading-spinner[_ngcontent-ng-c2006698747] {
  animation: _ngcontent-ng-c2006698747_spin 1s linear infinite;
}
@keyframes _ngcontent-ng-c2006698747_spin {
  to {
    transform: rotate(360deg);
  }
}
.notification[_ngcontent-ng-c2006698747] {
  animation: _ngcontent-ng-c2006698747_slideInRight 0.3s ease-out;
}
@keyframes _ngcontent-ng-c2006698747_slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@media (max-width: 1024px) {
  .admin-content[_ngcontent-ng-c2006698747] {
    margin-left: 0;
    padding-top: 64px;
  }
}
@media (max-width: 768px) {
  .admin-content[_ngcontent-ng-c2006698747] {
    padding-top: 8rem;
    padding-left: 4.2rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .cover-gradient[_ngcontent-ng-c2006698747] {
    height: 24rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747] {
    padding-top: 2rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-avatar[_ngcontent-ng-c2006698747] {
    margin-top: -4rem;
    margin-bottom: 0;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-details[_ngcontent-ng-c2006698747] {
    margin-top: 1.5rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-details[_ngcontent-ng-c2006698747]   h1[_ngcontent-ng-c2006698747] {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-details[_ngcontent-ng-c2006698747]   .profile-meta[_ngcontent-ng-c2006698747] {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-actions[_ngcontent-ng-c2006698747] {
    margin-top: 1.5rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-actions[_ngcontent-ng-c2006698747]   button[_ngcontent-ng-c2006698747] {
    width: 100%;
    justify-content: center;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .content-grid[_ngcontent-ng-c2006698747] {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .content-grid[_ngcontent-ng-c2006698747]   .sidebar-content[_ngcontent-ng-c2006698747] {
    order: -1;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .modal-content[_ngcontent-ng-c2006698747] {
    margin: 0.5rem;
    max-height: calc(100vh - 1rem);
  }
  .admin-content[_ngcontent-ng-c2006698747]   .card-hover[_ngcontent-ng-c2006698747]   .p-6[_ngcontent-ng-c2006698747] {
    padding: 1rem;
  }
}
@media (max-width: 640px) {
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747] {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .admin-content[_ngcontent-ng-c2006698747]   .profile-header[_ngcontent-ng-c2006698747]   .profile-info[_ngcontent-ng-c2006698747]   .profile-details[_ngcontent-ng-c2006698747]   h1[_ngcontent-ng-c2006698747] {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747] {
  background-color: #1a1a1a;
  color: #ffffff;
}
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .card-hover[_ngcontent-ng-c2006698747] {
  background-color: #2d2d2d;
  border-color: #404040;
}
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .card-hover[_ngcontent-ng-c2006698747]:hover {
  background-color: #353535;
}
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .form-input[_ngcontent-ng-c2006698747], 
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .form-textarea[_ngcontent-ng-c2006698747] {
  background-color: #2d2d2d;
  border-color: #404040;
  color: #ffffff;
}
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .form-input[_ngcontent-ng-c2006698747]:focus, 
.dark-mode[_ngcontent-ng-c2006698747]   .admin-content[_ngcontent-ng-c2006698747]   .form-textarea[_ngcontent-ng-c2006698747]:focus {
  background-color: #353535;
  border-color: #ef4444;
}
@media (prefers-reduced-motion: reduce) {
  *[_ngcontent-ng-c2006698747], 
   *[_ngcontent-ng-c2006698747]::before, 
   *[_ngcontent-ng-c2006698747]::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
.focus-visible[_ngcontent-ng-c2006698747] {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}
.modal-content[_ngcontent-ng-c2006698747]::-webkit-scrollbar {
  width: 6px;
}
.modal-content[_ngcontent-ng-c2006698747]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.modal-content[_ngcontent-ng-c2006698747]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
.modal-content[_ngcontent-ng-c2006698747]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
/*# sourceMappingURL=/admin-profile.component.css.map */</style><style ng-app-id="ng">

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
  <app-root ng-version="20.3.1" _nghost-ng-c3984273398="" ngh="3" ng-server-context="ssg"><router-outlet _ngcontent-ng-c3984273398=""></router-outlet><app-admin-profile _nghost-ng-c2006698747="" ngh="2"><app-admin-sidebar _ngcontent-ng-c2006698747="" _nghost-ng-c2156486322="" ngh="0"><div _ngcontent-ng-c2156486322="" class="fixed left-0 top-0 h-full w-16 bg-white shadow-lg z-50"><div _ngcontent-ng-c2156486322="" class="flex flex-col h-full"><div _ngcontent-ng-c2156486322="" class="flex items-center justify-center h-16 border-b border-gray-200"><div _ngcontent-ng-c2156486322="" routerlink="/" class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm" tabindex="0" jsaction="click:;"> RC </div></div><nav _ngcontent-ng-c2156486322="" class="flex-1 py-4"><div _ngcontent-ng-c2156486322="" class="space-y-2 px-2"><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition active" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Panel General</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Productos</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Usuarios</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Pedidos</div></div><div _ngcontent-ng-c2156486322="" routerlinkactive="active" class="sidebar-item rounded-lg p-3 cursor-pointer smooth-transition" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c2156486322="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 mx-auto"><path _ngcontent-ng-c2156486322="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><div _ngcontent-ng-c2156486322="" class="tooltip">Email Marketing</div></div><!--container--></div></nav></div></div></app-admin-sidebar><app-admin-header _ngcontent-ng-c2006698747="" title="Perfil" _nghost-ng-c308276287="" ngh="1"><header _ngcontent-ng-c308276287="" class="bg-white shadow-sm border-b border-gray-200 top-0 z-40 absolute left-0 w-full pl-16"><div _ngcontent-ng-c308276287="" class="px-6 py-4"><div _ngcontent-ng-c308276287="" class="flex items-center justify-between"><div _ngcontent-ng-c308276287=""><h1 _ngcontent-ng-c308276287="" class="text-2xl font-bold text-gray-800">Perfil</h1><p _ngcontent-ng-c308276287="" class="text-gray-600 text-sm mt-1 subtitle">Gestiona tu rotisería</p></div><div _ngcontent-ng-c308276287="" class="flex items-center space-x-4"><div _ngcontent-ng-c308276287="" class="flex items-center space-x-2 text-sm text-gray-600"><svg _ngcontent-ng-c308276287="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c308276287="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span _ngcontent-ng-c308276287="">07:36:36 p.&nbsp;m.</span></div><div _ngcontent-ng-c308276287="" class="h-6 w-px bg-gray-300"></div><div _ngcontent-ng-c308276287="" class="relative"><button _ngcontent-ng-c308276287="" class="user-button flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer" jsaction="click:;"><div _ngcontent-ng-c308276287="" class="user-avatar w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium"> A </div><span _ngcontent-ng-c308276287="" class="text-sm font-medium text-gray-700 md:block hidden">Admin</span><svg _ngcontent-ng-c308276287="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 transition-transform duration-200"><path _ngcontent-ng-c308276287="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><!--container--></div></div></div></div></header></app-admin-header><div _ngcontent-ng-c2006698747="" class="admin-content ml-16 pt-16 min-h-screen bg-gray-50"><div _ngcontent-ng-c2006698747="" class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8"><div _ngcontent-ng-c2006698747="" class="bg-white rounded-xl shadow-sm mb-8 animate-fade-in"><div _ngcontent-ng-c2006698747="" class="relative"><div _ngcontent-ng-c2006698747="" class="h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-t-xl"></div><div _ngcontent-ng-c2006698747="" class="relative px-6 pb-6"><div _ngcontent-ng-c2006698747="" class="flex flex-col lg:flex-row lg:items-end -mt-16 mb-6 gap-6"><div _ngcontent-ng-c2006698747="" class="flex justify-center lg:justify-start"><div _ngcontent-ng-c2006698747="" class="relative"><div _ngcontent-ng-c2006698747="" class="w-32 h-32 bg-white rounded-full p-2 shadow-lg"><div _ngcontent-ng-c2006698747="" class="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white text-4xl font-bold"> AC </div></div><button _ngcontent-ng-c2006698747="" class="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 smooth-transition"><svg _ngcontent-ng-c2006698747="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c2006698747="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button></div></div><div _ngcontent-ng-c2006698747="" class="flex-1 text-center lg:text-left lg:ml-6"><h1 _ngcontent-ng-c2006698747="" class="text-2xl lg:text-3xl font-bold text-gray-800">Alejandro Cacho</h1><p _ngcontent-ng-c2006698747="" class="text-gray-600 text-base lg:text-lg">Administrador Principal</p><p _ngcontent-ng-c2006698747="" class="text-gray-500 text-sm mt-1">Rotisería Cacho - Propietario</p><div _ngcontent-ng-c2006698747="" class="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-4"><div _ngcontent-ng-c2006698747="" class="flex items-center justify-center lg:justify-start text-sm text-gray-600"><svg _ngcontent-ng-c2006698747="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 mr-2"><path _ngcontent-ng-c2006698747="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-9 0v10a2 2 0 002 2h8a2 2 0 002-2V7H7z"></path></svg> Miembro desde Enero 2020 </div></div></div><div _ngcontent-ng-c2006698747="" class="flex justify-center lg:justify-end w-full lg:w-auto"><button _ngcontent-ng-c2006698747="" class="w-full lg:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2006698747="" class="flex items-center justify-center space-x-2"><svg _ngcontent-ng-c2006698747="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path _ngcontent-ng-c2006698747="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg><span _ngcontent-ng-c2006698747="">Editar Perfil</span></div></button></div></div></div></div></div><div _ngcontent-ng-c2006698747="" class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"><div _ngcontent-ng-c2006698747="" class="order-2 lg:order-1 lg:col-span-2 space-y-6 lg:space-y-8"><div _ngcontent-ng-c2006698747="" class="bg-white rounded-xl shadow-sm card-hover"><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 border-b border-gray-200"><h2 _ngcontent-ng-c2006698747="" class="text-lg font-semibold text-gray-800">Información Personal</h2></div><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 space-y-6"><div _ngcontent-ng-c2006698747="" class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"><div _ngcontent-ng-c2006698747=""><label _ngcontent-ng-c2006698747="" class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label><div _ngcontent-ng-c2006698747="" class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base">Alejandro Cacho</div></div><div _ngcontent-ng-c2006698747=""><label _ngcontent-ng-c2006698747="" class="block text-sm font-medium text-gray-700 mb-2">Email</label><div _ngcontent-ng-c2006698747="" class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base break-all">alejandro@rotiseriacacho.com</div></div><div _ngcontent-ng-c2006698747=""><label _ngcontent-ng-c2006698747="" class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label><div _ngcontent-ng-c2006698747="" class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base">+54 11 4567-8900</div></div></div></div></div></div><div _ngcontent-ng-c2006698747="" class="order-1 lg:order-2 space-y-6 lg:space-y-8"><div _ngcontent-ng-c2006698747="" class="bg-white rounded-xl shadow-sm card-hover"><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 border-b border-gray-200"><h3 _ngcontent-ng-c2006698747="" class="text-lg font-semibold text-gray-800">Estadísticas Rápidas</h3></div><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 space-y-3 sm:space-y-4"><div _ngcontent-ng-c2006698747="" class="flex items-center justify-between"><span _ngcontent-ng-c2006698747="" class="text-gray-600 text-sm sm:text-base">Productos Activos</span><span _ngcontent-ng-c2006698747="" class="font-semibold text-gray-800 text-sm sm:text-base">24</span></div><div _ngcontent-ng-c2006698747="" class="flex items-center justify-between"><span _ngcontent-ng-c2006698747="" class="text-gray-600 text-sm sm:text-base">Clientes Registrados</span><span _ngcontent-ng-c2006698747="" class="font-semibold text-gray-800 text-sm sm:text-base">1,247</span></div><div _ngcontent-ng-c2006698747="" class="flex items-center justify-between"><span _ngcontent-ng-c2006698747="" class="text-gray-600 text-sm sm:text-base">Pedidos Este Mes</span><span _ngcontent-ng-c2006698747="" class="font-semibold text-gray-800 text-sm sm:text-base">342</span></div><div _ngcontent-ng-c2006698747="" class="flex items-center justify-between"><span _ngcontent-ng-c2006698747="" class="text-gray-600 text-sm sm:text-base">Ventas Este Mes</span><span _ngcontent-ng-c2006698747="" class="font-semibold text-green-600 text-sm sm:text-base">\$1.245.600</span></div><div _ngcontent-ng-c2006698747="" class="flex items-center justify-between"><span _ngcontent-ng-c2006698747="" class="text-gray-600 text-sm sm:text-base">Campañas Enviadas</span><span _ngcontent-ng-c2006698747="" class="font-semibold text-gray-800 text-sm sm:text-base">47</span></div></div></div><div _ngcontent-ng-c2006698747="" class="bg-white rounded-xl shadow-sm card-hover"><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 border-b border-gray-200"><h3 _ngcontent-ng-c2006698747="" class="text-lg font-semibold text-gray-800">Seguridad</h3></div><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6 space-y-4"><button _ngcontent-ng-c2006698747="" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2006698747="" class="flex items-center space-x-3"><div _ngcontent-ng-c2006698747="" class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg _ngcontent-ng-c2006698747="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4 text-blue-600"><path _ngcontent-ng-c2006698747="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7V3a2 2 0 012-2h4a2 2 0 012 2v4M7 7H3a2 2 0 00-2 2v6a2 2 0 002 2h4m-4-8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div _ngcontent-ng-c2006698747=""><p _ngcontent-ng-c2006698747="" class="font-medium text-gray-800 text-sm sm:text-base">Cambiar Contraseña</p><p _ngcontent-ng-c2006698747="" class="text-xs sm:text-sm text-gray-600">Actualizar tu contraseña</p></div></div></button></div></div><div _ngcontent-ng-c2006698747="" class="bg-white rounded-xl shadow-sm card-hover"><div _ngcontent-ng-c2006698747="" class="p-4 sm:p-6"><button _ngcontent-ng-c2006698747="" class="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-600 smooth-transition" jsaction="click:;"><div _ngcontent-ng-c2006698747="" class="flex items-center justify-center space-x-2"><svg _ngcontent-ng-c2006698747="" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 sm:w-5 h-4 sm:h-5"><path _ngcontent-ng-c2006698747="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span _ngcontent-ng-c2006698747="" class="text-sm sm:text-base">Cerrar Sesión</span></div></button></div></div></div></div></div></div><!--container--></app-admin-profile><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"7":"t28"},"c":{"7":[{"i":"t28","r":1,"x":5}]}},{"t":{"23":"t29"},"c":{"23":[]}},{"t":{"114":"t33"},"c":{"114":[]}},{"c":{"0":[{"i":"c2006698747","r":1}]}}]}</script></body></html>`;