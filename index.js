'use strict';
var logger = require('log4js').getLogger('Sensor');

var ACTUATOR_DRIVER_NAME =  'nmPowerSwitchActuator';
  //SENSOR_DRIVER_NAME = 'nmPowerSwitchSensor';

function initNetworks() {
  return;
}

function initDrivers() {
  var actuatorDriver;//, sensorDriver;

  try {
    //sensorDriver = require('./driver/' + SENSOR_DRIVER_NAME);
    actuatorDriver = require('./driver/' + ACTUATOR_DRIVER_NAME);
  } catch(e) {
    logger.error('[%s] init drivers error', ACTUATOR_DRIVER_NAME, e);
  }

  var rtn = {};
  //rtn[SENSOR_DRIVER_NAME] = sensorDriver;
  rtn[ACTUATOR_DRIVER_NAME] = actuatorDriver;
  return rtn;
}

var drivers = {};
//drivers[SENSOR_DRIVER_NAME] = ['nmPowerSwitchSensor'];
drivers[ACTUATOR_DRIVER_NAME] = ['nmPowerSwitchActuator'];

module.exports = {
  drivers: drivers,
  initNetworks: initNetworks,
  initDrivers: initDrivers
};

var logger = require('log4js').getLogger('Sensor');

var ACTUATOR_DRIVER_NAME = 'nmPowerSwitchActuator',
  ACTUATOR_DRIVER_MODELS = [],  //none
  SENSOR_DRIVER_NAME, //none
  SENSOR_DRIVER_MODELS, // none
  NETWORK_DRIVER_NAME; // none

function initNetworks() {
  var net, rtn = {};

  if (!NETWORK_DRIVER_NAME) {
    return rtn;
  }

  try {
    net = require('./network/index.js');
  } catch (e) {
    logger.error('init networks error', e);
  }
  rtn[NETWORK_DRIVER_NAME] = net;

  return rtn;
}

function initDrivers() {
  var rtn = {}, actuatorDriver, sensorDriver;

  if (SENSOR_DRIVER_NAME) {
    try {
      sensorDriver = require('./driver/' + SENSOR_DRIVER_NAME);
    } catch(e) {
      logger.error('[%s] init drivers error', SENSOR_DRIVER_NAME, e);
    }
    rtn[SENSOR_DRIVER_NAME] = sensorDriver;
  }
  if (ACTUATOR_DRIVER_NAME) {
    try {
      actuatorDriver = require('./driver/' + ACTUATOR_DRIVER_NAME);
    } catch(e) {
      logger.error('[%s] init drivers error', ACTUATOR_DRIVER_NAME, e);
    }
    rtn[ACTUATOR_DRIVER_NAME] = actuatorDriver;
  }
  return rtn;
}

//driver to model mapping
var drivers = {};
if (SENSOR_DRIVER_NAME) {
  drivers[SENSOR_DRIVER_NAME] = SENSOR_DRIVER_MODELS;
}
if (ACTUATOR_DRIVER_NAME) {
  drivers[ACTUATOR_DRIVER_NAME] = ACTUATOR_DRIVER_MODELS;
}

module.exports = {
  networks: NETWORK_DRIVER_NAME ? [NETWORK_DRIVER_NAME] : [],
  drivers: drivers,
  initNetworks: initNetworks,
  initDrivers: initDrivers
};
