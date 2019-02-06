import { getAllProjectsAction } from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import {BarLoader} from "react-spinners";
import React, { Component } from 'react';
import './Projects.sass'

class Projects extends Component {

     constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        };
    }

    componentDidMount() {
        this.props.getAllProjectsAction();
    }

    renderLoader() {
        return <BarLoader sizeUnit={"px"}
            size={100}
            color={"blue"}
            loading={this.state.isFetching} />
    }

    renderProjects() {
        return (
            this.props.projects.map((item) =>
                <div key={item._id}>
                    <a href={`/projects/${item._id}`} className={"Projects-Item"}>
                        <div className={"Projects-Picture"}>
                        </div>
                        <div className={"Projects-Info"}>
                            <span className={"Projects-Name"}>{item.name}</span>
                            <div className={"Projects-Filter"}> </div>
                        </div>
                    </a>
                    <div className={"Projects-Splitter"}>
                    </div>
                </div>
            )
        )
    }

    render() {
        return (
            <div className={"Projects-Container"}>
                {this.state.isFetching ? this.renderLoader() : this.renderProjects()}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { projects, error, isFetching } = state.projectReducer;
    return { projects, error, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
    getAllProjectsAction: () => dispatch(getAllProjectsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);