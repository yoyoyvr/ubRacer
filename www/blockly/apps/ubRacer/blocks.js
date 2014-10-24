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

Blockly.Blocks['unity_print'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("MSG")
        .setCheck("String")
        .appendField("print");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['unity_print'] = function(block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'ubRacer.print(' + msg + ');'
  return code;
};

Blockly.Blocks['get_stat'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("get stat");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Car.speed"), "STAT");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.JavaScript['get_stat'] = function(block) {
  var stat = block.getFieldValue('STAT');
  var code = 'ubRacer.getValue("' + stat + '")';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};
