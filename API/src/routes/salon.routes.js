const express = require('express');
const router = express.Router();
const Salon = require('../models/salon');
const Service = require('../models/service');
const turf = require('@turf/turf');

router.post('/', async(req, res) => {
    try {
        const salon = await new Salon(req.body).save();
        res.json({ salon });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

router.get('/service/:salonId', async(req, res) => {
    try {
        const { salonId } = req.params;

        const service = await Service.find({
            salonId,
            status: 'A'
        }).select('_id title');

        res.json({
            service: service.map((s) => ({
                label: s.title,
                value: s._id
            })),
        });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id)
            .select('cover name address.city geo.coordinates phone');

        
        const distance = turf.distance(
            turf.point(salon.geo.coordinates),
            turf.point([-47.20038716239653, -23.075303854663254])
        ).toFixed(2);

        res.json({ error: false, salon, distance: `${distance} km` });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;