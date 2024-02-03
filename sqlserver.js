const mssql = require("mssql")

const sqlConfig = {
    server: '37.60.236.174',
    user: 'sa',
    password: 'Artema11',
    database: 'master',
    pool:{
        min:0,
        max:10,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        turstServerCertificates:true
    }
}
async function q(sql, params){
    try {
        await mssql.connect(sqlConfig)
        const result = await mssql.query(sql)
        return result;
    } catch (err){
        return {err:JSON.stringify(err)}
    }
}

q("select * from Customers").then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})