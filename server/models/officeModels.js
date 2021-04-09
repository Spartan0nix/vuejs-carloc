const dbQuery = require('../config/dbQuery');

const getOffice = async (request, response) => {
    const search = request.query.search;

    const getOfficeQuery = `SELECT idoffice, street, city_name, city_code
                FROM OFFICES
                WHERE city_name  LIKE upper('%' || $1 || '%') 
                   OR street LIKE '%' || $2 || '%' 
                   OR CAST(city_code AS TEXT) LIKE '' || $1 || '%'
                ORDER BY city_name ASC`;
    
    const values = [search, search];

    try {
        const results = await dbQuery.query(getOfficeQuery, values);
        response.status(200).json(results.rows)
    }
    catch(error) {
        throw error;
    }
};

module.exports = {
    getOffice
}