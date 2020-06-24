import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';

const Messages = ({ user }) => {
  // const {
  //   username,
  //   firstName,
  //   lastName,
  //   imageUrl,
  //   bio,
  //   createdAt,
  //   location,
  // } = user;

  return (
    <div className="bootstrap-iso">
      <div className="container-fluid">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-md-4 bg-white ">
              <div className=" row border-bottom padding-sm" style={{ height: '40px' }}>
                Member
              </div>
              {/* =============================================================== */}
              {/* member list */}
              <ul className="friend-list">
                <li className="active bounceInDown">
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>John Doe</strong>
                    </div>
                    <div className="last-message text-muted">Hello, Are you there?</div>
                    <small className="time text-muted">Just now</small>
                    <small className="chat-alert label label-danger">1</small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Jane Doe</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">5 mins ago</small>
                    <small className="chat-alert text-muted"><i className="fa fa-check" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Kate</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">Yesterday</small>
                    <small className="chat-alert text-muted"><i className="fa fa-reply" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Kate</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">Yesterday</small>
                    <small className="chat-alert text-muted"><i className="fa fa-reply" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Kate</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">Yesterday</small>
                    <small className="chat-alert text-muted"><i className="fa fa-reply" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_6.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Kate</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">Yesterday</small>
                    <small className="chat-alert text-muted"><i className="fa fa-reply" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_5.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Kate</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">Yesterday</small>
                    <small className="chat-alert text-muted"><i className="fa fa-reply" /></small>
                  </a>
                </li>
                <li>
                  <a href="#" className="clearfix">
                    <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>Jane Doe</strong>
                    </div>
                    <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                    <small className="time text-muted">5 mins ago</small>
                    <small className="chat-alert text-muted"><i className="fa fa-check" /></small>
                  </a>
                </li>
              </ul>
            </div>
            {/*= ======================================================== */}
            {/* selected chat */}
            <div className="col-md-8 bg-white ">
              <div className="chat-message">
                <ul className="chat">
                  <li className="left clearfix">
                    <span className="chat-img pull-left">
                      <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">John Doe</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 12 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </li>
                  <li className="right clearfix">
                    <span className="chat-img pull-right">
                      <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">Sarah</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 13 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at.
                      </p>
                    </div>
                  </li>
                  <li className="left clearfix">
                    <span className="chat-img pull-left">
                      <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">John Doe</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 12 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </li>
                  <li className="right clearfix">
                    <span className="chat-img pull-right">
                      <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">Sarah</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 13 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at.
                      </p>
                    </div>
                  </li>
                  <li className="left clearfix">
                    <span className="chat-img pull-left">
                      <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">John Doe</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 12 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </li>
                  <li className="right clearfix">
                    <span className="chat-img pull-right">
                      <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">Sarah</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 13 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at.
                      </p>
                    </div>
                  </li>
                  <li className="right clearfix">
                    <span className="chat-img pull-right">
                      <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header">
                        <strong className="primary-font">Sarah</strong>
                        <small className="pull-right text-muted"><i className="fa fa-clock-o" /> 13 mins ago</small>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat-box bg-white">
                <div className="input-group">
                  <input className="form-control border no-shadow no-rounded" placeholder="Type your message here" />
                  <span className="input-group-btn">
                    <button className="btn btn-success no-rounded" type="button">Send</button>
                  </span>
                </div>{/* /input-group */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
