"use strict";

/* eslint no-process-env: 0 */

process.env.NODE_ENV = "test";

var chai		= require("chai");
var sinon		= require("sinon");
var sinonChai	= require("sinon-chai");

// Install should assertions
global.should	= chai.should();

// Install sinon
global.sinon	= sinon;

// Install sinon-chai
chai.use(sinonChai);
