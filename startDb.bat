@ECHO off

set dbPath=testDb
set mongod=mongod.exe

REM Made the directory if needed
if not exist %dbPath% mkdir %dbPath%

%mongod% --dbpath %dbPath%

PAUSE