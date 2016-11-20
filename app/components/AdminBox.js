import React from 'react';
import RoleAwareComponent from './Account/RoleAwareComponent';

class AdminBox extends RoleAwareComponent {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['admin'];
  }

  render() {
    const jsx = (
      <div className="pure-u-13-24 box photo-box">
        <div className="box-wrapper">
          <h1>Your admin</h1>
        </div>
      </div>
    );

    return this.shouldBeVisible() ? jsx : null;
  }
}

export default AdminBox;
