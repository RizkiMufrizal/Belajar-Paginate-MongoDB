'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const barang = new Schema({
  idBarang: {
    type: 'String',
    required: true
  },
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

barang.plugin(mongoosePaginate);

module.exports = mongoose.model('Barang', barang);
