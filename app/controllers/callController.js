const Call = require('../models/Call');

exports.saveCallId = async (req, res) => {
  try {
    const { id, signalData } = req.body;
    await Call.create({ id, signalData });
    res.status(200).send(true);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

exports.getCallId = async (req, res) => {
  try {
    const { id } = req.params;
    const call = await Call.findOne({ id });
    if (!call) {
      return res.status(404).send('Call not found');
    }
    res.status(200).send({ signalData: call.signalData });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
