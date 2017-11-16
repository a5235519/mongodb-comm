import Mongo from 'mongodb';
import BASE from './base';

/**
 * 数据库操作
 * connect 连接数据库
 */
class databaseComm{
	constructor() {
		this.mongoClient = Mongo.MongoClient
		this.DB_CONN = this.DB_HOST = 'mongodb://localhost:27017/'
	}

	// 连接数据库
	connect(name) {
		let first = this.DB_CONN.split(this.DB_HOST);
		if(first[1] == '' || !first[1]){
			this.DB_CONN += name
		}else{
			this.DB_CONN = this.DB_HOST + name;
		}
		console.log(this.DB_CONN)
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
					console.log('数据表插入失败:'+err)
					return false;
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
		
		typeof data == 'string' ? data = eval('('+ data +')') : data ;

		return new Promise(function(res, rej){
			// Generator
			function* gen() {
				let db = yield database.connect(table)
				let result = yield database.insertData(db, forms, data)

				res()
			}

			BASE.runGenerator(gen)
		});
	},

	/**
	 * searchData 数据库查询
	 * 
	 *** condition 查询条件
	 */
	searchData(condition = {}, table = 'xianfeng', forms = 'datas') {

		typeof condition == 'string' ? condition = eval('('+ condition +')') : condition ;

		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.searchData(db, forms, condition)
				
				res(result)
			}

			BASE.runGenerator(gen)
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

		typeof whereStr == 'string' ? whereStr = eval('('+ whereStr +')') : whereStr ;
		typeof updateStr == 'string' ? updateStr = eval('('+ updateStr +')') : updateStr ;

		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.updateData(db, forms, whereStr, updateStr)
				
				res()
			}

			BASE.runGenerator(gen)
		});
	},

	/**
	 * deleteData 删除数据
	 */
	deleteData(condition, table = 'xianfeng', forms = 'datas') {

		typeof condition == 'string' ? condition = eval('('+ condition +')') : condition ;

		return new Promise(function(res, rej){
			function* gen(){
				let db = yield database.connect(table)
				let result = yield database.deleteData(db, forms, condition)
				
				res()
			}

			BASE.runGenerator(gen)
		});
	}
}