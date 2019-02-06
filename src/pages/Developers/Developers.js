import {getAllUsersAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import {BarLoader} from "react-spinners";
import React, {Component} from 'react';
import './Developers.sass'

class Developers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        };
    }

    componentDidMount() {
        this.props.getAllUsersAction();
    }

    renderLoader() {
        return <BarLoader sizeUnit={"px"}
                          size={300}
                          color={"blue"}
                          loading={true}
                          width={"300px"}
        />
    }

    renderUsers() {
        return (
            this.props.users.map((item) =>
                <div key={item._id}>
                    <a href={`/developers/${item._id}`} className={"Users-Profile"}>
                        <div className={"Users-ProfilePicture"}>
                        </div>
                        <div className={"Users-Info"}>
                            <span className={"Users-FullName"}>{`${item.firstName} ${item.lastName}`}</span>
                            <div className={"Users-Filter"}></div>
                        </div>
                    </a>
                    <div className={"Users-Splitter"}>
                    </div>
                </div>
            )
        )
    }

    render() {
        if(!this.props.users) return <div>{this.renderLoader()}</div>;
        return (
            <>
                <div className={"Users-Container"}>
                    {this.state.isFetching ? this.renderLoader() : this.renderUsers()}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {users, error, isFetching} = state.userReducer;
    return {users, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getAllUsersAction: () => dispatch(getAllUsersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
