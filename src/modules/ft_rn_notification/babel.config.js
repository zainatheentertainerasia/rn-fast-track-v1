module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset' ],
    plugins: [
			[
				'module-resolver',
				{
					cwd: 'packagejson',
					root: [ './src' ],
					alias: {
            '@company'     : './src/company.json',
            '@companyApis' : './src/companyAPis.json',
            '@appConfig' : './src/AppConfig.json',
          }
				}
			]
		]
  };
};
