const user = require("../Modules/user");

exports.getUser = (req, res) => {
    try {
        user.find((err, data) => {
            if (err) {
                return res.status(400).send({ message: 'Error while retrieving Users' })
            }
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.getUserId = (req, res) => {
    try {
        user.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: 'Error while retrieving an Users' })
            }
            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};



