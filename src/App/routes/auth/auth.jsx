import { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import LoadingSpinner  from '../../component/others/loadingSpinner/LoadingSpinner.js'
import Input from '../../component/others/FormElement/input/input';
import Button from '../../component/others/FormElement/button/button';
import BackDrop from '../../component/navigation/backDrop/backDrop.jsx'
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../utils/valitetors/valitetor';
import { useForm } from '../../utils/hooks/form-hook';
import ErrorModal from '../../component/others/modal/ErrorModal/ErrorModal.js';
import { useHttpClinet } from '../../utils/hooks/http-hook.jsx';
import ImageUpload from '../../component/others/FormElement/imageUpLoad/imageUpLoad.js';
import './auth.scss';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const{login}=useContext(AuthContext)
  const navigate=useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true);

  const {isLoading,error,sendRequest,clearError}=useHttpClinet()
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,

        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }


        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };
  const authSubmitHandler =  async event => {
    event.preventDefault();

    if(isLoginMode){
     try{
      const responseData=await sendRequest( process.env.REACT_APP_BACKEND_URL + '/api/users/login','POST',
      JSON.stringify({
       email:formState.inputs.email.value,
       password:formState.inputs.password.value,
     }),
       {'Content-Type':'application/json'},
    
      );
      

    login(responseData.userId,responseData.token);
    navigate('/')
     }catch(err){}

      }else{
        try{
          const formData=new FormData();
          formData.append('name',formState.inputs.name.value)
          formData.append('email',formState.inputs.email.value)
          formData.append('password',formState.inputs.password.value)
          formData.append('image',formState.inputs.image.value)
          const responseData=await sendRequest( process.env.REACT_APP_BACKEND_URL + '/api/users/signup','POST',formData);
     
          console.log(responseData)
          login(responseData.userId,responseData.token);
          navigate('/')
        }catch(err){}
  };
  
}

  return (
    <Fragment>
      {error && <BackDrop />}
      {error && <ErrorModal data={error} onClick={clearError} />}

      <div className={isLoginMode?' card authentication' :' card authentication signup'}>
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? (
          <h2>Already have an account?</h2>
        ) : (
          <h2>Sign up with Email and Password</h2>
        )}
        <hr />
        <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          {!isLoginMode &&
            (<Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />)}
            
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button inverse type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </div>
    </Fragment>
  );
};

export default Auth;
