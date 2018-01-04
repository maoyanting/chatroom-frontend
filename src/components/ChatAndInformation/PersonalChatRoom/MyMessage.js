import React from 'react';
import styles from './MyMessage.css';


const MyMessage = ({message, userToId, userFromId, isMeGet, isMeSend, key}) => {
  if (isMeGet) {
    return (
      <div className={styles.father}>
        <div className={styles.isMeGetAvatar}>{userFromId}</div>
        <div className={styles.isMeGet}>
          {message}
        </div>
      </div>
    );
  }
  if (isMeSend) {
    return (
      <div className={styles.father}>
        <div className={styles.isMeSendAvatar}>{userFromId}</div>
        <div className={styles.isMeSend}>
          {message}
        </div>
      </div>
    );
  }
  return (<div></div>);
}
export default MyMessage;
