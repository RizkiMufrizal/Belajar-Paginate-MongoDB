'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barang = new Schema({
  namaBarang: {
    type: 'String',
    required: true
  },
  tanggalKadaluarsa: {
    type: 'Date',
    required: true
  }
}, {
  collection: 'tb_barang'
});

module.exports = mongoose.model('Barang', barang);
