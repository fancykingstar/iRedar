import React, {Component} from 'react';
import {connect} from 'react-redux';

class MessagePage extends Component {
  render() {
    return (
      <div className={'slim-mainpanel'}>
        <div className="container container-messages" style={{height: '75vh'}}>
          <div className="messages-left">
            <div className="slim-pageheader">
              <h6 className="slim-pagetitle">Messages</h6>
              <a href="" className="messages-compose"><i className="icon ion-compose"/></a>
            </div>
            <div className="messages-list ps ps--theme_default ps--active-y"
              data-ps-id="68565780-3c6e-a8ec-0c22-2a40a868e860">
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Socrates Itumay</h6>
                    <p>The new common language will be more simple and regular...</p>
                  </div>
                  <div>
                    <span>Dec 14</span>
                  </div>
                </div>
              </a>
              <a href="" className="media unread">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Joyce Chua</h6>
                    <p>To an English person, it will seem like simplified english...</p>
                  </div>
                  <div>
                    <span>Dec 14</span>
                    <span>1</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Isidore Dilao</h6>
                    <p>The new common language will be more simple and regular...</p>
                  </div>
                  <div>
                    <span>Dec 12</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-gray-600"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Dyanne Aceron</h6>
                    <p>To an English person, it will seem like simplified english...</p>
                  </div>
                  <div>
                    <span>Dec 10</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-gray-600"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Roven Galeon</h6>
                    <p>To an English person, it will seem like simplified english...</p>
                  </div>
                  <div>
                    <span>Dec 08</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                
                <div className="media-body">
                  <div>
                    <h6>Helder Bongcaras</h6>
                    <p>The new common language will be more simple and regular...</p>
                  </div>
                  <div>
                    <span>Dec 07</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Maricel Villalon</h6>
                    <p>The new common language will be more simple and regular...</p>
                  </div>
                  <div>
                    <span>Dec 07</span>
                  </div>
                </div>
              </a>
              <a href="" className="media">
                <div className="media-left">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <span className="square-10 bg-success"/>
                </div>
                <div className="media-body">
                  <div>
                    <h6>Maritte Rejas</h6>
                    <p>To an English person, it will seem like simplified english...</p>
                  </div>
                  <div>
                    <span>Dec 05</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="messages-left-footer">
              <button className="btn btn-slim btn-uppercase-sm btn-block">Load Older Messages</button>
            </div>
          </div>
          <div className="messages-right">
            <div className="message-header">
              <a href="" className="message-back"><i className="fa fa-angle-left"/></a>
              <div className="media">
                <img src="http://via.placeholder.com/500x500" alt=""/>`
                <div className="media-body">
                  <h6>Joyce Chua</h6>
                  <p>Last seen: 2 hours ago</p>
                </div>
              </div>
              <div className="message-option">
                <div className="d-none d-sm-flex">
                  <a href=""><i className="icon ion-ios-telephone-outline"/></a>
                  <a href=""><i className="icon ion-ios-videocam-outline"/></a>
                  <a href=""><i className="icon ion-ios-gear-outline"/></a>
                  <a href=""><i className="icon ion-ios-information-outline"/></a>
                </div>
                <div className="d-sm-none">
                  <a href=""><i className="icon ion-more"/></a>
                </div>
              </div>
            </div>
            
            <div className="message-body ps ps--theme_default" data-ps-id="3ff62263-ab02-74be-33aa-7ffa0172d9da">
              <div className="media-list">
                <div className="media">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <div className="media-body">
                    <div className="msg">
                      <p>Hi, there?</p>
                    </div>
                    <div className="msg">
                      <p>Are you ready for our party tonight?</p>
                    </div>
                  </div>
                </div>
                
                <div className="media">
                  <div className="media-body reverse">
                    <div className="msg">
                      <p>So this is where you plan to do it?</p>
                    </div>
                  </div>
                  
                  <img src="http://via.placeholder.com/500x500" className="wd-50 rounded-circle" alt=""/>
                </div>
                
                <div className="media">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <div className="media-body">
                    <div className="msg">
                      <p>As good a place as any.</p>
                    </div>
                  </div>
                </div>
                
                <div className="media">
                  <div className="media-body reverse">
                    <div className="msg">
                      <p>At least have the balls to call this what it is: murder. You really believe if you walk back
                        onto
                        that farm alone, no me, no Randall... </p>
                    </div>
                    <div className="msg">
                      <p>You really believe they're gonna buy whatever bullshit story you cook up?</p>
                    </div>
                  </div>
                  
                  <img src="http://via.placeholder.com/500x500" className="wd-50 rounded-circle" alt=""/>
                </div>
                
                <div className="media">
                  <img src="http://via.placeholder.com/500x500" alt=""/>
                  <div className="media-body">
                    <div className="msg">
                      <p>That's just it, it ain't no story. I saw that prisoner shoot you down. I ran after him, I
                        snapped his neck. It ain't gonna be easy, but Lori and Carl, they'll get over you. They done it
                        before. They just gonna have to.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="message-footer">
              <div className="row row-sm">
                <div className="col-9 col-sm-8 col-xl-9">
                  <input type="text" className="form-control" placeholder="Type something here..."/>
                </div>
                <div className="col-3 col-sm-4 col-xl-3 tx-right">
                  <div className="d-none d-sm-block">
                    <a href=""><i className="icon ion-happy-outline"/></a>
                    <a href=""><i className="icon ion-ios-game-controller-b-outline"/></a>
                    <a href=""><i className="icon ion-ios-camera-outline"/></a>
                    <a href=""><i className="icon ion-ios-mic-outline"/></a>
                  </div>
                  <div className="d-sm-none">
                    <a href=""><i className="icon ion-more"/></a>
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

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {})(MessagePage);
