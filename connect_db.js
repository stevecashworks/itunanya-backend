import {connect} from "mongoose"



const connect_db= (mongo_uri)=>{


    return connect(mongo_uri)


}
export default connect_db