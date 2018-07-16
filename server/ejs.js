


module.exports = function (app) {

	var getData =  (req, res, next)=>{
		var result =[];
		for(var i=0;i<30;i++){
			result.push({
				title:(Math.random()*100),
				desc:"拉数据、存数据和吐内容"
			});
		};
		return result;
	}

	app.get('/ejs/example', async function (req, res, next) {
		res.render('ejs',{data:getData()});
	});

	// app.get('*', function (req, res, next) {
	//   res.render('index');
	// });

};
