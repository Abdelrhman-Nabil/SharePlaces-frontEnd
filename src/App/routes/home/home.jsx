import { Fragment, useEffect,useState } from "react"
import UserList from "../../component/home/userList/userList"
import LoadingSpinner from '../../component/others/loadingSpinner/LoadingSpinner'
import ErrorModal from '../../component/others/modal/ErrorModal/ErrorModal'
import BackDrop from '../../component/navigation/backDrop/backDrop'
import { useHttpClinet } from "../../utils/hooks/http-hook"
import './home.scss'
const Home=()=>{
  const {isLoading,error,sendRequest,clearError}=useHttpClinet()
    const [LoadedUsers,setLoadedUsers]=useState()
    useEffect(() => {
        const fetchUsers = async () => {

          try {
            const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + '/api/users');
             if(responseData){
              setLoadedUsers(responseData.users);
             }
          } catch (err) {
          }
        };
        fetchUsers();
      }, [sendRequest]);
    return(
       <Fragment>
      {error && <BackDrop />} 
      {error && <ErrorModal data={error} onClick={clearError} />}
      {isLoading && (
        <div className="center">
            <LoadingSpinner />
        </div>
      )}

        {!isLoading && LoadedUsers &&<UserList users={LoadedUsers}/>}
       </Fragment>
    )
}
export default Home