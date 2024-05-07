import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity,Modal,ScrollView } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';

const Task = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [pieceJointe, setPieceJointe] = useState('');
  const [etat, setEtat] = useState('AUCUNE_SELECTION');
  const [priority, setPriority] = useState('AUCUNE_SELECTION');
  const [taskType, setTaskType] = useState('AUCUNE_SELECTION');
  const [complexity, setComplexity] = useState('AUCUNE_SELECTION');
  const [timeTask, setTimeTask] = useState(new Date());
  const [missionStart, setMissionStart] = useState(new Date());
  const [missionEnd, setMissionEnd] = useState(new Date());
  const [timePointage, setTimePointage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState();


  const handleChooseFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Permet de choisir tous les types de fichiers
      });
      setSelectedFile(res); // Met à jour l'état avec le fichier sélectionné
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Lutilisateur a annulé le choix du fichier');
      } else {
        console.log('Erreur inattendue :', err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sujet"
        value={subject}
        onChangeText={text => setSubject(text)}
      />

<Picker
  selectedValue={priority}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
>
  <Picker.Item label="AUCUNE_SELECTION" value="AUCUNE_SELECTION" />
  <Picker.Item label="EASY" value="EASY" />
  <Picker.Item label="MEDIUM" value="MEDIUM" />
  <Picker.Item label="HARD" value="HARD" />
</Picker>
    
<Picker
     selectedValue={etat}
    style={styles.picker}
      onValueChange={(itemValue, itemIndex) => setEtat(itemValue)}
 >

  <Picker.Item label="AUCUNE_SELECTION" value="AUCUNE_SELECTION" />
  <Picker.Item label="ETAT_ENCOURS" value="ETAT_ENCOURS" />
  <Picker.Item label="ETAT_TERMINE" value="ETAT_TERMINE" />
  <Picker.Item label="ETAT_A_FAIRE" value="ETAT_A_FAIRE" />
</Picker>

<Picker
  selectedValue={taskType}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) => setTaskType(itemValue)}
>
  <Picker.Item label="DevelopementWeb" value="DevelopementWeb" />
  <Picker.Item label="FrontEndDev" value="FrontEndDev" />
  <Picker.Item label="BackenDev" value="BackenDev" />
  <Picker.Item label="Mobile" value="Mobile" />
  <Picker.Item label="Integration" value="Integration" />
  <Picker.Item label="Deployement" value="Deployement" />
  <Picker.Item label="CI/CD" value="CI_CD" />
  <Picker.Item label="UI_UX" value="UI_UX" />
</Picker>

<Picker
  selectedValue={complexity}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) => setComplexity(itemValue)}
>
  <Picker.Item label="NIVEAU_1" value="NIVEAU_1" />
  <Picker.Item label="NIVEAU_2" value="NIVEAU_2" />
  <Picker.Item label="NIVEAU_3" value="NIVEAU_3" />
  <Picker.Item label="NIVEAU_4" value="NIVEAU_4" />
  <Picker.Item label="NIVEAU_5" value="NIVEAU_5" />
  <Picker.Item label="NIVEAU_6" value="NIVEAU_6" />
  <Picker.Item label="NIVEAU_7" value="NIVEAU_7" />
  <Picker.Item label="NIVEAU_8" value="NIVEAU_8" />
</Picker>

       <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.date}>{missionStart.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.date}>{missionEnd.toDateString()}</Text>
        </TouchableOpacity>

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

<TextInput
        style={styles.input}
        placeholder="Heure de pointage"
        value={timePointage}
        onChangeText={text => setTimePointage(text)}
      />

      <TouchableOpacity onPress={handleChooseFile} style={{ padding: 10, backgroundColor: 'gray', borderRadius: 5 }}>
     <Text style={{ color: 'white' }}>Choisir un fichier</Text>
     </TouchableOpacity>

</View>

      <Button
        title="Ajouter la tâche"
        onPress={() => {
       
          Taskdata={
            title,
            subject,
            priority,
            etat,
            timeTask,
            //pieceJointe,
            taskType,
            complexity,
            missionStart,
            missionEnd,
            timePointage 
          } 
          console.log('Taskdata',Taskdata);
          fetch('http://192.168.1.14:8010/SpringMVC/task/addTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Taskdata)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(' task added successful:', data);
            // Handle success
          })
          .catch(error => {
            console.error('Error adding tasks user:', error.message);
          });
        }}
      />
       <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}>
          <View style={styles.modalContainer}>
            <DatePicker
              date={missionStart}
              mode="date"
              onDateChange={date => {
                setMissionStart(date);
               // setShowDatePicker(false);
              }}
            />
        <TouchableOpacity
  onPress={() => setShowDatePicker(false)}
  style={[styles.button, styles.roundButton]}
>
  <Text style={styles.buttonText}>Confirmer</Text>
</TouchableOpacity>
          
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}>
          <View style={styles.modalContainer}>
            <DatePicker
              date={missionEnd}
              mode="date"
              onDateChange={date => {
                setMissionEnd(date);
               // setShowDatePicker(false);
              }}
            />
        <TouchableOpacity
  onPress={() => setShowDatePicker(false)}
  style={[styles.button, styles.roundButton]}
>
  <Text style={styles.buttonText}>Confirmer</Text>
</TouchableOpacity>

          </View>
        </Modal>
    </View>    
  
  </ScrollView>

  );
};

export default Task;
