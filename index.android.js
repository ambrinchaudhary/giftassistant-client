/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/js/App';

const displayName = require('app.json').displayName;

AppRegistry.registerComponent(displayName, () => App);
