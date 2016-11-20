import React, { PropTypes } from 'react';

export default class RouteHandler extends React.Component {

  render() {
    const { children } = this.props;

    // No children means nothing to render.
    if (!children) {
      return null;
    }

    // That makes nested routes working.
    const propsWithoutChildren = { ...this.props };
    delete propsWithoutChildren.children;

    return React.cloneElement(children, propsWithoutChildren);
  }
}

RouteHandler.propTypes = {
	children: PropTypes.object
}
