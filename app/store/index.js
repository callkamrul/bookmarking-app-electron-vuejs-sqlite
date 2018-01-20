import { EventEmitter } from 'events';

const store = new EventEmitter();

store.getCensuses = function (cb) {
	var censuses = {};
	db.each("select id, catName, catColor, (select count(id) from bookmarks where bookmarks.category_id=categories.id) as bookmarkCount from categories", function (err, row) {
		censuses[row.id] = row;
	}, function (err, rowCount) {
		cb(null, censuses);
	});
}

store.getCensus = function (catId, cb) {
	db.get("select id, catName, catColor from categories where id=?", { 1: catId },
		function (err, row) {
			cb(null, row);
		});
}

store.addCensus = (Census) => {
	db.serialize(function () {
		var stmt = db.prepare("insert into categories('catName', 'catColor') values(?, ?)");
		// for (var var1 in Census) {
		// stmt.run(var1, Census[var1]);
		// }
		stmt.run(Census.catName, Census.catColor);
		store.emit('data-updated');
	});
}

store.editCensus = (catId, Census) => {
	db.serialize(function () {
		db.run("update categories set catName=?, catColor=? where id=?", {
			1: Census.catName,
			2: Census.catColor,
			3: catId
		});
		store.emit('data-updated');
	});
}

store.deleteCensus = (catId) => {
	db.serialize(function () {
		var stmt = db.prepare("delete from categories where id=?");
		stmt.run(catId);
		store.emit('data-updated');
	});
}



export default store
