/**
 * Blockly Apps: ubRacer
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
 * @fileoverview JavaScript for ubRacer Unity web player integration.
 * @author yoyo@zeroandone.ca (Yossarian King)
 */

// Put everything in a namespace.
var ubRacer = {

    init : function() {
        var config = {
            width: 960, 
            height: 600,
            params: { enableDebugging:"0" }
        };
        
        ubRacer.uPlayer = new UnityObject2(ubRacer.config);
        
        jQuery(ubRacer.initWebPlayer);
    },
    
    initWebPlayer : function() {
        var $missingScreen = jQuery("#unityPlayer").find(".missing");
        var $brokenScreen = jQuery("#unityPlayer").find(".broken");
        $missingScreen.hide();
        $brokenScreen.hide();
        
        ubRacer.uPlayer.observeProgress(function (progress) {
            switch(progress.pluginStatus) {
                case "broken":
                    $brokenScreen.find("a").click(function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        ubRacer.uPlayer.installPlugin();
                        return false;
                    });
                    $brokenScreen.show();
                break;
                case "missing":
                    $missingScreen.find("a").click(function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        ubRacer.uPlayer.installPlugin();
                        return false;
                    });
                    $missingScreen.show();
                break;
                case "installed":
                    $missingScreen.remove();
                break;
                case "first":
                break;
            }
        });
        
        ubRacer.uPlayer.initPlugin(jQuery("#unityPlayer")[0], "ubRacer.unity3d");
    },
    
    values : {},

    display : function(msg) {
        ubRacer.uPlayer.getUnity().SendMessage("/Blockly", "Print", msg);
    },
    
    addSensor : function(carName, sensorName, direction, length, colour) {
        var msg = sensorName + "," + direction + "," + length + "," + colour;
        ubRacer.uPlayer.getUnity().SendMessage("/" + carName + "/Driver", "ubAddSensor", msg);
    },
    
    steer : function(carName, steering) {
        ubRacer.uPlayer.getUnity().SendMessage("/" + carName + "/Driver", "ubSteer", steering);
    },
    
    throttle : function(carName, throttle) {
        ubRacer.uPlayer.getUnity().SendMessage("/" + carName + "/Driver", "ubThrottle", throttle);
    },
    
    // TODO: needed? or just use blockly vars? They are just global javascript variables, is that ok?
    setValue : function(key, val) {
        ubRacer.values[key] = val;
    },
    
    getValue : function(key) {
        return ubRacer.values[key];
    },
    
    initBlocklyInterpreter : function(interpreter, scope) {
        
        var wrapper;
        
        /* alert() example
        wrapper = function(msg) { return interpreter.createPrimitive(alert(msg)); };
        interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
        */
        
        // ubRacer object.
        ubRacerObject = interpreter.createPrimitive(ubRacer);
        wrapper = function() { return ubRacerObject; };
        interpreter.ubRacer = interpreter.createNativeFunction(wrapper);
        interpreter.setProperty(scope, 'ubRacer', interpreter.ubRacer);

        // ubRacer methods.
        // TODO: the ubRacer methods are pretty much just wrappers in the first place; could / should I combine into one wrapper?
        wrapper = function(msg) {
            return interpreter.createPrimitive( ubRacer.display(msg.toString()) );
        };
        interpreter.setProperty(interpreter.ubRacer, 'display', interpreter.createNativeFunction(wrapper));

        wrapper = function(carName, sensorName, direction, length, colour) {
            return interpreter.createPrimitive( ubRacer.addSensor(carName.toString(), sensorName.toString(), direction.toNumber(), length.toNumber(), colour.toString()) );
        };
        interpreter.setProperty(interpreter.ubRacer, 'addSensor', interpreter.createNativeFunction(wrapper));
        
        wrapper = function(carName, steering) {
            return interpreter.createPrimitive( ubRacer.steer(carName.toString(), steering.toNumber()) );
        };
        interpreter.setProperty(interpreter.ubRacer, 'steer', interpreter.createNativeFunction(wrapper));
        
        wrapper = function(carName, throttle) {
            return interpreter.createPrimitive( ubRacer.throttle(carName.toString(), throttle.toNumber()) );
        };
        interpreter.setProperty(interpreter.ubRacer, 'throttle', interpreter.createNativeFunction(wrapper));
    }
};

// Bootstrap the player.
ubRacer.init();
