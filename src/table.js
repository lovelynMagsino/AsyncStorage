import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper';


export const TableList = ({ navigation }) => {
    const [studentsData, setStudentsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();

    useEffect(() => {
        const load = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const studentKeys = keys.filter((key) => key.startsWith('Student_'));
                const savedData = await AsyncStorage.multiGet(studentKeys);
                const parsedData = savedData.map((item) => JSON.parse(item[1]));

                const sortedData = parsedData.sort((a, b) => a.id - b.id);

                setStudentsData(sortedData);
            } catch (err) {
                alert(err);
            }
        };

        load();
    }, []); //

    const handleRowClick = (user) => {
        setSelectedStudent(user);
        setModalVisible(true);
        
        
      };
      
      const handleModalClose = () => {
        setModalVisible(false);
      };
      
      const renderModal = (user) => {
        if (!modalVisible) return null;
      
        return (
          <Modal
            visible={modalVisible}
            onRequestClose={handleModalClose}
            style={styles.modalContainer}
            animationType='slide'
            transparent
            
          >
            <View style={styles.modalContainer}>
              <Text style={{fontSize: 20}}>Student Information</Text>
              
              <Text style={{marginTop:40, fontSize:20, textTransform:'capitalize'}}>Firstname: {selectedStudent.firstname}</Text>
              <Text style={{marginTop:20, fontSize:20, textTransform:'capitalize'}}>Lastname: {selectedStudent.lastname}</Text>
              <Text style={{marginTop:20, fontSize:20, textTransform:'capitalize'}}>Course: {selectedStudent.course}</Text>
              <Text style={{marginTop:40, fontSize:20, textTransform:'capitalize'}}>Username: {selectedStudent.username}</Text>
              <Text style={{marginTop:20, fontSize:20, textTransform:'capitalize'}}>Password: {selectedStudent.password}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
              <View style={{backgroundColor:"lightblue", alignItems:'center', height: 50, marginTop:20}}>
                <Text style={{marginTop:10, fontSize:20, color:'blue'}}>Close</Text>
                </View> 
              </TouchableOpacity>
              </View>
          </Modal>
        );
      };
      

    return (
        <View style={styles.container}>

            <DataTable style={styles.tablecontainer}>
                <DataTable.Header style={styles.tableheader}>
                    <DataTable.Title>#</DataTable.Title>
                    <DataTable.Title>NAME</DataTable.Title>
                    <DataTable.Title>COURSE</DataTable.Title>
                    <DataTable.Title>USERNAME</DataTable.Title>
                </DataTable.Header>
                {studentsData.map((user) => (
                    <TouchableOpacity
                        key={user.id}
                        onPress={() => handleRowClick(user)}
                    >
                        <DataTable.Row style={styles.tableRow}>
                            <DataTable.Cell>{user.id}</DataTable.Cell>
                            <DataTable.Cell>{user.lastname}, {user.firstname}</DataTable.Cell>
                            <DataTable.Cell>{user.course}</DataTable.Cell>
                            <DataTable.Cell style={styles.text}>{user.username}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
            </DataTable>
            {renderModal()}



            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inputdata')}>
                <Text style={{ color: 'white' }}>ADD STUDENT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 50,
        backgroundColor: '#fff',

        alignSelf: 'stretch',
        marginTop:50,
        
    },
    button: {
        backgroundColor: "#575DD9",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 32,
        marginHorizontal: 32,
        height: 60,
    },
    tablecontainer: {
        alignSelf: "stretch",
        borderWidth: 1,
        color:'blue'
    },

    tableheader: {
        backgroundColor: 'lightblue',
        fontSize: 30,
    },

    tableRow: {
        borderTopWidth: 1,
        textTransform:'uppercase',
    },
    text:{
    textTransform:'none',
    },
    modal:{
        marginTop:20,
        borderRadius:20,
        elevation: 50,
        width: 300,
        height: 400,
        padding: 20,
    },

    modalContainer:{
        backgroundColor:"white",
        elevation:10,    
        marginTop:250,
        alignSelf:"center",
        alignContent:"center",
        width: 300,
        height: 400,
        padding: 20,  
    },

});