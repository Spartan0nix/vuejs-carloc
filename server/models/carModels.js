const dbQuery = require('../config/dbQuery');

const getCarById = async (request, response) => {
    const id = parseInt(request.params.id);

    const getCarByIdQuery = `SELECT idrent, name, daily_price, pickup_office, status, refcar, horsepower, image, fuel, type_name, color, brand_name, gearbox, model_name, description
                FROM RENTS
                INNER JOIN STATUS ON STATUS.idstatus = RENTS.refstatus
                INNER JOIN CARS ON CARS.idcar = RENTS.refcar
                INNER JOIN FUELS ON FUELS.idfuel = CARS.reffuel
                INNER JOIN TYPES ON TYPES.idtype = CARS.reftype	
                INNER JOIN COLORS ON COLORS.idcolor = CARS.refcolor
                INNER JOIN BRANDS ON BRANDS.idbrand = CARS.refbrand
                INNER JOIN GEARBOXS ON GEARBOXS.idgearbox = CARS.refgearbox
                INNER JOIN MODELS ON MODELS.idmodel = CARS.refmodel
                WHERE refcar = $1 `;

    const values = [id];

    try {
        const results = await dbQuery.query(getCarByIdQuery, values);
        response.status(200).json(results.rows)
    }
    catch(error) {
        throw error;
    }
};

module.exports = {
    getCarById
}