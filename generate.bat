@echo off
setlocal
cd /d W:\blockly\apps\ubRacer
java -jar ../_soy/SoyToJsSrcCompiler.jar --outputPathFormat generated/en.js --srcs ../common.soy,template.soy
