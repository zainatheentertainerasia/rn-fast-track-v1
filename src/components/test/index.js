import PathJson from './path.json';
import createLazyContainer from 'react-lazy-import';
const MyComponent = createLazyContainer(() => {
	const componentPath = PathJson.main;
	return import(`${componentPath}`);
});

export default MyComponent;

// import Test from './test/test.jsx';
// export default Test;