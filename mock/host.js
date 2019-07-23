import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'ip': '@shuffle(["@ip", "@ip"])',
    dataSource: '@ctitle',
    'operatorSystem|1': ['Windows', 'Linux OS', 'Unix Os'],
    hostId: '@integer(300, 5000)',
    vendor: '@ctitle',
    serverType: '@ctitle',
    'level|1': ['1', '2', '3', '4', '5'],
    application: '@ctitle',
    'status|1': ['published', 'draft', 'deleted'],
    hostName: '@ctitle',
    'middleWareType|1': ['Tomcat', 'Websphere', 'Weblogic'],
    payTime: +Mock.Random.date('T')
  }))
}

export default [
  {
    url: '/host/list',
    type: 'get',
    response: config => {
      const { advancedFilterConditions, page = 1, limit = 20, sort } = config.query

      let mockList = []

      if (advancedFilterConditions && advancedFilterConditions.length > 0) {
        advancedFilterConditions.forEach((filter) => {
          const orFilter = JSON.parse(filter)
          const orMockList = List.filter(listItem => {
            let matchItem = true
            orFilter.forEach((filterItem) => {
              if (listItem[filterItem.field].indexOf(filterItem.value) < 0) matchItem = false
            })
            return matchItem
          })
          mockList = mockList.concat(orMockList)
        })
      } else {
        mockList = List
      }

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/host/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const host of List) {
        if (host.id === +id) {
          return {
            code: 20000,
            data: host
          }
        }
      }
    }
  },

  {
    url: '/host/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/host/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

