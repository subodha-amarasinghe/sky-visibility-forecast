import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { IconButton, Provider } from 'react-native-paper';


const HeaderMenu = () => {
  const navigation = useNavigation();

  return (
    <>
      <IconButton
        size={32}
        style={{margin:0, padding:0}}
        icon="account-circle"
        onPress={() => navigation.replace('Profile')}
      />
    </>
  );
};

export default HeaderMenu;
