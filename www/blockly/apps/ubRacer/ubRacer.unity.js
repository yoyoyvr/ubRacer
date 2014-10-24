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

 
 /**
  * Following is mostly verbatim from the standard Unity web player template
  * html generated when making a web build.
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

    print : function(msg) {
        ubRacer.uPlayer.getUnity().SendMessage("Blockly", "Print", msg);
    },
    
    // TODO: needed? or just use blockly vars? They are just global javascript variables, is that ok?
    setValue : function(key, val) {
        ubRacer.values[key] = val;
    },
    
    getValue : function(key) {
        return ubRacer.values[key];
    }
};

// Bootstrap the player.
ubRacer.init();
