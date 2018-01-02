import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import ChangeListType from './ChangeListType';
import styles from './ListLayout.less';

function MainLayout({ dispatch, ListType }) {
  function getMessages() {
    dispatch({ type: 'app/query', payload: { ListType: 'messages' } });
  }
  function getContacts() {
    dispatch({ type: 'app/query', payload: { ListType: 'contacts' } });
  }
  function getTeam() {
    dispatch({ type: 'app/query', payload: { ListType: 'team' } });
  }
  return (
    <div>
      <div className={styles.ListLayout}>
      <Icon type="message" className={styles.Icon} onClick={() => getMessages()} />
      <Icon type="contacts" className={styles.Icon} onClick={() => getContacts()} />
      <Icon type="team" className={styles.Icon} onClick={() => getTeam()} />
      </div>
      <ChangeListType ListType={ListType} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ListType: state.app.ListType,
  };
}
export default connect(mapStateToProps)(MainLayout);
