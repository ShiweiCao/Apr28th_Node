const Message = require('../models/message');
const mongoose = require('mongoose');

exports.messages_get_all = (req, res, next) => {
  Message.find()
  .select('name, email content _id') // fetch these fields
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      messages: docs.map(doc => {
        return {
          name: doc.name,
          email: doc.email,
          content: doc.content,
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

exports.messages_create_message = (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    content: req.body.content
  });
  message.save()
  .then(result => {
    res.status(200).json({
      message: 'Handling POST request to /messages',
      message: {
        name: result.name,
        email: result.email,
        content: result.content,
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

exports.messages_get_message_by_id = (req, res, next) => {
  const id = req.params.messageId;
  Message.findById(id)
  .select('name email content _id')
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


exports.messages_delete = (req, res, next) => {
  const id = req.params.messageId;
  Message.remove({ _id: id })
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
