import init from './Init'
import login from './LoginBL'
import signup from './SignupBL'
import forgotPassword from './ForgotPasswordBL'
import getUserProfile from './GetUserProfile'
import demoGraphic from './DemographicUpdateBL';
import ValidateVipKey from './ValidateVipKey';

const Auth = {
     init,
     login,
     signup,
     forgotPassword,
     getUserProfile,
     demoGraphic,
     ValidateVipKey
};

export default Auth;
