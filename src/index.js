import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import Router from './components/Router';

// react-scripts relies on a file named index.js, but
// eslint does not by default allow jsx to be written
// in files with a .js extension.

// eslint-disable-next-line react/jsx-filename-extension
render(<Router />, document.getElementById('main'));
