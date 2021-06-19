import { useSelector } from 'react-redux'
import {RootStore} from '../../utils/TypeScript'
import Loading from './Loading'
import Toast from './Toast'

const Alert = () => {
    const {alert} = useSelector((state : RootStore) => state)

    return (
        <div>
            { alert.loading && <Loading/>}
            { 
            alert.errors && 
            <Toast 
            title="Errors"
            body={alert.errors}
            bgColor="bg-danger"
            />
            }

        { 
            alert.success && 
            <Toast 
            title="Success"
            body={alert.success}
            bgColor="bg-success"
            />
        }
        </div>
    )
}

export default Alert