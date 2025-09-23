
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/comidas"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/user"
  },
  {
    "renderMode": 0,
    "route": "/product/*"
  },
  {
    "renderMode": 2,
    "route": "/cart"
  },
  {
    "renderMode": 2,
    "route": "/payment"
  },
  {
    "renderMode": 2,
    "route": "/orders"
  },
  {
    "renderMode": 2,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "route": "/admin/products"
  },
  {
    "renderMode": 2,
    "route": "/admin/users"
  },
  {
    "renderMode": 2,
    "route": "/admin/orders"
  },
  {
    "renderMode": 2,
    "route": "/admin/email"
  },
  {
    "renderMode": 2,
    "route": "/admin/profile"
  },
  {
    "renderMode": 0,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 517, hash: 'fed6e01c996a7e66041e986f0290f164781edcf4bbc339aae48da4413e38d7fd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1057, hash: '9daea2954d9831eb7b5c5961e7dadc22b7126a9904f00ac42b790798ee97aa21', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22242, hash: '49f0c1eda96a42a1ba11be8b5bb39f1bea84c1c12c63a18b80acacdfe4445f87', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 48862, hash: '7315a18e2ee7e4e6e6762d1733ef6d37b5205b00425fafd59d2ba89a699ae2f3', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'admin/email/index.html': {size: 25484, hash: '04fb8f43ba6df62d561186ff94da78c690ac04ca8b117a50c4f865185817cbb3', text: () => import('./assets-chunks/admin_email_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12023, hash: '38513449acf151f480dadb080adc06e0b99f1925b83a7f7f7d879d8cf2ce348d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'payment/index.html': {size: 38516, hash: 'ecd96e1c5226f87e540b2159e1fbb467515467aa28b5bfe1f2d93cab8ed306b6', text: () => import('./assets-chunks/payment_index_html.mjs').then(m => m.default)},
    'user/index.html': {size: 31253, hash: '51d9ef3d5817aa0030d71df8ed1b936e700bbff8df0383645b162a7629403170', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 44141, hash: 'd053066f7ec7dd1f13d449d3e857d77ad2273556919a6172985723a191a3ff1e', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 13390, hash: '816bcc533bcfe6a331d2f4ad9162d3ac0b9609e46bb8c9d6852242fbb4473bde', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 24875, hash: '8265d1ffbe7147d232d8c99dc8a86f174bb125e2f6b5f3ff67e05e79078ecef0', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin/products/index.html': {size: 24500, hash: '2ab0b724dd9faa6bc08706b858f30edd3e7a9fc00e3434563479d39feeab8fed', text: () => import('./assets-chunks/admin_products_index_html.mjs').then(m => m.default)},
    'admin/orders/index.html': {size: 77352, hash: 'fe6c6d2a6a0598ff7a05697abf05189dd3d6892449faaf52335c0df994f7d82e', text: () => import('./assets-chunks/admin_orders_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 50466, hash: '05c6254baa739cb96103e640bc2f39eb3e5836621dd58a80fad41f1207e5f927', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'admin/profile/index.html': {size: 30554, hash: 'bea188f9f1b4cc920e3aae90ebb5c6a913a97ce3ca450a275879bdd75783d3a2', text: () => import('./assets-chunks/admin_profile_index_html.mjs').then(m => m.default)},
    'comidas/index.html': {size: 52525, hash: '6812775a42850f499735c6f5550abbe990f564f9a0aa066c47051c70dca0c14b', text: () => import('./assets-chunks/comidas_index_html.mjs').then(m => m.default)}
  },
};
