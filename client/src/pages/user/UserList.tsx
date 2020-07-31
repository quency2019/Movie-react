import UserTable from '../../components/UserTable'
import { IUserState } from '../../store/reducers/userReducer'
import { connect } from 'react-redux'
import { IRootState } from '../../store/reducers/reducers'
import { Dispatch } from 'react'
import { UserActions, fetchUserAction, deleteUserAction, setSearchUserConditionAction } from '../../store/actions/userAction'
import { IUserCondition } from '../../services/UserService'

const mapStateToProps = (state: IRootState): IUserState => {
    return { ...state.user }

}
const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        onload() {
            dispatch(fetchUserAction())

        },
        onDeleteUser(id: string) {
            dispatch(deleteUserAction(id))
            dispatch(fetchUserAction())


        },
        onPageChange(condition: IUserCondition) {
            dispatch(setSearchUserConditionAction(condition))
            dispatch(fetchUserAction())
        }
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
