import { Fragment, useEffect, useState,useContext} from "react";
import { useParams, useNavigate  } from "react-router-dom";
import Input from "../../../component/others/FormElement/input/input";
import Button from "../../../component/others/FormElement/button/button";
import LoadingSpinner from "../../../component/others/loadingSpinner/LoadingSpinner";
import ErrorModal from "../../../component/others/modal/ErrorModal/ErrorModal";
import BackDrop from "../../../component/navigation/backDrop/backDrop";
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH,} from "../../../utils/valitetors/valitetor";
import { useForm } from "../../../utils/hooks/form-hook";
import { useHttpClinet } from "../../../utils/hooks/http-hook";
import {AuthContext} from '../../../context/auth.context'
import "./updataPlace.scss";

const UpdatePlace = () => {
  const navigate=useNavigate()
  const {userId,token}=useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClinet();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const placeId = useParams().placeId;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/api/places/${placeId}`,
        );
        setLoadedPlaces(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler =async (event) => {
    event.preventDefault();
    // console.log(formState.inputs);
    try{
       await sendRequest(process.env.REACT_APP_BACKEND_URL + `/api/places/${placeId}`,'PATCH',
       JSON.stringify({
        title:formState.inputs.title.value,
        description:formState.inputs.description.value,
        address:formState.inputs.address.value
       }),
       {'Content-type':'application/json',
         authorization:'Bearer '+ token
       }
       );
       navigate('/' + userId + '/places')
    }catch(error){}

  };
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <div className="card">
          <h2>Could not find place!</h2>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {error && <BackDrop />}
      {error && <ErrorModal data={error} onClick={clearError} />}

      {!isLoading && loadedPlaces &&<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
          initialValue={formState.inputs.address.value}
          initialValid={formState.inputs.address.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>}
    </Fragment>
  );
};

export default UpdatePlace;
