import {VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from'../../../utils/valitetors/valitetor' 
import Button from '../../../component/others/FormElement/button/button'
import  Input from '../../../component/others/FormElement/input/input'
import { useForm } from '../../../utils/hooks/form-hook'
import { useHttpClinet } from '../../../utils/hooks/http-hook'
import { Fragment, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import ErrorModal from '../../../component/others/modal/ErrorModal/ErrorModal'
import LoadingSpinner from '../../../component/others/loadingSpinner/LoadingSpinner';
import BackDrop from '../../../component/navigation/backDrop/backDrop';
import ImageUpload from '../../../component/others/FormElement/imageUpLoad/imageUpLoad';
import { useNavigate } from 'react-router-dom'
import './newPlace.scss'
const NewPlace=()=>{
  const navigate=useNavigate()
  const{token}=useContext(AuthContext)
  const {isLoading,error,sendRequest,clearError}=useHttpClinet()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
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
 
  const placeSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);
    try{
          const formData=new FormData();
          formData.append('title',formState.inputs.title.value)
          formData.append('description',formState.inputs.description.value)
          formData.append('address',formState.inputs.address.value)
          formData.append('image',formState.inputs.image.value)
      await sendRequest( process.env.REACT_APP_BACKEND_URL + '/api/places','POST',formData,{
        authorization:'Bearer '+ token
      })
      navigate('/')
    }catch(err){}
    
  };
    return(<Fragment>
      {error && <BackDrop />} 
      {error && <ErrorModal data={error} onClick={clearError} />}
        <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading && <div className='center'>
          <LoadingSpinner asOverlay  />
            </div>}
            <Input 
            id='title'
            element='input' type='text' label="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText='please enter a valid title'
            onInput={inputHandler}
            />
           <Input
        id="description" element="textarea"label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
       <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload  id="image" onInput={inputHandler} errorText="Please provide an image" />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
      
        </form>
        </Fragment>
    )
}
export default NewPlace;