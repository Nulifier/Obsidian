"use strict";

/* eslint no-process-env: 0 */

process.env.NODE_ENV = "test";

var chai		= require("chai");
global.should	= chai.should();
