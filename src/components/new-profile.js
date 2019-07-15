import React from 'react';

class NewProfile extends React.Component {
  render() {
    return (
      <div className="NewProfile">
        <div className="col-12 vh-100 d-flex align-items-center px-0">
          <div className="container">
            <div className="card">
              <div className="m-5">
                <div className="row no-gutters">
                  <div className="col-md-6 text-center">
                    <i className="d-none d-md-block card-img my-5 mx-auto fas fa-chess ts-change"></i>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body text-center mx-5">
                      <h5 className="lead font-weight-bold mb-5 text-center">Create Profile</h5>
                      <input type="text" className="form-control mb-4" placeholder="Username" />
                      <input type="text" className="form-control mb-4" placeholder="Profile Picture" />
                      <textarea className="form-control mb-4" rows="4" placeholder="Bio"></textarea>
                      <button className="btn btn-dark px-3"><i className="fas fa-address-card pr-1"></i> Create</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProfile;
