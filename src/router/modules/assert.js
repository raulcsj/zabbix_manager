/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assertRouter = [
  {
    path: '/assert',
    component: Layout,
    name: 'Assert',
    redirect: '/assert/host',
    meta: { title: '资产管理', icon: 'example' },
    children: [
      {
        path: 'host',
        name: 'Host',
        component: () => import('@/views/assert/host'),
        meta: { title: '主机设备管理', icon: 'fas fa-server' }
      },
      {
        path: 'network',
        name: 'Network',
        component: () => import('@/views/assert/network'),
        meta: { title: '网络设备管理', icon: 'fas fa-network-wired' }
      }
    ]
  }
]

export default assertRouter
