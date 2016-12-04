'use strict';

const express = require('express');
const Penjualan = require('../models/Penjualan');
const router = express.Router();
const uuid = require('node-uuid');

router.get('/penjualan', function(req, res, next) {
  var page = req.query.page - 1;
  var count = req.query.count;

  Penjualan
    .find()
    .populate({
      path: 'id_barang',
      model: 'Barang'
    })
    .limit(parseInt(count))
    .skip(parseInt(count * page))
    .exec(function(err, penjualans) {
      Penjualan.count({}, function(err, size) {
        return res.json({
          rows: penjualans,
          pagination: {
            count: parseInt(count),
            page: page + 1,
            pages: Math.ceil(size / count),
            size: size
          }
        });
      });
    });
});

router.get('/penjualan/find', function(req, res, next) {
  var page = req.query.page - 1;
  var count = req.query.count;
  var key = req.query.key;
  var value = req.query.value;

  Penjualan
    .find({
      [key]: {
        '$regex': value,
        "$options": "i"
      }
    })
    .populate({
      path: 'id_barang',
      select: '_id namaBarang',
      model: 'Barang'
    })
    .limit(parseInt(count))
    .skip(parseInt(count * page))
    .exec(function(err, penjualans) {
      Penjualan
        .find({
          [key]: {
            '$regex': value,
            "$options": "i"
          }
        })
        .populate({
          path: 'id_barang',
          model: 'Barang'
        })
        .count(function(err, size) {
          return res.json({
            rows: penjualans,
            pagination: {
              count: parseInt(count),
              page: page + 1,
              pages: Math.ceil(size / count),
              size: size
            }
          });
        });
    });
});

router.post('/penjualan', function(req, res, next) {
  var penjualan = new Penjualan({
    id_barang: req.body.id_barang,
    tanggalTransaksi: new Date()
  });

  penjualan.save(function(err) {
    return res.json({
      info: 'sukses'
    });
  });

});

module.exports = router;
