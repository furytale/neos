import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import styles from './NeoObjects.styl';
import config from 'configs/app.config';

const mapStateToProps = ({ neo }: Object) => ({
  items: neo.data,
  pending: neo.pending
});

@connect(mapStateToProps, null)
@CSSModules(styles, config.cssModules)
class NeoObjects extends Component {
  static propTypes = {
    items: PropTypes.array,
    pending: PropTypes.bool
  };

  static defaultProps = {
    items: [],
    pending: false
  };
  constructor() {
    super();
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
    };
  }

  renderRows() {
    const {items} = this.props;
    let counter = 0;
    let it = 0;
    const dataItems = items.sort((itemObjectA: object, itemObjectB: object) => new Date(itemObjectB.day) - new Date(itemObjectA.day));
    return dataItems.map((item: object) => {
      counter += 1;
      const cellInfo = item.data.map((itemElement: string) => {
        it += 1;
        const styleObjs = itemElement.is_potentially_hazardous_asteroid ? {backgroundColor: 'red'} : {};
        return (
          <TableRow key={`row-${counter}-${it}-${item.day}`} style={styleObjs}>
            <TableRowColumn key={`day-${counter}-${it}-${item.day}`}>{item.day}</TableRowColumn>
            <TableRowColumn key={`est-${counter}-${it}-${item.day}`}>
              <span className='Min' key={`span1-est-${counter}-${it}-${item.day}`}>Min: {itemElement.estimated_diameter.estimated_diameter_min}</span>
              <br />
              <span key={`span2-est-${counter}-${it}-${item.day}`}>Max: {itemElement.estimated_diameter.estimated_diameter_max}</span>
            </TableRowColumn>
            <TableRowColumn key={`miss-${counter}-${it}-${item.day}`}>{itemElement.miss_distance}</TableRowColumn>
            <TableRowColumn key={`vel-${counter}-${it}-${item.day}`}>{itemElement.relative_velocity}</TableRowColumn>
          </TableRow>
        );
      });
      return cellInfo;
    });
  }

  render() {
    return (
      <div>
        <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={false}
        multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Max Estimate Diameter</TableHeaderColumn>
              <TableHeaderColumn>Closest NEO</TableHeaderColumn>
              <TableHeaderColumn>Fastest NEO</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
          >
          {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default NeoObjects;
