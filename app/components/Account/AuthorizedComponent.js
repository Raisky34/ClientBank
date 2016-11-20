import React, { PropTypes } from 'react';
import _ from 'lodash';

class AuthorizedComponent extends React.Component {
  componentWillMount() {
    const { routes } = this.props; // array of routes
    const { router } = this.context;

    // check if user data available
		debugger;
		console.log(localStorage);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // redirect to login if not
      router.push('/login');
    }

    // get all roles available for this route
    const routeRoles = _.chain(routes)
      .filter(item => item.authorize) // access to custom attribute
      .map(item => item.authorize)
      .flattenDeep()
      .value();

    // compare routes with user data
    if (_.intersection(routeRoles, [user.role]).length === 0) {
      router.push('*');
    }
  }
}

AuthorizedComponent.propTypes = {
	routes: PropTypes.array.isRequired
}

AuthorizedComponent.contextTypes = {
	router: PropTypes.object.isRequired
}

export default AuthorizedComponent;
