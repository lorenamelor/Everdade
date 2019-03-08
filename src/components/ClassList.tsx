import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { map } from 'lodash';
import { ActionsButtons } from '../components/';

function ClassList(props: any) {
  const { listItems } = props;

  return (
    <div>
      <List component="nav">
        {map(listItems, (item) =>
          <div>
            <ListItem button key={item.name}>
              <ListItemText primary={item.name} />
              <ActionsButtons viewUrl='/turma' />
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    </div>
  );
}


export default ClassList;
