import { AppActionTypes } from './app.types';

const INITIAL_STATE = {
	test : ''
};

const testReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AppActionTypes.SET_CONSUME_VALUES:
			return {
				...state,
				...action.dataObj
			};
		case AppActionTypes.SET_EXPOSE_VALUES:
			return {
				...state,
				exposeFunction : action.exposeFunction
			};
		default:
			return state;
	}
};

export default testReducer;
