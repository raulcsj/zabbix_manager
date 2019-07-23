/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assertRouter = [
  {
    path: '/assert',
    component: Layout,
    name: 'Assert',
    redirect: '/assert/host/list',
    meta: { title: '资产管理', icon: 'example' },
    children: [
      {
        path: 'host',
        name: 'Host',
        component: () => import('@/components/BlankRouterView'),
        redirect: '/assert/host/list',
        meta: { title: '主机设备管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/assert/host/list'),
            name: 'HostList',
            meta: { title: '主机设备管理', icon: 'fas fa-server' }
          },
          {
            path: 'create',
            component: () => import('@/views/assert/host/create'),
            name: 'CreateHost',
            meta: { title: '添加主机', icon: 'edit' },
            hidden: true
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/assert/host/edit'),
            name: 'EditHost',
            meta: { title: '编辑主机', icon: 'edit' },
            props: true,
            hidden: true
          }]
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
