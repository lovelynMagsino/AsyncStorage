import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AiOutlineDown from "./AiOutlineDown";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";


export { AiOutlineDown };

const toastConfig = {
  
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        height:50
      }}
    />
  ),

}

export const Registering = ({ navigation, props}) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [course, setcourse] = useState("Select Course");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [data, setData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const courseList = ["Select Course", "BSIT", "BSCS", "Criminology", "BSIT-FPSM", "BSElect", "BSElex"];

  // Fetch the stored ID counter
  const getStoredIdCounter = async () => {
    try {
      const storedIdData = await AsyncStorage.getItem("idCounter");
      if (storedIdData) {
        return parseInt(storedIdData);
      } else {
        return 0;
      }
    } catch (err) {
      console.error("Error fetching ID counter from AsyncStorage:", err);
      return 1;
    }
  };
  
  const generateId = async () => {
    const idCounter = await getStoredIdCounter();
    const newId = idCounter + 1;
  
    // Update the ID counter
    try {
      await AsyncStorage.setItem("idCounter", newId.toString());
    } catch (err) {
      console.error("Error saving ID counter to AsyncStorage:", err);
    }
  
    return newId;
  };

  // save data and update the ID counter to async
  const save = async () => {
    if (course === "Select Course") {
      showToast("Please select a valid course");
      return;
    }
  
    const newId = await generateId();
    const newData = {
      id: newId,
      firstname,
      lastname,
      course,
      username,
      password,
    };
  
    // Save new student data
    try {
      await AsyncStorage.setItem(`Student_${newData.id}`, JSON.stringify(newData));
    } catch (err) {
      console.error("Error saving student data to AsyncStorage:", err);
    }
  
    // Add new student data to the local state
    setData([...data, newData]);
  
    // success toast message
    showToast("Student data added successfully");
    <Toast/>
  
    // Clear the input fields
    clearInputs();
  };

 
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position:"bottom",
      contentContainerStyle:{
        marginTop:200
      }
      
    });
  };
  

  const clearInputs = () => {
    setfirstname("");
    setlastname("");
    setcourse("Select Course");
    setUsername("");
    setpassword("");
  };

  

    return (
        <View style={styles.container}>
            <View style={{marginTop:50}}></View>
            <TextInput placeholder="Firstname" style={styles.input} onChangeText={(firstname) => setfirstname(firstname)} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)} />
            <TextInput placeholder="Lastname"style={styles.input} onChangeText={(lastname) => setlastname(lastname)}  onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>

            <Picker
                selectedValue={course}
                onValueChange={(course) => setcourse(course)}
                style={styles.dropdown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
            >
                {courseList.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                ))}
            </Picker>
                

            <TextInput placeholder="Username" style={styles.inputs} onChangeText={(username) => setUsername(username)} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>
            <TextInput placeholder="Password" style={styles.inputs} onChangeText={(password) => setpassword(password)}  secureTextEntry={true} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>
            
            <View style={{marginTop: 50}}></View>

            <TouchableOpacity style={styles.button} onPress={() => save()}>
                <Text style={{ color: "white" }}>ADD STUDENT</Text>
                <Toast/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('table')}>
                <Text style={{ color: "white" }}>VIEW STUDENTS LIST</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding:50
    },
    name: {
        fontSize: 24,
        fontWeight: "300",
    },
    input: {
        borderWidth: 1,
        borderColor: "#dfe4ea",
        alignSelf: "stretch",
        marginLeft:32,
        marginRight:32,
        marginBottom:20,
        height: 40,
        borderRadius: 3,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: "300",
        color:"grey",  
    },
     inputs:{
        borderWidth: 1,
        borderColor: "#dfe4ea",
        alignSelf: "stretch",
        marginLeft:32,
        marginRight:32,
        marginBottom:20,
        height: 40,
        borderRadius: 3,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: "300",
        color:"grey",  
     },

    button: {
        backgroundColor: "#575DD9",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 10,
        marginHorizontal: 32,
        height: 60,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#dfe4ea",
        alignSelf: "stretch",
        margin: 32,
        height: 50,
        borderRadius: 3,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: "250",
        marginBottom: 20,
        color: 'gray', 
    }
})