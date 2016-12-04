'use strict';

const express = require('express');
const Barang = require('../models/Barang');
const router = express.Router();
const uuid = require('node-uuid');

router.get('/barang', function(req, res, next) {
  var page = req.query.page - 1;
  var count = req.query.count;

  Barang
    .find()
    .limit(parseInt(count))
    .skip(parseInt(count * page))
    .exec(function(err, barangs) {
      Barang.count({}, function(err, size) {
        return res.json({
          rows: barangs,
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

router.get('/barang/find', function(req, res, next) {
  var page = req.query.page - 1;
  var count = req.query.count;
  var key = req.query.key;
  var value = req.query.value;

  Barang
    .find({
      [key]: {
        '$regex': value,
        "$options": "i"
      }
    })
    .limit(parseInt(count))
    .skip(parseInt(count * page))
    .exec(function(err, barangs) {
      Barang
        .find({
          [key]: {
            '$regex': value,
            "$options": "i"
          }
        })
        .count(function(err, size) {
          return res.json({
            rows: barangs,
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
