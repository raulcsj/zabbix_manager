/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const exampleRouter = [
  {
    path: '/exmaple',
    component: Layout,
    name: 'Charts',
    meta: {
      title: '自定义组件示例',
      icon: 'fas fa-blind'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/form'),
        meta: { title: 'Form', icon: 'form' }
      },
      {
        path: 'treeInput',
        name: 'TreeInput',
        component: () => import('@/views/example/TreeInput'),
        meta: { title: 'TreeInput', icon: 'tree' }
      },
      {
        path: 'nested',
        component: () => import('@/components/BlankRouterView'),
        name: 'Nested',
        meta: {
          title: 'Nested',
          icon: 'nested'
        },
        children: [
          {
            path: 'menu1',
            component: () => import('@/views/nested/menu1'), // Parent router-view
            name: 'Menu1',
            meta: { title: 'Menu1' },
            children: [
              {
                path: 'menu1-1',
                component: () => import('@/views/nested/menu1/menu1-1'),
                name: 'Menu1-1',
                meta: { title: 'Menu1-1' }
              },
              {
                path: 'menu1-2',
                component: () => import('@/views/nested/menu1/menu1-2'),
                name: 'Menu1-2',
                meta: { title: 'Menu1-2' },
                children: [
                  {
                    path: 'menu1-2-1',
                    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                    name: 'Menu1-2-1',
                    meta: { title: 'Menu1-2-1' }
                  },
                  {
                    path: 'menu1-2-2',
                    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                    name: 'Menu1-2-2',
                    meta: { title: 'Menu1-2-2' }
                  }
                ]
              },
              {
                path: 'menu1-3',
                component: () => import('@/views/nested/menu1/menu1-3'),
                name: 'Menu1-3',
                meta: { title: 'Menu1-3' }
              }
            ]
          },
          {
            path: 'menu2',
            component: () => import('@/views/nested/menu2'),
            meta: { title: 'menu2' }
          }
        ]
      },
      {
        path: 'tagsViewExample',
        redirect: 'index',
        component: () => import('@/components/BlankRouterView'),
        meta: { title: 'TagsView', icon: 'fas fa-tags' },
        children: [
          {
            path: 'index',
            name: 'TagsViewExample',
            component: () => import('@/views/example/TagsView'),
            meta: { title: 'TagsView示例', icon: 'fas fa-tags' }
          },
          {
            path: 'example',
            name: 'TagsViewExamplePage',
            component: () => import('@/views/example/TagsView/example'),
            hidden: true,
            meta: { title: 'TagsView测试页面', icon: 'fas fa-tags' }
          }
        ]
      },
      {
        path: 'external-link',
        component: Layout,
        children: [
          {
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
          }
        ]
      }
    ]
  }
]

export default exampleRouter
