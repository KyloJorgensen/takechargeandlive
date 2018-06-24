'use strict';

import { Component, createContext } from 'react';
export const ProviderContext = createContext({
	addClickOutsideEventListener: () => {throw new Error('Error: Cannot addClickOutsideEventListener no ProviderContext.Provider element in parents')},
	removeClickOutsideEventListener: () => {throw new Error('Error: Cannot removeClickOutsideEventListener no ProviderContext.Provider element in parents')},
});

export interface IClickOutsideEventListener {
  uniqueTag: string;
  clickHandler: Function;
}

export interface IProviderState {
  clickOutsideEventListeners: IClickOutsideEventListener[];
}

class Provider extends Component<null, IProviderState> {
  constructor(props) {
    super(props);
    this.state = {
      clickOutsideEventListeners: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.addClickOutsideEventListener = this.addClickOutsideEventListener.bind(this);
    this.removeClickOutsideEventListener = this.removeClickOutsideEventListener.bind(this);
  }

  handleClick = event => {
    this.state.clickOutsideEventListeners.forEach(listener => {listener.handleClick(event)});
  };

  // addClickOutsideEventListener = (uniqueTag, clickHandler) => {
  //   const results = this.props.addClickOutsideEventListener(this.state, uniqueTag, clickHandler);
  //   this.setState(results._state);
  //   return results.added;
  // };

  // removeClickOutsideEventListener = (uniqueTag) => {
  //   const results = this.props.removeClickOutsideEventListener(this.state, uniqueTag);
  //   this.setState(results._state)
  //   return results.deleted;
  // };


  addClickOutsideEventListener = (uniqueTag:string, clickHandler: Function):boolean => {
    let added = true;
    this.setState((prevState, props) => {
      const { clickOutsideEventListeners } = prevState; 
      if (clickOutsideEventListeners.findIndex((listener) => listener.uniqueTag == uniqueTag) == -1) {
        added = false
      } else {
        clickOutsideEventListeners.push({
          uniqueTag: uniqueTag,
          clickHandler: clickHandler,
        })
      }
      return {clickOutsideEventListeners: clickOutsideEventListeners};
    });
    return added;
  }
  
	removeClickOutsideEventListener = (uniqueTag) => {
    let deleted = true;
    this.setState((prevState, props) => {
      const { clickOutsideEventListeners } = prevState; 
      const index = clickOutsideEventListeners.findIndex(listener => listener.uniqueTag !== uniqueTag);
      if (index == -1) {
        deleted = false;
      } else {
        clickOutsideEventListeners.splice(index, 1);
      }
      return {clickOutsideEventListeners: clickOutsideEventListeners};
    });
    return deleted;
	}

  render() {
    const { addClickOutsideEventListener, removeClickOutsideEventListener, handleClick } = this;
		const context = {
			addClickOutsideEventListener: addClickOutsideEventListener,
			removeClickOutsideEventListener: removeClickOutsideEventListener,
    }
    
    return (
      <ProviderContext.Provider value={context}>
        <div onClick={handleClick}>
            {this.props.children}
        </div>
      </ProviderContext.Provider>
    );
  }
}

export default Provider 
