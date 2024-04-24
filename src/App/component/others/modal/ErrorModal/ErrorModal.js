import Button from '../../FormElement/button/button';
import { useNavigate } from 'react-router-dom';
import './ErrorModal.css'
const  ErrorModal=({data,onClick})=>{
  const navigate=useNavigate()
  const closeHndler=()=>{
    onClick && navigate('/')
  }
  return(
    <div className="modal">
      <header className='modal-header'>
        <h2>An error Occured !</h2>
        </header>
        <form>
        <div className={'modal-content'}>
         <h2> {data}</h2>
        </div>
        <footer className={'modal-footer'}>
          <Button inverse onClick={closeHndler}>close</Button>
          
        </footer>
      </form>
    </div>
  )
}
export default ErrorModal