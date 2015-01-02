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
//drivers[SENSOR_DRIVER_NAME] = ['normallyOpen'];
drivers[ACTUATOR_DRIVER_NAME] = ['powerSwitch'];

module.exports = {
  drivers: drivers,
  initNetworks: initNetworks,
  initDrivers: initDrivers
};
