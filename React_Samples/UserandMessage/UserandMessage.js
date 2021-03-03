import React, {useState, useEffect} from "react"
import classes from './UserandMessage.module.css';
import UserInfo from '../UserInfo/UserInfo';
import CurrencyFormatter from '../../Functions/CurrencyFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**
 * [GUIDE]
 * Overview: This component is designed to show a user's message in a simple UI. It's flexible
 * to show reviews with stars or monetary contributions depending on props you pass in
 * This component requires the following props:
 *      1. user_id : The User ID that will create the profile picture/name/username
 *      2. firebase: to pass into the UserInfo component for its query
 *      3. message: The text to show on screen
 * This component has the following optional props:
 *      1. contribAmt: If this component is used to show contributions, provide the
 *         number of cents of the contribution i.e. $5.00 is 500 cents.
 *      2. date: A date object that will be used to show a formatted date.
 *      3. anonymous: Boolean where if true the user's names and profile picture will be hidden
 *      4. review: Number representing the average review rating. the number of stars to show
 *         will be rounded.
 *      5. selected: boolean that changes styling if this is used as a button
 */

 let UserandMessage = (props) => {

    
    let region = window.navigator.userLanguage || window.navigator.language;
    let determineDateText = () => {
        if (props.date) {
            if (!(props.date instanceof Date)) {
            return props.date.toDate().toLocaleDateString(region, {month: "numeric", day: "numeric"/*, year: "numeric"*/})}
            else {return props.date.toLocaleDateString(region, {month: "numeric", day: "numeric"/*, year: "numeric"*/})}
        }
        else { return ''}
    }
    let determineTimeText = () => {
        if (props.date) {
            if (!(props.date instanceof Date)) {
            return props.date.toDate().toLocaleTimeString(region, {hour12: true, hour: 'numeric', minute: 'numeric'})}
            else {return props.date.toLocaleTimeString(region, {hour12: true, hour: 'numeric', minute: 'numeric'})}
        }
        else { return ''}
    }
    let dateText = determineDateText();
    //dateText = dateText.substr(0, dateText.length - 2)
    let timeText = determineTimeText();
    //timeText = timeText.substr(1);

    let determineExtraJSX = () => {
        if (props.contribAmt) {
            let formattedString = CurrencyFormatter('usd', props.contribAmt)
            return (<div className={classes.money}>{formattedString}</div>)
        }
        if (props.rating) {
            const stars = [1, 2, 3, 4, 5];
            let starDisplay = stars.map((val, ix) => (
                <FontAwesomeIcon 
                  key={'star' + val} icon='star'
                  className={ix + 1 <= Math.round(props.rating) ? classes.Gold: classes.Grey}
                />
              ))
            let result = (
            <div className={classes.starRow}>
                {starDisplay}
            </div>
            )
            return result
        }
        else return (<div style={{display: 'none'}}></div>)
    }

    let determineProfileJSX = () => {
        if (props.anonymous) {
            return (
            <div>
                <div style={{display: 'flex'}}>     
                    <div className={classes.DWUserImg}>
                    <img src={'placeholderURL, real URL in real app'} alt= '' />
                    </div>
                    <div className={classes.DWNames} style={{color: 'grey'}}>
                    <div style={{fontWeight: '500'}}>Anonymous</div>
                    </div> 
                </div>
            </div>
            )
        }
        else {
            return (
            <UserInfo
            firebase={props.firebase}
            user_id={props.user_id} 
            />
            )
        }
    }
    let extraJSX = determineExtraJSX();
    let profileJSX = determineProfileJSX();

    return (
        <div className={classes.container} style={props.selected ? {boxShadow: '0px 0px 10px gold'} : {}}>
            <div className={classes.topContainer}>
                {profileJSX}
                <div className={classes.dateExtras}>
                    <div className={classes.text}>{`${dateText} ${timeText}`}</div>
                    {extraJSX}
                </div>
            </div>
            <div className={classes.message}>
                {props.message}
            </div>
        </div>
    )
 }

 export default UserandMessage