import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class Example extends React.Component {

    state = {
        eventName:'',
        from:'',
        to:'',
        data:[],
        selectedDate:null,
        days: [
            {id: 1, value: "Mon", isChecked: false},
            {id: 2, value: "Tue", isChecked: false},
            {id: 3, value: "Wed", isChecked: false},
            {id: 4, value: "Thur", isChecked: false},
            {id: 5, value: "Fri", isChecked: false},
            {id: 6, value: "Sat", isChecked: false},
            {id: 0, value: "Sun", isChecked: false},
        ],
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
      }

  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        if (name == 'from') {
            var n = new Date(value)
            this.getCalendarData(n)
        }

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {

        var days = this.state.days.filter(function(item){
            return item.isChecked;
        }).map(function(item) {
            return item['value'];
        });
 
        const form = {
            event_name: this.state.eventName,
            date_from: this.state.from,
            date_to: this.state.to,
            days: days.toString()
        };

        axios.post(`http://localhost/api/calendar`,  form )
        .then(res => {
            var n = new Date(this.state.from)
            this.setUpCalendar(res.data.data, n)
        })

      event.preventDefault();
    }

    handleCheckBoxChange(event) {
        let days = this.state.days
        days.forEach(item => {
           if (item.value === event.target.value)
           item.isChecked =  event.target.checked
        })
        this.setState({days: days})
    }

    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    setUpCalendar(object, date) {
    
        let num_of_days = this.daysInMonth(date.getMonth() + 1,2021);
        var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var lbl = months[date.getMonth()] + " " + date.getFullYear()
        var i = 0;
        var calendar = [];
        var days_ = [] ;
        let from = ''
        let to = ''
        let name = ''
     
        for ( i = 0 ; i < num_of_days ; i++ ) {

            var d = i + 1
            var dd =  new Date(date.getFullYear(), date.getMonth(), d)
            var obj =  {};
            obj['id'] = d;
            obj['day'] = days[dd.getDay()];
           

            if(!(Object.keys(object).length === 0 && object.constructor === Object)) {
                var date_from = new Date(object['date_from'])
                var date_to = new Date(object['date_to'])
                from = object['date_from']
                to = object['date_to']
                days_ = object['days'].split(",")
                name = object['event_name']
                var ii = i+1;

                if (( ii >= date_from.getDate() ) && ( ii <= date_to.getDate() )) {
                    if(days_.indexOf(days[dd.getDay()]) !== -1 ) {
                        obj['event_name'] = object['event_name']
                    }
                }
            }

            calendar.push(obj)
        }   

        let day = this.state.days
        day.forEach(item => {
            if(days_.indexOf(item.value) !== -1 ) 
            item.isChecked = true
         })

        this.setState({
            data: calendar,
            selectedDate: lbl,
            from: from,
            to: to,
            eventName: name,
            days: day
        })
    }

    getCalendarData(date) {

        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        let date_from =  date.getFullYear() + '-' + mm + '-' + dd
     
        axios.get(`http://localhost/api/calendar`, { params: {  date_from: date_from } } )
         .then(res => {
             let data = res.data.data ?  res.data.data : {}
             this.setUpCalendar(data, date)
         })
    }

    componentDidMount() {
       var obj = {}
       let date = new Date()
       this.getCalendarData(date)
    }

    render() {
        return (
            <div class="card">
                <div class="card-header">
                    <h3>Calendar</h3>
                </div>

                <div className="container-fluid">
                    <div class="row">
                        <div class="col">
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Event</Form.Label>
                                <Form.Control type="text"  required  name="eventName" value={this.state.eventName}  onChange={this.handleChange} placeholder="Ente Event Name" />
                                </Form.Group>
                            </Form.Row>

                         
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFrom">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="date" required value={this.state.from} name="from"  onChange={this.handleChange}  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridTo">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date" required value={this.state.to} name="to"  onChange={this.handleChange}  />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row id="formGridCheckbox">
                                {this.state.days.map(item =>(
                                     <Col xs="auto" key={item.id} className="my-1">
                                         <Form.Check type="checkbox" checked={item.isChecked} value={item.value} label={item.value} onChange={this.handleCheckBoxChange}/>
                                    </Col>
                                )
                                )}
                            </Form.Row>

                            <Button variant="primary" type="submit" value="Submit">
                                Save
                            </Button>
                        </Form>
                        </div>
                        <div class="col-7">
                            <h1>{this.state.selectedDate}</h1>
                            <Table responsive>
                                <tbody>
                                    {this.state.data.map(item =>(
                                        <tr key={item.id}  style={
                                            item.event_name
                                              ? { background: '#90EE90' }
                                              : { background: 'white' }
                                          } >
                                            <td>{item.id} {item.day}</td>
                                            <td>{item.event_name}</td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
