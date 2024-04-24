import UserItem from '../userItem/userItem'
import './userList.scss'
const UserList=({users})=>{

return(
    <ul className="users-list">
    {users.map((user)=>(
      <UserItem key={user.id} user={user} />
    ))}
    </ul>
)
}
export default UserList