import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { map } from 'lodash';
import { ActionsButtons } from '../components/';


function ClassList(props: any) {
  const { listItems, openModal, handleIdItem } = props;
             
  return (
    <div>
      <List component="nav">
        {map(listItems, (item, index) =>
          <div key={index.toString()}>
            <ListItem button >
              <ListItemText primary={item.nome} />
              <ActionsButtons viewUrl='/turma' idItem={item.id_turma} handleIdItem={handleIdItem} openModal={openModal}/>
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    </div>
  );
}


export default ClassList;
