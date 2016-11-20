import React  from 'react';
import _ from 'lodash';

class RoleAwareComponent extends React.Component {
  constructor(props) {
    super(props);
    this.authorize = [];
  }

  shouldBeVisible() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return _.intersection(this.authorize, [user.role]).length > 0;
    }

    return false;
  }
}

export default RoleAwareComponent;
