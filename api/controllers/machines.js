const Machine = require('../models/machine');
const mongoose = require('mongoose');

exports.machines_get_all = (req, res, next) => {
  Machine.find()
  .select('location status _id') // fetch these fields
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      machines: docs.map(doc => {
        return {
          location: doc.location,
          status: doc.status,
          _id: doc._id,
        }
      }),
    };
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
}

exports.machines_create_machine = (req, res, next) => {
  const machine = new Machine({
    _id: new mongoose.Types.ObjectId(),
    location: req.body.location,
    status: req.body.status,
  });
  machine.save()
  .then(result => {
    res.status(200).json({
      message: 'Handling POST request to /machines',
      machine: {
        location: result.location,
        status: result.status,
        _id: result._id,
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

exports.machines_get_machine_by_id = (req, res, next) => {
  const id = req.params.machineId;
  Machine.findById(id)
  .select('location status _id')
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'no valid entry'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}


exports.machines_delete = (req, res, next) => {
  const id = req.params.machineId;
  Machine.remove({ _id: id })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'message deleted',
    });
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
}
