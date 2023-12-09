import { createStackNavigator } from '@react-navigation/stack';
import {Registering} from './Inputdata';
import { TableList } from './table';

  const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
  
    return {
      theme
    };
  };
  
    const Stack = createStackNavigator();
  
  function MyStacks() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Inputdata"
          component={Registering}
          options={{
            headerTitle:"",
            headerTransparent:'transparent',
          }}
        />
        <Stack.Screen
          name="table"
          component={TableList}
          options={{
            headerTitle:"",
            headerTransparent:'transparent',
          }}
        />
        
    
      </Stack.Navigator>
    );
  }
export const MyStack = () => {
  return (
    <MyStacks/>
  );
};