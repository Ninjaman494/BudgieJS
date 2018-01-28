var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.196.199.139",
  user: "root",
  password: "password"
});

con.connect();


con.query("use mydb",function(){});


disp_day(disp_callback,"2018-01-29");


con.end();


function disp_callback(rows,fields) { //change params to just the date obj
	console.log("entries:",rows);

	}

function disp_day(disp_callback,day)  {
	var dt=new Date(day); var isoDate="";
	var convtoISO=new Date(dt.getFullYear(),dt.getMonth(),dt.getUTCDate());
	isoDate=(convtoISO.toISOString()).slice(0,10); //is in the same format as the date in the table. fix select where.
		console.log(isoDate);


	con.query("select * from entry where date="+"'"+isoDate+"'",function(err,rows,fields) {

	if(err) throw err;

	disp_callback(rows,fields);
	//	console.log("if one:",ifOne); true
	});

}

function add_callback(rows,source,value,description,name,id) {

	con.query("update entry	SET source ="+"'"+ source+"'"+ ", value="+"'"+value"'"+", description="+"'"+description+"'"+", name="+"'"+name+"'"+" WHERE "+"'"+rows[0].entry_id+"'"+"="+"'"+id+"'");

	return true;
}






function add_day(source,value,description,name) {
	var dt1=new date(day); var isoDate1="";
	var convtoISO1=new Date(dt1.getFullYear(),dt1.getMonth(),dt1.getUTCDate());
	isoDate1=(convtoISO.toISOString()).slice(0,10);


	con.query("select * from entry where exists (select * from entry where date ="+"'"+isoDate1+"'",function(err,rows,fields) {
		if(err) throw err;
	
		add_callback(rows,source,value,description,name,rows[0].entry_id);
	}
}



