const express = require('express');
const path = require('path');
const router = require('express').Router()

router.use(express.static(path.resolve(__dirname, '/../', 'build')))

module.exports = router;
