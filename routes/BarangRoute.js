'use strict';

const express = require('express');
const Barang = require('../models/Barang');
const router = express.Router();
const uuid = require('node-uuid');

router.get('/barang/:page/:limit', function(req, res, next) {
  var page = req.params.page;
  var limit = req.params.limit;

  Barang.paginate({}, {
    page: parseInt(page),
    limit: parseInt(limit)
  }, function(err, barang) {
    if (err) {
      return res.json({
        info: 'error',
        err: err
      });
    }

    return res.json(barang);
  });

});

router.post('/barang', function(req, res, next) {
  var barang = new Barang({
    idBarang: uuid.v4(),
    namaBarang: req.body.namaBarang,
    tanggalKadaluarsa: new Date()
  });

  barang.save(function(err) {
    return res.json({
      info: 'sukses'
    });
  });

});

module.exports = router;
