const dbQuery = require('../config/dbQuery');

exports.getRents = async (request, response) => {
    const start = request.query.start;
    const end = request.query.end;
    const office = request.query.office;

    const getRentsQuerry = `SELECT idrent, name, daily_price, startavailable_date, endavailable_date, pickup_office, status, refcar, refstatus, horsepower, image, fuel, type_name, color
                FROM RENTS
                INNER JOIN STATUS ON STATUS.idstatus = RENTS.refstatus
                INNER JOIN CARS ON CARS.idcar = RENTS.refcar
                INNER JOIN FUELS ON FUELS.idfuel = CARS.reffuel
                INNER JOIN TYPES ON TYPES.idtype = CARS.reftype	
                INNER JOIN COLORS ON COLORS.idcolor = CARS.refcolor
                WHERE startAvailable_date < $1
                AND endAvailable_date >= $2
                AND pickup_office = $3 `;
    const values = [start, end, office];

    try {
        const results = await dbQuery.query(getRentsQuerry, values);
        response.status(200).json(results.rows)
    }
    catch(error) {
        throw error;
    }
};

exports.udpateRent = async (req, res) => {
    let values = [
        req.body.total_price,
        req.body.start_date,
        req.body.end_date,
        req.body.idOffice,
        req.iduser,
        req.body.idrent
    ];

    const udpateRentQuerry = `UPDATE RENTS
                              SET total_price = $1,
                                  pickup_date = $2,
                                  return_date = $3,
                                  return_office = $4,
                                  refstatus = 2,
                                  refuser = $5
                              WHERE idrent = $6`;
    
    dbQuery.query(udpateRentQuerry, values)
    .then(rent => {
        res.status(200).json({
            "message": "Reservation réussi",
            "rent": rent.rows
        });
    })
    .catch(err => {
        res.status(500).json({
            "message": "Erreur lors de votre reservation",
            "err": err
        });
    })
}