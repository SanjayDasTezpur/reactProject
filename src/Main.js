import React, {Component} from 'react';
import axios from 'axios';
import './Table.css';

const page = 10;
const buttonPerPage = 10;
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            originalUsers: [],
            details: '',
            searchName: '',
            toggle: true,
            currentPagrNo: 1,
            currentButtonFrame: buttonPerPage,
            buttonPageArr: []
        }
    }

    componentDidMount() {
        axios.get('http://demo9197058.mockable.io/users')
            .then(response => {
                this.setState({users: response.data});
                this.setState({originalUsers: response.data});

            })
            .catch(error => {
            })
    }

    renderTableData() {
        return this.state.users.map((student, index) => {
            if (index < page) {
                return (
                    <tr key={index} onClick={() => this.detailView(student)}>
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.company_name}</td>
                        <td>{student.city}</td>
                        <td>{student.state}</td>
                        <td>{student.zip}</td>
                        <td>{student.email}</td>
                        <td>{student.web}</td>
                        <td>{student.age}</td>
                    </tr>
                )
            }
        })
    }

    sort(data, key) {
        let self = this;

        function compare(a, b) {
            if (self.state.toggle) {
                if (a[key] < b[key]) {
                    return -1;
                }
                if (a[key] > b[key]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[key] > b[key]) {
                    return -1;
                }
                if (a[key] < b[key]) {
                    return 1;
                }
                return 0;
            }
        }

        data.sort(compare);
        self.setState({toggle: !self.state.toggle})
        this.setState({user: data});
    };

    renderTableHeader() {
        let header = this.state.users;
        let keys = header[0] ? Object.keys(header[0]) : [];
        var filtered = keys.filter(function (value, index, arr) {
            return value !== "id";

        });
        return filtered.map((eachHeader, index) => {
            let image = './image/sort-down.png';
            if (this.state.toggle) {
                image = './image/sort-up.png';
            }
            return <td><img onClick={() => this.sort(header, eachHeader)} src={require('' + image)} height="15"
                            width="15"/>{eachHeader.toString().replace("_", " ").toUpperCase()}</td>
        });
    }

    detailView(userdetail) {
        const {match: {params}} = this.props;
        let userId = userdetail.id;
        this.props.history.push({
            pathname: `/user/${userId}`,
            state: {data: userdetail}
        });
    }

    serachByName = (e) => {
        let arr = [];
        let userArr = this.state.originalUsers;
        let count = 0
        this.setState({searchName: e.target.value});
        userArr.map((value, index) => {
            if (value.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) {
                arr[count++] = value;
            } else {
            }
            return this.setState({users: arr});
        })
    };

    pagination() {
        let user = this.state.originalUsers;
        let count = user.length;
        let pageArr = [];
        let myHtml = '';
        let noOfPage = count / page;
        let newPageArr = [];
        for (let i = 0; i < noOfPage; i++) {
            pageArr.push(i);
            if (i < buttonPerPage) {
                newPageArr.push(i);
            }
        }
        return pageArr.map((value, index) => {
            if (index == 0) {
                return (<span>
                    <button onClick={() => this.goToPage(this.state.currentPagrNo - 1, page)}>  &lt; &lt;Previous</button>
                    <button onClick={() => this.goToPage(value + 1, page, noOfPage)}>{value + 1}</button>
                    </span>)
            }
            if (index < buttonPerPage) {
                return (<button onClick={() => this.goToPage(value + 1, page, noOfPage)}>{value + 1}</button>)
            }
            if (index === buttonPerPage) {
                return (<button onClick={() => this.goToPage(this.state.currentPagrNo + 1, page, noOfPage)}>Next>></button>)
            }
        })
    }

    goToPage(pNo, pageSize, noOfPage) {
        if(pNo<=0){
            alert("You are alraedy in first page")
            return;
        }
        if(pNo>noOfPage){
            alert("You are alraedy in last page")
            return;
        }
        let start = (pNo - 1) * pageSize;
        let end = start + pageSize;
        let arr = [];
        let userArr = this.state.originalUsers;
        for (let i = start; i < end; i++) {
            arr.push(userArr[i]);
        }
        this.setState({currentPagrNo: pNo});
        this.setState({users: arr});
    }


    render() {
        return (
            <div>
                <h1>Page no {this.state.currentPagrNo} / {this.state.originalUsers.length / page}</h1>
                <div>
                    <input type="text" placeholder="Search by first name" onChange={this.serachByName}/>
                </div>
                <table id="students" style={{borderWidth: 1}}>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.pagination()}
            </div>
        );
    }
}
