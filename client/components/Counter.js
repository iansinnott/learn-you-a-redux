import React, { PropTypes as T } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';

import s from './App.styl';
const cx = classnames.bind(s);
import { getCount, increment, decrement } from '../modules/counter';

class Counter extends React.Component {
  static propTypes = {
    count: T.number.isRequired,
    increment: T.func.isRequired,
    decrement: T.func.isRequired,
  };

  render() {
    const { count, increment, decrement } = this.props;
    return (
      <div className={cx('Counter')}>
        <h1 className={cx('count')}>{count}</h1>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: getCount(state),
});

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
