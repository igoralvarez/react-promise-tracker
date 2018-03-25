import React from 'react';
import { Context } from './context';

export class Provider extends React.Component {
  state = {
    promiseCount: 0,
    isPromiseInProgress: false,
  }

  trackPromise = (promise) => {
    this.setState(this.incrementPromiseCounter());

    promise
      .then(() => this.decrementPromiseCounter())
      .catch(() => this.decrementPromiseCounter());
  }

  incrementPromiseCounter = () => (state) => ({
    promiseCount: state.promiseCount++,
    isPromiseInProgress: true,
  });

  decrementPromiseCounter = () => (state) => {
    const promiseCount = state.promiseCount--;

    return {
      promiseCount,
      isPromiseInProgress: this.isPromiseInProgress(promiseCount),
    }
  };

  isPromiseInProgress = (count) => count > 0;

  render() {
    return (
      <Context.Provider value={this.state.isPromiseInProgress}>
        {this.props.children({ trackPromise: this.trackPromise })}
      </Context.Provider>
    );
  }
}
