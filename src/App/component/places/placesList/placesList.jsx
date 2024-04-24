import PlaceItem from '../placesItem/placeItem';
import Button from '../../others/FormElement/button/button';
import './placesList.scss';
const PlaceList = ({places}) => {
  if (!places) {
    return (
      <div className="place-list center">
        <div className='card'>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </div>
      </div>
    );
  }

return(
    <ul className="places-list">
       {places.map(place=>(
        <PlaceItem key={place.id} places={place}  />
       ))}
       
    </ul>
)
}
export default PlaceList