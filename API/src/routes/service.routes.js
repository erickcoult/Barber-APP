const express = require('express');
const router = express.Router();
const aws = require('../services/aws');
const Salon = require('../models/salon');
const Archive = require('../models/archives');
const Service = require('../models/service');

// Route receives form data
router.post('/', async (req, res) => {
  try {
    const { salonId, service } = req.body;
    let errors = [];
    let archive = [];

    console.log(req.files);

    if (req.files && Object.keys(req.files).length > 0) {
      for (let key of Object.keys(req.files)) {
        const file = req.files[key];

        const nameParts = file.name.split('.');
        const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
        const path = `services/${salonId}/${fileName}`;

        const response = await aws.uploadToS3(file, path);

        if (response.error) {
          errors.push({ error: true, message: response.message });
        } else {
          archive.push(path);
        }
      }
    }

    if (errors.length > 0) {
      res.json(errors[0]);
      return false;
    }

    // Create Service
    let jsonService = JSON.parse(service);
    jsonService.salonId = salonId;

    const createdService = await new Service(jsonService).save();

    // Create archive
    archive = archive.map((archive) => ({
      referenceId: createdService._id,
      model: 'Service',
      archive: archive,
    }));

    await Archive.insertMany(archive);

    res.json({ service: createdService, archive });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { salonId, service } = req.body;
    let errors = [];
    let archive = [];

    console.log(req.files);

    if (req.files && Object.keys(req.files).length > 0) {
      for (let key of Object.keys(req.files)) {
        const file = req.files[key];

        const nameParts = file.name.split('.');
        const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
        const path = `services/${salonId}/${fileName}`;

        const response = await aws.uploadToS3(file, path);

        if (response.error) {
          errors.push({ error: true, message: response.message });
        } else {
          archive.push(path);
        }
      }
    }

    if (errors.length > 0) {
      res.json(errors[0]);
      return false;
    }

    // Update Service
    const jsonService = JSON.parse(service);
    jsonService.salonId = salonId;

    await Service.findByIdAndUpdate(req.params.id, jsonService);

    // Create archive
    archive = archive.map((archive) => ({
      referenceId: req.params.id,
      model: 'Service',
      archive: archive,
    }));

    await Archive.insertMany(archive);

    res.json({ error: false });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/salon/:salonId', async (req, res) => {
  try {
    let salonServices = [];

    const services = await Service.find({
      salonId: req.params.salonId,
      status: { $ne: 'D' }
    });

    for (let service of services) {
      const archives = await Archive.find({
        model: 'Service',
        referenceId: service._id
      });

      salonServices.push({ ...service._doc, archives });
    }

    res.json({
      services: salonServices
    });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/delete-archive/', async (req, res) => {
  try {
    const { id } = req.body;

    // Delete from AWS
    await aws.deleteFileS3(id);

    await Archive.findOneAndDelete({
      archive: id,
    });

    res.json({ error: false });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Service.findByIdAndUpdate(id, { status: 'D' });

    res.json({ error: false });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;