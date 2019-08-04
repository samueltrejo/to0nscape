import React from 'react';

class Footer extends React.Component {
  render() {
    const { bottom } = this.props;
    return (
      <div className={bottom ? ('Footer navbar navbar-expand-lg navbar-dark bg-dark position-absolute w-100 p-0') : ('Footer navbar navbar-expand-lg navbar-dark bg-dark mt-5 p-0')}>
        <div className="container d-flex justify-content-end">
          <div className="navbar-nav">
            <p className="nav-item nav-link mb-0">To0nscape, by <a className="text-white" href="https://github.com/samueltrejo">@samueltrejo</a>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
