const pool = require('./pool').pool;

module.exports = {
    /**
     * Execute a query
     * @param {object} queryText (SQL Query)
     * @param {object} params (values associate to $x in the SQL Query)
     */
    query(queryText, params) {
        return new Promise((resolve, reject) => {
            pool.query(queryText, params)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};