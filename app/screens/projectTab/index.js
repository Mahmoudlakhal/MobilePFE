import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,ImageBackground, Alert , Button } from 'react-native';
import styles from './styles';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';


const ProjectTab = ({ route }) => {
    const { Project } = route.params;


    const [columns, setColumns] = useState([
        new ColumnModel("new", "New", 1),
        new ColumnModel("inProgress", "In Progress", 2),
        new ColumnModel("ready", "Ready", 3),
      ]);
    



      const [cards, setCards] = useState([
        new CardModel(
          "jkjkjkjkh",
          "new",
          "1st Card",
          "Example card111",
          "test description",
          
          [
            {
              text: "Tag1",
              backgroundColor: "#00FF00",
              textColor: "#000000"
            }
          ],
          null,
          1
        ),
        new CardModel(
          "jkhjkhjkh",
          "new",
          "2nd Card",
          "Example card22",
          "test description",
          [
            {
              text: "Tag2",
              backgroundColor: "#FFA500",
              textColor: "#000000"
            }
          ],
          null,
          2
        ),
        
        new CardModel(
          "dsffdsfsddfs",
          "inProgress",
          "3rd Card",
          "Example card33",
          "test description",
          [],
          null,
          1
        ),
        new CardModel(
            "gffggf",
            "ready",
            "4rd Card",
            "Example card44",
            "test description",
            [],
            null,
            1
          )
      ]);


      let exampleCardNo = 1;


      const addNewCard = () => {
        const newCard = new CardModel(
          "Generated card",
          "new",
          "New card " + exampleCardNo++,
          "Example card44",
          "Some description",
          [],
          null,
          1
        );
    
        setCards([...cards, newCard]);
      }



      const onCardDragEnd = (srcColumn, destColumn, item, cardIdx) => {
        Alert.alert(
            'Card finished dragging',
            `Item: ${item.title} \nFrom column: ${srcColumn.id} \nTo column: ${destColumn.id} \nCard index: ${cardIdx}`
          );
      }
    

      
  const onCardPress = (card) => {
    Alert.alert(`Card '${card.title}' pressed`);
}
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>

        <View style={styles.container}>





 
      <Text>Example kanban board</Text>

      <View style={styles.actionsContainer}>
        <Button onPress={addNewCard} title='Add new card' />
      </View>

      <KanbanBoard
        columns={columns}
        cards={cards}
        onDragEnd={(srcColumn, destColumn, item, targetIdx) => onCardDragEnd(srcColumn, destColumn, item, targetIdx)}
        onCardPress={(item) => onCardPress(item)}
        style={styles.kanbanStyle}
      />
  
        </View>
        </ImageBackground>

    );
};

export default ProjectTab;
