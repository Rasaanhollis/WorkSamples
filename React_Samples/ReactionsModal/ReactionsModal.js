import React, { Component } from 'react';
import classes from './ReactionsModal.module.css';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserInfo from '../UI/UserInfo/UserInfo';
//import SentimentBar from '../../UI/SentimentBar/SentimentBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Twemoji from 'react-twemoji';


class ReactionsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reactions: [],
      lastVisible: false,
      moreAvailable: true
    };

    this.firestore = this.props.firebase.getFS();
    this.user_id = this.props.firebase.getAuth().currentUser.uid;
    this.docPath = this.props.parentPath;
    this.displayReactions = this.displayReactions.bind(this);
    this.getMoreReactions = this.getMoreReactions.bind(this);
  }
  /**
   * [GUIDE]
   * Overview: Displays a modal showcasing all users who have reacted to a piece of content. It loads an initial amount but then paginates more people
   * who reacted if you press "Load More"
   * Required Props:
   *    1. firebase
   *    2. parentPath: The document path to the content that is being reacted to. I.e. path to resolvve post or to comment
   *    3. open: boolean for when you want this component to be open
   *    4. toggle: function that turns modal off
   */

  async componentDidMount() {
    await this.getReactions();
  }

//   componentDidUpdate(prevProps, prevState) {
    
//   }

  displayReactions() {
    let JSX = this.state.reactions.map((reaction, idx) => {
        let symbol
        switch (reaction.reaction) {
            case 'like':
                symbol = '👍'
                break;
            case 'angry':
                symbol= '😡'
                break;
            case 'sad':
                symbol= '😥'
                break;
            case 'love':
                symbol= '❤️'
                break;
            case 'laugh':
                symbol= '😂'
                break;
            case 'dislike':
                symbol= '👎'
                break;
            default:
                symbol='👍'
                break;
        }
        return( 
        <div className={classes.reactainer}>
            <UserInfo 
            firebase={this.props.firebase}
            user_id={reaction.id}
            />
            <div style={{paddingRight: '5px'}}>
                <Twemoji options={{className: classes.emoji}}>{symbol}</Twemoji>
            </div>
        </div>
        )
    })
    return JSX
  }

  async getReactions() {
    let locReactions = [...this.state.reactions]
    this.props.parentPath.collection('reactions')/*.orderBy(this.props.firebase.firestore.FieldPath.documentId())*/.limit(10).get()
    .then(snaps => {
        let doNothing
        let last = snaps.docs[snaps.docs.length-1];
        snaps.docs.length < 10 || snaps.empty ? this.setState({moreAvailable: false}) : doNothing = null
        this.setState({lastVisible: last});
        if (!snaps.empty) {
            snaps.forEach(doc => {
              let data = doc.data();
              if (data.reaction === null) {return}
              data.id = doc.id
              locReactions.push(data);
            })
            this.setState({
              reactions: locReactions
            })
        }
    }).catch(err => {console.log(err)})
  }

  getMoreReactions() {
    let locReactions = [...this.state.reactions]
    this.props.parentPath.collection('reactions')/*.orderBy(this.props.firebase.firestore.FieldPath.documentId())*/
    .startAfter(this.state.lastVisible).limit(10).get()
    .then(snaps => {
        let doNothing
        let last = snaps.docs[snaps.docs.length-1];
        snaps.docs.length < 10 || snaps.empty ? this.setState({moreAvailable: false}) : doNothing = null
        this.setState({lastVisible: last});
        if (!snaps.empty) {
            snaps.forEach(doc => {
              let data = doc.data();
              if (data.reaction === null) {return}
              data.id = doc.id
              locReactions.push(data);
            })
            this.setState({
              reactions: locReactions
            })
        }
    }).catch(err => {console.log(err)})
  }

  render() {
    let reactionsJSX = this.displayReactions();  
    let displayVar = this.state.moreAvailable ? 'block' : 'none'
    return (
    //   <Twemoji options={{className: classes.emoji}}>
      <div>
          <Modal size="md" isOpen={this.props.open} toggle={this.props.toggle}>
              <ModalHeader toggle={this.props.toggle}>
                Reactions
              </ModalHeader>
              <ModalBody className={classes.bodyCont}>
                <div>
                    {reactionsJSX}
                    {this.state.reactions.length === 0  &&
                      <div className={classes.noResults}>
                        No Reactions
                      </div>
                    }
                </div>
                <div className={classes.moreToSee} style={{display: displayVar}} onClick={this.getMoreReactions}>
                    Load More
                </div>
              </ModalBody>
          </Modal>
      </div>
    // </Twemoji>
    );
  }
}

export default ReactionsModal;