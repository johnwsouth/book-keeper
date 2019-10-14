import React from 'react';
import { withRouter } from 'react-router-dom';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

class DateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDate: this.props.match.params.date,
      dateEntries: []
    };
    this.getDaySales = this.getDaySales.bind(this);
  }

  componentDidMount() {
    this.getDaySales();
  }

  getDaySales() {
    fetch(`http://localhost:3000/api/entries/day/${'' + this.props.match.params.date}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ dateEntries: data });
      });
  }

  render() {

    return (
      <>
        <VictoryChart height={200} width ={600} style={{ parent: { height: '30vh', maxWidth: '70%', position: 'absolute', left: '15%', top: '10%' } }}>
          <VictoryLine
            data={[
              { hour: '0:00', sales: 1 },
              { hour: '1:00', sales: 2 },
              { hour: '2:00', sales: 3 },
              { hour: '3:00', sales: 5 },
              { hour: '4:00', sales: 0 },
              { hour: '5:00', sales: 7 },
              { hour: '6:00', sales: 4 },
              { hour: '7:00', sales: 8 },
              { hour: '8:00', sales: 4 },
              { hour: '9:00', sales: 7 },
              { hour: '10:00', sales: 2 },
              { hour: '11:00', sales: 4 }
            ]}
            // data accessor for x values
            x='hour'
            // data accessor for y values
            y='sales'
            animate={{ duration: 650 }}/>
          <VictoryAxis
            label="Hour"
            style={{
              axisLabel: { fontSize: 10, padding: 30 }

            }}
          />
          <VictoryAxis dependentAxis
            label="Sales"
            style={{
              axisLabel: { fontSize: 10, padding: 35 }
            }}
          />
        </VictoryChart>

        <VictoryChart height={200} width={600} style={{ parent: { height: '30vh', maxWidth: '70%', position: 'absolute', left: '15%', top: '50%' } }}>
          <VictoryLine
            data={[
              { hour: '12:00', sales: 6 },
              { hour: '13:00', sales: 2 },
              { hour: '14:00', sales: 4 },
              { hour: '15:00', sales: 6 },
              { hour: '16:00', sales: 0 },
              { hour: '17:00', sales: 4 },
              { hour: '18:00', sales: 8 },
              { hour: '19:00', sales: 2 },
              { hour: '20:00', sales: 1 },
              { hour: '21:00', sales: 6 },
              { hour: '22:00', sales: 3 },
              { hour: '23:00', sales: 5 }
            ]}
            // data accessor for x values
            x='hour'
            // data accessor for y values
            y='sales'
            animate={{ duration: 650 }} />
          <VictoryAxis
            label="Hour"
            style={{
              axisLabel: { fontSize: 10, padding: 30 }

            }}
          />
          <VictoryAxis dependentAxis
            label="Sales"
            style={{
              axisLabel: { fontSize: 10, padding: 35 }
            }}
          />
        </VictoryChart>
        <h1 style={{ position: 'absolute', top: '50%' }}>Im the date {this.props.match.params.date}</h1>
      </>
    );
  }
}

export default withRouter(DateDetails);
