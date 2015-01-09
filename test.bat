@echo off
setlocal

if not exist W:\nul subst W: D:\zeroandone\projects\uBlockly

set SCRIPT=W:\blockly\apps\ubRacer\index.html
if not "%~1" == "" call :get-script "%~1"

start "ubRacer Test" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --new-window --allow-file-access-from-files "file://%SCRIPT%"

REM IE
REM start "ubRacer Test" "C:\Program Files\Internet Explorer\iexplore.exe" "file://%SCRIPT%"

goto :eof

:get-script
    set SCRIPT=%~f1
    goto :eof
 