import React from 'react';
import styles from './MyMessage.css';


const MyMessage = ({ message, chatGroupId, userFromId, isThatGroup, isMeSend, key }) => {
  if (isThatGroup && !isMeSend) {
    return (
      <div className={styles.father}>
      <div className={styles.isMeGet}>
        {message}
      </div>
      </div>
    );
  }
  if (isThatGroup && isMeSend) {
    return (
      <div className={styles.father}>
      <div className={styles.isMeSend}>
        {message}
      </div>
      </div>
    );
  }
  return (<div></div>);
}
export default MyMessage;
