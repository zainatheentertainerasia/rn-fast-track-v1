import analytics from 'rn-horizon-analytics';
const mongo = analytics.mongo;

export const mongoInit = (token) => {
  try {
    mongo.init(token);
  } catch (err) {
    console.log(err);
  }
};

export const updateSessions = (customer_id, location_id) => {
  try {
    console.log('updated sessions', customer_id);

    mongo.updateSessions(customer_id, location_id);
  } catch (err) {
    console.log(err);
  }
};

export const sendAnalyticFunction = () => {
  analytics.sendAnalytics(
    'MegaData',
    {
      content_name: 'Really Fast Running Shoes',
      content_category: 'Apparel & Accessories > Shoes',
      content_ids: ['1234'],
      content_type: 'product',
      value: 0.5,
      currency: 'USD',
    },
    ['group1']
  );
};

export const configFunction = () => {
  const configObject = {
    groups: {
      group1: ['facebook', 'appBoy', 'gtm', 'firebase', 'appFlyer'],
      group2: ['firebase'],
    },
  };
  analytics.config(configObject);
};

export const getSessions = async () => {
  try {
    return await mongo.getSession();
  } catch (err) {
    console.log(err);
  }
};

export const resetSession = () => {
  mongo.resetSessionObject();
};

export const resetStackObject = () => {
  try {
    mongo.resetStackObject();
  } catch (error) {
    console.log(error);
  }
};

export const getStackArrayMongo = async () => {
  try {
    const stackArray = await mongo.getStackArray();
    return stackArray;
  } catch (err) {
    console.log(err);
  }
};

export const postMongoAnalytics = () => {
  try {
    console.log('In post Analytics function');
    mongo.postStack();
  } catch (err) {
    console.log(err);
  }
};

export const makeStackMongo = async (stackData) => {
  try {
    await mongo.makeStack(stackData);
  } catch (err) {
    console.log(err);
  }
};

export const makeSessionMongo = (sessionData) => {
  try {
    mongo.makeSession(sessionData);
  } catch (err) {
    console.log(err);
  }
};
