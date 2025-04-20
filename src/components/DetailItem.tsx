import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,

} from 'react-native';


interface DetailItemProps {
    label: string;
    value: string;
    editable?: boolean;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
  }
  
  const DetailItem: React.FC<DetailItemProps> = ({ 
    label, 
    value, 
    editable = false, 
    secureTextEntry = false,
    onChangeText 
  }) => {
    return (
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        {editable ? (
          <TextInput
            style={styles.detailInput}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
          />
        ) : (
          <Text style={styles.detailValue}>{value}</Text>
        )}
      </View>
    );
  };

  export default DetailItem;
  
  const styles = StyleSheet.create({
    detailItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    detailLabel: {
      fontSize: 14,
      color: '#555',
      flex: 1,
    },
    detailValue: {
      fontSize: 14,
      color: '#333',
      flex: 2,
      textAlign: 'right',
    },
    detailInput: {
      flex: 2,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 14,
      textAlign: 'right',
    }
  });