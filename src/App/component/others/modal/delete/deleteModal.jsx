import Button from '../../FormElement/button/button'
import './deleteModal.css'
import { useHttpClinet } from '../../../../utils/hooks/http-hook'
import { Fragment ,useContext } from 'react';
import { AuthContext } from '../../../../context/auth.context';

const DeleteModal=({data,onClick})=>{
  const {token}=useContext(AuthContext)
  const { sendRequest} = useHttpClinet();
  const deleteHandler=async()=>{
    try{
        await sendRequest( process.env.REACT_APP_BACKEND_URL + `/api/places/${data.id}`,'DELETE',null,
        {authorization:'Bearer '+ token})
        
    }catch(error){}
    onClick()
  }


  return (
    <Fragment>
    <div className="modal">
  <header className='modal-header'>
    <h2>Are you sure ?</h2>
    </header>
    <form>
    <div className='modal-content'>
    <p>Do you want to process and delete this place ? Please note that it can't be undone thereafter</p>
    </div>
    <footer className='modal-footer'>
      <Button inverse onClick={onClick}>close</Button>
      <Button danger onClick={deleteHandler}>Delete</Button>
    </footer>
  </form>
</div>
  </Fragment>
    )
}
export default DeleteModal