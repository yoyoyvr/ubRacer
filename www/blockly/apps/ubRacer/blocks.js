/**
 * Blockly Apps: ubRacer Blocks
 *
 * Copyright 2014 Zero & One Computing Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for ubRacer application.
 * @author yoyo@zeroandone.ca (Yossarian King)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

// ---------------------------------------------------------------------------------------
// display (over Unity view)
//

Blockly.Blocks['ubracer_display'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendValueInput("MSG")
        .setCheck("String")
        .appendField("display");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['ubracer_display'] = function(block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'ubRacer.display(' + msg + ');'
  return code;
};


// ---------------------------------------------------------------------------------------
// addsensor: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jqqhsd
//

Blockly.Blocks['ubracer_addsensor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField("add sensor to")
        .appendField(new Blockly.FieldTextInput("car"), "CARNAME");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("named")
        .appendField(new Blockly.FieldTextInput("sensor"), "SENSORNAME");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("direction")
        .appendField(new Blockly.FieldAngle("0"), "DIRECTION");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("length")
        .appendField(new Blockly.FieldTextInput("100"), "LENGTH");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("colour")
        .appendField(new Blockly.FieldColour("#33ff33"), "COLOUR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
  getVars: function() {
    var carname = this.getFieldValue('CARNAME');
    var sensorname = this.getFieldValue('SENSORNAME');
    
    var sensorVar = carname + '.' + sensorname;
    var sensorSensedVar = carname + '.' + sensorname + ".sensed";
    
    return [sensorVar, sensorSensedVar];
  }
};

Blockly.JavaScript['ubracer_addsensor'] = function(block) {
  var carname = block.getFieldValue('CARNAME');
  var sensorname = block.getFieldValue('SENSORNAME');
  var direction = block.getFieldValue('DIRECTION');
  var length = block.getFieldValue('LENGTH');
  var colour = block.getFieldValue('COLOUR');
  
  var sensorVar = Blockly.JavaScript.variableDB_.getName(carname + '.' + sensorname, Blockly.Variables.NAME_TYPE);
  var sensorSensedVar = Blockly.JavaScript.variableDB_.getName(carname + '.' + sensorname + ".sensed", Blockly.Variables.NAME_TYPE);
  
  var code =
    '// Add sensor.\n' +
    'ubRacer.addSensor("' + carname + '","' + sensorname + '",' + direction + ',' + length + ',"' + colour + '");\n' +
    sensorVar + ' = ' + length + ';\n' +
    sensorSensedVar + ' = false;\n\n';
    
  return code;
};


// ---------------------------------------------------------------------------------------
// steer: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#x86qtv
//

Blockly.Blocks['ubracer_steer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldTextInput("car"), "CARNAME");
    this.appendValueInput("STEER")
        .setCheck("Number")
        .appendField("steering to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['ubracer_steer'] = function(block) {
  var carname = block.getFieldValue('CARNAME');
  var steer = Blockly.JavaScript.valueToCode(block, 'STEER', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = 'ubRacer.steer("' + carname + '",' + steer + ');\n'
  return code;
};


// ---------------------------------------------------------------------------------------
// throttle: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7fhwnn
//

Blockly.Blocks['ubracer_throttle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldTextInput("car"), "CARNAME");
    this.appendValueInput("THROTTLE")
        .setCheck("Number")
        .appendField("throttle to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['ubracer_throttle'] = function(block) {
  var carname = block.getFieldValue('CARNAME');
  var throttle = Blockly.JavaScript.valueToCode(block, 'THROTTLE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = 'ubRacer.throttle("' + carname + '",' + throttle + ');\n'
  return code;
};
