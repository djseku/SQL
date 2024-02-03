const oracledb = require('oracledb');

var pool = null
try {
oracledb.initOracleClient({ libDir: "C:\\Users\\oracle-client"});
} catch (err) {
console.error('Whoops!');
console.error(err);
process.exit(1);
}

async function getPool(con) {
    return new Promise(async (resolve, reject) => {
        if (pool) resolve(pool)
        try {
            console.log("obtengo pool")
            pool = await oracledb.createPool(con)
            resolve(pool)
        } catch (error) {
            reject(error)
        }
    });
}

async function q(sql, parametros) {
    let connection;
    try {
        await getPool({
            user: 'c##dataos', 
            password: 'datos',
            connectString:"37.60.236.174:1521/XE", poolAlias: "curso"
        })
        connection = await oracledb.getConnection("curso");
        const result = await connection.execute(
            sql,
            parametros, { outFormat: oracledb.OBJECT },
        );
        return (result.rows);
    } catch (err) {
        return err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return err;
            }
        }
    }
}

q("SELECT * FROM CATEGORIES").then(R => {
    console.log(R).catch(e => {console.log(e)})
})