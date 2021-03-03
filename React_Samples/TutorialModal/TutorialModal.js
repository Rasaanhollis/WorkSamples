import React, { Component } from 'react';
import classes from './TutorialModal.module.css';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class TutorialModal extends Component {
  constructor(props) {
    super(props);
    // this.youtubeLink = {"https://www.youtube.com/watch?v=npGgezHBy2o";}
    this.displayMedia = this.displayMedia.bind(this);
    this.getEmbedded = this.getEmbedded.bind(this);
    this.state = {
      secondPage: false,
      youTube: false
    };

    this.firestore = this.props.firebase.getFS(); //Not used for now, but may want to access FS in the future
    this.toggPage = this.toggPage.bind(this);
  }
  /**
   * [GUIDE]
   * Overview: This component is resuable to show tutorials for how to do things on Resolvve.
   * It's flexible to show image or youtube video tutorials with 1 or 2 pages. Pass props in to change content, behavior, and style
   * Required Props:
   *    1. firebase
   *    2. open: boolean for when you want this component to be open
   *    3. toggle: function that turns modal off
   *    4. body_text: string containing the text you want to show the user in the tutorial
   *    5. header_text: string containing the header of the Tutorial Modal
   * Optional props:
   *    1. noBackground: boolean where if true changes the image background to white
   *    2. secondPage: boolean where if true creates a structure for a second modal page
   *      3. nextButtonText: String that creates the text on the next button
   *      4. backButtonText: String that creates the text on the back button
   *      5. body_text2: Provides body text for second page
   *      6. header_text2: Provides header text for second page
   *      7. photo2: Provides URL link to image for second page
   *      8. noBackground2: changes background to white for second image
   *    9. preLine: boolean, pass in if the text needs multiple paragraphs. You'll need to use template literals to set this up though
   *    10. photo: url link to an image to be displayed at the top of the tutorial. Send false if there is no image
   *    11. youtube: url link to a youtube video on first page of modal 
   *    12. youtube2: url link to a youtube video on second page of modal
   */

//   async componentDidMount() {
//   }

//   componentDidUpdate(prevProps, prevState) {
//   }
displayMedia(youtube) {
  // Display youtube_link if having it
  if (youtube) {
    const embedded = this.getEmbedded(youtube);
    if (embedded) {
      return (
        <div style={{width: "100%"}}>
          <iframe
            id={"yt" + embedded}
            type='text/html'
            width='100%'
            height='360'
            title={embedded}
            src={embedded}
            allowFullScreen={true}
          ></iframe>
        </div>
      );
    }
      }
  }
  getEmbedded(youtube) {
  if (
    /^(https?:\/\/)?www\.youtube\.com\/embed\/[a-zA-Z0-9-_]+$/.test(
      youtube
    )
  ) {
    const key = youtube.match(/embed\/.+$/)[0].substring(6);
    return "https://www.youtube.com/embed/" + key;
  }
  if (/^(https?:\/\/)?www\.youtube\.com\/watch\?.+/.test(youtube)) {
    const key = youtube.match(/v=[a-zA-Z0-9-_]+/)[0].substring(2);
    return "https://www.youtube.com/embed/" + key;
  }
  if (/^(https?:\/\/)?youtu\.be\/.+/.test(youtube)) {
    const key = youtube
      .match(/youtu\.be\/[a-zA-Z0-9-_]+$/)[0]
      .substring(9);
    return "https://www.youtube.com/embed/" + key;
  }
  return null;
}

  toggPage = () => {
    let bool = this.state.secondPage;
    this.setState({secondPage: !bool});
  }

  render() {
    
    return (
      <div>
          <Modal size="md" isOpen={this.props.open} toggle={this.props.toggle}>
              {this.state.secondPage === false && 
              <div>
              <ModalHeader toggle={this.props.toggle}>
                {this.props.header_text}
              </ModalHeader>
              <ModalBody className={classes.bodyCont}>
              {this.props.youtube && <div className={classes.FeatureItem}>
              {this.displayMedia(this.props.youtube)}
            </div>}
                {this.props.photo &&
                <div style={this.props.noBackground? {backgroundColor: "white"}: {}} className={classes.imgContainer}>
                    <img src={this.props.photo} className={classes.tutorialImg}>
                    </img>
                </div>}
                <div style={this.props.preLine ? {whiteSpace: "pre-line"}: {}}>
                    {this.props.body_text}
                </div>
                {this.props.secondPage === true && 
                  <Button className={classes.NextBack} color="primary" onClick={this.toggPage}>
                    {this.props.nextButtonText || "Next"}
                  </Button>
                }
              </ModalBody>
              </div>}
              {this.state.secondPage === true && 
              <div>
              <ModalHeader toggle={this.props.toggle}>
                {this.props.header_text2}
              </ModalHeader>
              <ModalBody className={classes.bodyCont}>
              {this.props.youtube2 && <div className={classes.FeatureItem}>
              {this.displayMedia(this.props.youtube2)}
              </div>}
                {this.props.photo2 &&
                <div style={this.props.noBackground2? {backgroundColor: "white"}: {}} className={classes.imgContainer}>
                    <img src={this.props.photo2} className={classes.tutorialImg}>
                    </img>
                </div>}
                <div style={this.props.preLine2 ? {whiteSpace: "pre-line"}: {}}>
                    {this.props.body_text2}
                </div>
                <Button className={classes.ExitTutorial} color="danger" onClick={this.props.toggle}>
                    Exit Tutorial
                </Button>
                {this.props.secondPage === true && 
                  <Button className={classes.NextBack} color="primary" onClick={this.toggPage}>
                    {this.props.backButtonText || "Back"}
                  </Button>
                }
              </ModalBody>
              </div>}
          </Modal>
      </div>
    );
  }
}

export default TutorialModal;