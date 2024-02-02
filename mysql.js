const mysql = require("mysql8")

const pool = mysql.createPool({
    host: '37.60.236.174',
    user: 'root',
    password: '1234',
    database: 'northwind',
    port: 3306
})

function q(sql) {
    return new Promise((resolver, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject (error);
            return resolver(results);
        })
    })
}

q("select * from Customers limit 2").then(data => {
    console.log(data)
}).catch(err =>{
    console.log(err)
})