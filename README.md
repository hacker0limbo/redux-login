# Redux Login

Login Auth using React and Redux

关于组织 redux 文件结构的文章:
- https://redux.js.org/faq/code-structure
- https://jaysoo.ca/2016/02/28/organizing-redux-application/
- https://marmelab.com/blog/2015/12/17/react-directory-structure.html

全局使用 history 对象:
- https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components

关于 redux 里面的 reducer, action
- action 里面返回的数据可以是部分的, 最好是获取到的数据(动态的, 不是类似于 `true` 这种), 比如异步请求得到的数据, reducer 返回的是一个完整的 state, 所以有些状态不一定要在 action  里面写明, 直接在 reducer 里面显示声明, 例如

```javascript
// 这个 action 里面的 url 就是 dispatch 这个 action 可以得到的数据
const fetchUserRequest = (url) => {
  return {
    type: 'xxx',
    url,
    // isLoading: false
  }
}

// 这里的 url 需要根据 action 获取, 但是 isLoading 可以显示在 reducer 里面写死
const userReducer = (action, state) => {
  switch(action.type) {
    case: 'xxx':
      return {
        isLoading: false,
        url: action.url
      }
  }
}
```

bookshelf 关于数据库问题: 
- https://github.com/bookshelf/bookshelf/issues/1448#issuecomment-320531760
关于使用 forege 和 new
- https://stackoverflow.com/q/33635271/12733140
- https://stackoverflow.com/q/32101415/12733140
教程: 
- https://github.com/apachecn/zetcode-zh/blob/master/docs/js/75.md
- https://www.jianshu.com/p/0a6dd4be9438

关于重用 reducer 代码的:
- https://alligator.io/redux/higher-order-reducers/
- https://alligator.io/redux/reset-state-redux/

关于 redux 里面计算 computed state, selectors:
- https://github.com/reduxjs/redux/issues/749
- https://www.reddit.com/r/reactjs/comments/cre9ar/how_to_get_computed_state_in_redux/

HOC
- https://stackoverflow.com/a/55894379/12733140