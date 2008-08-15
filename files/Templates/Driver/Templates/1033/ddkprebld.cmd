@echo off
:: $Id$
setlocal
:: Perform any pre-build steps
[!if AUTOINCBUILDNR_CHECKBOX]
call .\buildinc.cmd
[!endif]
endlocal