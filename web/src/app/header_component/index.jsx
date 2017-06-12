import React from 'react';

export default class HeaderComponent extends React.PureComponent {
  render() {
    console.log(this.props);
    return (
      <header>
        <div>
          <a href="/">Team</a>
        </div>
      </header>);
  }
}
