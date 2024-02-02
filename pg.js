const {Pool} = require("pg")
//const util = require("util")

const poolPg = new Pool({
    host: '37.60.236.174',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
    port: 5437
})

async function q(sql, parametros){
    return new Promise(async (resolve, reject) => {
        poolPg.connect((err, client, done) => {
            if (err) reject(err)
            client.query(sql, parametros, (err, result) => {
                done()
                if (err){
                    reject(err)
                } else {
                    resolve(result.rows)
                }
            })
        })
    })
}

q("select * from Customers limit 2", []).then(rows =>{
    console.log(rows)
}).catch(err => {
    console.log(err)
}).finally(()=> {
    console.log("this appears always")
})