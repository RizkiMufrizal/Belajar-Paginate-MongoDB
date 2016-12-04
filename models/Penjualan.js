'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const penjualan = new Schema({
  tanggalTransaksi: {
    type: 'Date',
    required: true
  },
  id_barang: {
    type: objectId,
    ref: 'Barang'
  }
}, {
  collection: 'tb_penjualan'
});

module.exports = mongoose.model('Penjualan', penjualan);
