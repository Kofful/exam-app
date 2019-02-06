import {getProjectByIdAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import {BarLoader} from "react-spinners";
import './Project.sass'
import moment from "moment";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            project: {
                "active": false,
                "users": [
                    {
                        "_id": "5c533941c4a751029be959dc",
                        "firstName": "Andrey",
                        "lastName": "Krupa",
                        "email": "andrey@gmail.com"
                    }
                ],
                "tasks": [],
                "createdDay": "2019-02-04T17:27:47.704Z",
                "_id": "5c587616d9d8d2345f22f6a5",
                "name": "New project",
                "author": {
                    "_id": "5c533941c4a751029be959dc",
                    "firstName": "Andrey",
                    "lastName": "Krupa"
                },
                "__v": 0
            }
        };
    }

    componentDidMount() {
        this.props.getProjectByIdAction(this.props.match.params.id);
    }
    
    renderLoader() {
        return <BarLoader sizeUnit={"px"}
                          size={300}
                          color={"blue"}
                          loading={true}
                          width={"300px"}
        />;
    }

    renderUsers() {
        return (
            this.props.project.users.map((item) =>
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

    renderProject() {
        const {project} = this.props;
        return (
            <>
                <div className={"Project-Background"}>
                    <div>
                        <div className={"Project-Photo"}>
                        </div>
                        <span className={"Project-Name"}>{project.name}</span>
                    </div>
                </div>
                <div className={"Project-Info"}>
                    <span className={"Project-InfoType"}>CREATED AT</span>
                    <span className={"Project-Value"}>{moment(project.createdDay).format("DD.MM.YY HH:mm")}</span>
                </div>
                <div className={"Project-Splitter"}></div>
                <div className={"Project-Info"}>
                    <span className={"Project-InfoType"}>CREATOR</span>
                    <span className={"Project-Value"}>{`${project.author.firstName} ${project.author.lastName}`}</span>
                </div>
                <div className={"Project-Splitter"}></div>
                <div className={"Project-Developers"}>DEVELOPERS</div>
                <div className={"Project-Splitter"}></div>
                <div className={"Users-Container"}>
                    {this.renderUsers()}
                </div>
            </>
        );
    }

    render() {
        if(!this.props.project) return <div>{this.renderLoader()}</div>;
        return (
            <div className="Project-Container">
                {this.state.isFetching ? this.renderLoader() : this.renderProject()}
            </div>
        );
    }
}

const mapStateToProps = (state, routerProps) => {
    const {projects, error, isFetching} = state.projectReducer;
    const projectId = routerProps.match.params.id;
    const project = projects.find((p) => p._id === `${projectId}`);
    return {project, projectId, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getProjectByIdAction: (id) => dispatch(getProjectByIdAction(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(Project);