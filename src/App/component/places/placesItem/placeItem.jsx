import { Fragment, useContext, useState } from "react";
import Button from "../../others/FormElement/button/button";
import BackDrop from "../../navigation/backDrop/backDrop";
import DeleteModal from "../../others/modal/delete/deleteModal";
import "./placeItem.scss";
import { AuthContext } from "../../../context/auth.context";

const PlaceItem = ({ places }) => {
  const{userId}=useContext(AuthContext)
  const { image, title, address, description,creator} = places;
  const[showModal,setShowModal]=useState(false);
  const [state,setState]=useState()
  const deletemodal=<DeleteModal data={places} onClick={()=>{setShowModal(false)}} />


  return (
    <Fragment> 
      {showModal && <BackDrop onClick={()=>{setShowModal(false)}}  />} 
      {showModal && state}
      <li className="place-item">
        <div className="place-item-content">
          <div className="place-item-image">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={title} />
          </div>
          <div className="place-item-info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
        <div className="place-item-actions">
        
           {userId ===creator && <Button to={`/places/${places.id}`}>EDIT</Button>}

           {userId ===creator && <Button  danger  onClick={()=>{setShowModal(true)
        setState(deletemodal)}}>Delete</Button>}
          </div>
        </div>
      </li>
    </Fragment>
  );
};
export default PlaceItem;
