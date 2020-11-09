import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import App from './App';



import StaticData from './StaticData.json';
import Module from './Module.json';

const JSX=(props)=>{
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App {...props} />
            </PersistGate>
    </Provider>
    )
}

const exposeFunction=(Data)=>{
    console.log("Data",Data)
}


JSX.defaultProps = {
    StaticData,
    Module,
    exposeFunction
}


export default JSX;