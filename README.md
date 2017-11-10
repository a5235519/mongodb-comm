<div align="center">
  <h1>MongoDB-comm</h1>
  <p>基于MongoDB数据库编写的增删改查基本功能<p>
  <p>大部分用ES6去构建项目，如有node不支持，请自行<a href="http://www.jianshu.com/p/a9c27b80af9d" target="#">查看方法</a></p>
</div>

<h2 align="center">引用</h2>

```js
import database from './database';
```

<h2 align="center">用法</h2>
**插入数据**：插入数据到对应数据表中
```js
/*
*** table 数据库名
*** forms 表明
*** data  插入数据
 */
database.insert(data, table, forms).then(function(){
	// 用于执行完整之后的回调
})
```

**查询数据**：根据条件查询数据，并将数据返回
```js
/*
*** condition  查询条件
*** result  返回查询后的数据
 */
database.searchData(condition, table, forms).then(function(result){
	// 用于执行完整之后的回调
})
```

**更新数据**：改变数据中的参数
```js
/*
*** whereStr 查询条件  {"name":'菜鸟教程'}
*** updateStr更改数据  {$set: { "url" : "https://www.runoob.com" }};
 */
database.updateData(whereStr, updateStr, table, forms).then(function(){
	// 用于执行完整之后的回调
})
```

**删除数据**：删除对应的数据
```js
/*
*** condition  查询条件
 */
database.deleteData(condition, table, forms).then(function(){
	// 用于执行完整之后的回调
})
```

