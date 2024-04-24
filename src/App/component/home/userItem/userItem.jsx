import { Link } from 'react-router-dom'
import './userItem.scss'
const UserItem=({user})=>{
    const {id,name,image,places}=user;
return(
    <li className='user-item'>
        <div className='user-item-content'>
        <Link to={`/${id}/places`}>
        <div className='user-item-image'>
            <div className='item-image'>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={name} />

            </div>
        </div>
        <div className='user-item-info'>
            <h2>{name}</h2>
            <h3>
              {places.length} {places.length ===1 ?'Place':'Places'}
            </h3>
        </div>
        </Link>
        </div>
    </li>
)
}
export default UserItem