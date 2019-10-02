import React from 'react';
import { VictoryBar } from 'victory';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default class Chart extends React.Component {
  render() {
    return (
      <VictoryBar style={{ parent: { maxWidth: '20%' } }}
        data={data}
        // data accessor for x values
        x="quarter"
        // data accessor for y values
        y="earnings"
      />
    );
  }
}
