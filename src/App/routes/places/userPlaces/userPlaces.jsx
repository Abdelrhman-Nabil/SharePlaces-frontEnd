import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../../../component/places/placesList/placesList";
import { useHttpClinet } from "../../../utils/hooks/http-hook";
import LoadingSpinner from "../../../component/others/loadingSpinner/LoadingSpinner";
import ErrorModal from "../../../component/others/modal/ErrorModal/ErrorModal";
import BackDrop from "../../../component/navigation/backDrop/backDrop";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClinet();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;
 useEffect(() => {
  const fetchUserPlaces = async () => {
    try{
    const responseData=await sendRequest(process.env.REACT_APP_BACKEND_URL + `/api/places/user/${userId}`)
        setLoadedPlaces(responseData.places)
      }catch(error){}
    };
    fetchUserPlaces();
  }, [sendRequest,userId]);
  return (
    <Fragment>
      {error && <BackDrop />} 
      {error && <ErrorModal data={error} onClick={clearError} />}
      {isLoading && <div className='center'><LoadingSpinner asOverlay  /></div>}
      {!isLoading && loadedPlaces&& <PlaceList places={loadedPlaces} />};
    </Fragment>
  );
};
export default UserPlaces;

