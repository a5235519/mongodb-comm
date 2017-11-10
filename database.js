import Mongo from 'mongodb';

/**
 * 数据库操作
 * connect 连接数据库
 */
class databaseComm{
	constructor() {
		this.mongoClient = Mongo.MongoClient
		this.DB_CONN = 'mongodb://localhost:27017/'
	}

	// 连接数据库
	connect(name) {
		this.DB_CONN += name;
		return new Promise((res, rej) => {
			this.mongoClient.connect(this.DB_CONN, (err, db) => {
				if(err){
					rej();
					return false;
				}

				console.log("数据库连接成功");
				res(db)
			})
		});
	}

	insertData(db, forms, data) {

		return new Promise(function(res, rej){
			let collection = db.collection(forms);
			collection.insert(data, function(err, result){
				if(err){
					console.log('数据表插入失败')
					return
				}

				console.log('插入成功')
				res()
				db.close()
			})
		});
			
	}

	searchData(db, forms, condition) {

		return new Promise(function(res, rej){
			let collection = db.collection(forms);
			collection.find(condition).toArray(function(err, result){
				if(err){
					console.log('数据表查询失败')
					return
				}

				console.log('查询成功')
				res(result)
				db.close()
			})
		});

	}

	updateData(db, forms, whereStr, updateStr) {
		return new Promise(function(res, rej){
			let collection = db.collection(forms);
			collection.update(whereStr, updateStr, function(err, result) {
		        if(err)
		        {
		            console.log('更新失败');
		            return
		        }
		        console.log('更新成功')
		        res()
		        db.close()
		    });
		});
	}

	deleteData(db, forms, condition) {
		return new Promise(function(res, rej){
			let collection = db.collection(forms);
			collection.remove(condition, function(err, result) {
		        if(err)
		        {
		            console.log('删除失败');
		            return
		        }
		        console.log('删除成功')
		        res()
		        db.close()
		    });
		});	
	}
}

// 自执行Generator函数
function runGenerator(gen) {
	var g = gen();

	function next(data) {
		var result = g.next(data);
		if(result.done){
			return 
		}
		result.value.then(function(data){
			next(data);
		})
	}

	next();
}

const database = new databaseComm();

export default {
	/**
	 * insert 数据库插入
	 * 
	 *** table 数据库名
	 *** forms 表明
	 *** data  插入数据
	 *
	 * 相当于：
	 * database.connect(table).then(function(db){
	 *	database.insertData(dbs, forms, data).then(function(){
	 *	  
	 *  })
	 * })
	 * 
	 */
	insert(data = {}, table = 'xianfeng', forms = 'datas') {
		return new Promise(function(res, rej){
			// Generator
			function* gen() {
				let db = yield database.connect(table)
				let result = yield database.insertData(db, forms, data)

				res()
			}

			runGenerator(gen);
		});
	},

	/**
	 * searchData 数据库查询
	 * 
	 *** condition 查询条件
	 */
	searchData(condition = {}, table = 'xianfeng', forms = 'datas') {
		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.searchData(db, forms, condition)
				
				res(result)
			}

			runGenerator(gen)
		});
	},

	/**
	 * updateData 更新数据
	 *
	 *** whereStr 查询条件 {"name":'菜鸟教程'}
	 *** updateStr更改数据  {$set: { "url" : "https://www.runoob.com" }};
	 *
	 */
	updateData(whereStr, updateStr, table = 'xianfeng', forms = 'datas') {
		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.updateData(db, forms, whereStr, updateStr)
				
				res()
			}

			runGenerator(gen)
		});
	},

	/**
	 * deleteData 删除数据
	 */
	deleteData(condition, table = 'xianfeng', forms = 'datas') {
		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.deleteData(db, forms, condition)
				
				res()
			}

			runGenerator(gen)
		});
	}
}