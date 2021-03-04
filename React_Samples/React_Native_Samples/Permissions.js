import React from "react";
import {
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Container, Header, Title, Button, Body, Icon, Text, DeckSwiper,
  Card, CardItem, View} from 'native-base';

  /**
   * Overview: In Resolvve's Mobile Apps users begin with a Tinder-Like Swipe left or right to share certain mobile permissions with us.
   * This is the file that makes that work. Note iOS requires an extra permission card than android for notifications.
   */

const Permissions = React.memo((props) => { 

  const cards = [
    {
      text: `Share Your Location`,
      bodyText: `Share your device's location with us to see more local content`,
      name: 'Location',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: `Gallery Access`,
      bodyText: `This allows you to more easily share files from your device to your Resolvve Gallery`,
      name: 'Gallery',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: `Camera Access`,
      bodyText: `This allows you to capture images on your device and directly upload them to your Resolvve Gallery`,
      name: 'Camera',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: 'Share Your Contacts',
      bodyText: `Share your contacts with us so we can help you find your friends on Resolvve`,
      name: 'Contacts',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FContacts-icon.png?alt=media&token=acfe0089-ad83-4166-a3a5-878634e2111b"
    }
  ];

  const cardsiOS = [
    {
      text: `Share Your Location`,
      bodyText: `Share your device's location with us to see more local content`,
      name: 'Location',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: `Gallery Access`,
      bodyText: `This allows you to more easily share files from your device to your Resolvve Gallery`,
      name: 'Gallery',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: `Camera Access`,
      bodyText: `This allows you to capture images on your device and directly upload them to your Resolvve Gallery`,
      name: 'Camera',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: `Notifications`,
      bodyText: `Allow your device to receive notifications from Resolvve`,
      name: 'Notification',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FLocation%20Symbol.png?alt=media&token=19ebc0a1-e081-4833-aa44-ed8e1b23e9ef"
    },
    {
      text: 'Share Your Contacts',
      bodyText: `Share your contacts with us so we can help you find your friends on Resolvve`,
      name: 'Contacts',
      image: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/app_images%2FContacts-icon.png?alt=media&token=acfe0089-ad83-4166-a3a5-878634e2111b"
    }
  ];

  let _deckSwiper
  let platform = Platform.OS === 'ios' ? 'ios' : 'not ios'
  let currItem = "Location"
  let rightSwipe = () => {
    let initialCurrentItem = currItem
    switch(initialCurrentItem) {
      case "Location" : 
        props.requestLocation();
        currItem = "Gallery"
        break;
      case "Gallery" :
        props.requestGallery();
        currItem = "Camera"
        break;
      case "Camera" :
        props.requestCamera();
        currItem = platform === "ios" ? "Notification": "Contacts"
        break;
      case "Notification" :
        props.requestNotifs();
        currItem = "Contacts"
        break;
      case "Contacts" : 
        props.requestContacts();
        props.permissionsComplete();
        break;
      default: 
        console.log("Default Running")
    }
  }
  let leftSwipe = () => {
    let initialCurrentItem = currItem
    switch(initialCurrentItem) {
      case "Location" : 
        currItem = "Gallery"
        break;
      case "Gallery" :
        currItem = "Camera"
        break;
      case "Camera" :
        currItem = platform === "ios" ? "Notification": "Contacts"
        break;
      case "Notification" :
        currItem = "Contacts"
        break;
      case "Contacts" : 
        props.deniedPermissionsDone();
        props.permissionsComplete();
        break;
      default: 
        console.log("Default Running")
    }
  }
  //console.log("NoSwiping", _deckSwiper)
  return (
    <Container>
        <Header style={{backgroundColor: "#109cff"}}>
          <Body>
          <Title style={{fontWeight: 'bold', marginLeft: 10, color: "#ffffff"}}>Resolvve Permissions</Title>
          </Body>
        </Header>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        <View style={{/*backgroundColor: "red",*/ height: "100%"}}>
          <DeckSwiper
            ref={(c) => _deckSwiper = c}
            dataSource={platform === "ios" ? cardsiOS : cards}
            looping={false}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                {/* <Text>Over</Text> */}
              </View>
            }
            onSwipeRight={rightSwipe}
            onSwipeLeft={leftSwipe}
            renderItem={item =>
              <Card style={{ elevation: 3, marginLeft: "auto", marginRight: "auto", marginTop: 15, padding: 10 }}>
                <CardItem style={{ paddingLeft: 0}}>
                    <Body>
                      <Text style={{fontWeight: "bold", fontSize: 20}}>{item.text}</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                  <Body >
                    <Text>
                      {item.bodyText}
                    </Text>
                    {item.name === "Contacts" && <Icon style={styles.fontIcons} type="FontAwesome5" name="address-card" regular />}
                    {item.name === "Location" && <Icon style={styles.fontIcons} type="FontAwesome5" name="map-marker-alt" />}
                    {item.name === "Gallery" && <Icon style={styles.fontIcons} type="FontAwesome5" name="image" />}
                    {item.name === "Notification" && <Icon style={styles.fontIcons} type="FontAwesome5" name="bell" />}
                    {item.name === "Camera" && <Icon style={styles.fontIcons} type="FontAwesome5" name="camera-retro" />}
                  </Body>
                </CardItem>
                <View style={{ flexDirection: "column", alignSelf: "center", flex: 1, justifyContent: 'flex-end', padding: 15, alignItems: "flex-end", marginLeft: 10, marginRight: 10 }}>
           <Button 
            style={{ marginBottom: 15, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: "#109cff", borderRadius: 50 }} 
            onPress={() => { _deckSwiper._root.swipeRight(); rightSwipe()}}
          >
            <Text style={{fontWeight: "bold"}}>Yes: Swipe Right</Text>
          </Button>
          <Button 
            style={{ width: 250, justifyContent: "center", alignItems: "center", backgroundColor: "#109cff", borderRadius: 50 }} 
            onPress={() => {_deckSwiper._root.swipeLeft(); leftSwipe()}}
          >
            <Text style={{fontWeight: "bold"}}>No: Swipe Left</Text>
          </Button>
        </View>
              </Card>
            }
          />
        </View>
      </Container>
  );
},
(prevProps, nextProps) => {
  //could be smarter, this just stops this component from re-rendering
  return true 
}
);

const styles = StyleSheet.create({
  fontIcons: {
    color: "#109cff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 175
  
}});

export default Permissions;