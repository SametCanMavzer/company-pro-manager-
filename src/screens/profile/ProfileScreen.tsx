import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCompany, logout } from '../../redux/slices/authSlice';
import DetailItem from '../../components/DetailItem';
import {
  updateCompanyDetails,
  updateBankDetails,
  updateContactDetails,
  updateSettings,
  setIsEditingCompany,
  setIsEditingBank,
  setIsEditingContact,
  setIsEditingSettings
} from '../../redux/slices/profileSlice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { company, loading, error, user } = useAppSelector(state => state.auth);
  const { 
    companyDetails, 
    bankDetails, 
    contactDetails, 
    settings, 
    isEditingCompany,
    isEditingBank,
    isEditingContact,
    isEditingSettings
  } = useAppSelector(state => state.profile);
  
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      dispatch(updateCompanyDetails({
        companyNumber: company.companyNumber || '',
        legalName: company.legalName || '',
        taxNumber: company.taxNumber || '',
        vatNumber: company.vatNumber || '',
        address: company.address || ''
      }));
      
      dispatch(updateContactDetails({
        ownerName: company.ownerName || '',
        ownerPhoneNumber: company.ownerPhoneNumber || '',
        officePhoneNumbers: company.officePhoneNumbers || ''
      }));
      
      const userEmail = user?.email || '';
      dispatch(updateSettings({
        password: '************', 
        email: userEmail
      }));
    }
  }, [company, user, dispatch]);

  const handleCompanyEdit = () => {
    dispatch(setIsEditingCompany(!isEditingCompany));
  };

  const handleBankEdit = () => {
    dispatch(setIsEditingBank(!isEditingBank));
  };

  const handleContactEdit = () => {
    dispatch(setIsEditingContact(!isEditingContact));
  };

  const handleSettingsEdit = () => {
    dispatch(setIsEditingSettings(!isEditingSettings));
  };

  const handleSaveCompany = () => {
 
    dispatch(setIsEditingCompany(false));
   
    Alert.alert(
      "Permission Error",
      "You do not have permission to update this company. Changes are only visible in the app and are not saved to the database.",
      [{ text: "OK" }]
    );
  };

  const handleSaveBank = () => {

    dispatch(setIsEditingBank(false));

    Alert.alert(
      "Permission Error",
      "You do not have permission to update bank details. Changes are only visible in the app and are not saved to the database.",
      [{ text: "OK" }]
    );
  };

  const handleSaveContact = () => {

    dispatch(setIsEditingContact(false));
 
    Alert.alert(
      "Permission Error",
      "You do not have permission to update contact details. Changes are only visible in the app and are not saved to the database.",
      [{ text: "OK" }]
    );
  };

  const handleSaveSettings = () => {

    dispatch(setIsEditingSettings(false));

    Alert.alert(
      "Permission Error",
      "You do not have permission to update settings. Changes are only visible in the app and are not saved to the database.",
      [{ text: "OK" }]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading && !company) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F39C12" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(getCompany())}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Seller</Text>
          </TouchableOpacity>
        </View>

        {/* Şirket Bilgileri */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Company details</Text>
            <TouchableOpacity onPress={handleCompanyEdit}>
              <MaterialIcons name="edit" size={24} color="#F39C12" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem 
              label="Operator ID:" 
              value={user?.operatorId || ''} 
              editable={false}
            />
            <DetailItem 
              label="Company Number:" 
              value={companyDetails.companyNumber} 
              editable={isEditingCompany}
              onChangeText={(text) => dispatch(updateCompanyDetails({...companyDetails, companyNumber: text}))}
            />
            <DetailItem 
              label="Legal name:" 
              value={companyDetails.legalName} 
              editable={isEditingCompany}
              onChangeText={(text) => dispatch(updateCompanyDetails({...companyDetails, legalName: text}))}
            />
            <DetailItem 
              label="TAT Number:" 
              value={companyDetails.taxNumber} 
              editable={isEditingCompany}
              onChangeText={(text) => dispatch(updateCompanyDetails({...companyDetails, taxNumber: text}))}
            />
            <DetailItem 
              label="VAT number:" 
              value={companyDetails.vatNumber} 
              editable={isEditingCompany}
              onChangeText={(text) => dispatch(updateCompanyDetails({...companyDetails, vatNumber: text}))}
            />
            <DetailItem 
              label="Address:" 
              value={companyDetails.address} 
              editable={isEditingCompany}
              onChangeText={(text) => dispatch(updateCompanyDetails({...companyDetails, address: text}))}
            />
          </View>

          {isEditingCompany && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveCompany}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => dispatch(setIsEditingCompany(false))}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Banka Bilgileri */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bank Details</Text>
            <TouchableOpacity onPress={handleBankEdit}>
              <MaterialIcons name="edit" size={24} color="#F39C12" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem 
              label="Account Type:" 
              value={bankDetails.accountType} 
              editable={isEditingBank}
              onChangeText={(text) => dispatch(updateBankDetails({...bankDetails, accountType: text}))}
            />
            <DetailItem 
              label="Bank name:" 
              value={bankDetails.bankName} 
              editable={isEditingBank}
              onChangeText={(text) => dispatch(updateBankDetails({...bankDetails, bankName: text}))}
            />
            <DetailItem 
              label="Account Name:" 
              value={bankDetails.accountName} 
              editable={isEditingBank}
              onChangeText={(text) => dispatch(updateBankDetails({...bankDetails, accountName: text}))}
            />
            <DetailItem 
              label="Account Number:" 
              value={bankDetails.accountNumber} 
              editable={isEditingBank}
              onChangeText={(text) => dispatch(updateBankDetails({...bankDetails, accountNumber: text}))}
            />
          </View>

          {isEditingBank && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveBank}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => dispatch(setIsEditingBank(false))}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* İletişim Bilgileri */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact details</Text>
            <TouchableOpacity onPress={handleContactEdit}>
              <MaterialIcons name="edit" size={24} color="#F39C12" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem 
              label="Company owner name:" 
              value={contactDetails.ownerName} 
              editable={isEditingContact}
              onChangeText={(text) => dispatch(updateContactDetails({...contactDetails, ownerName: text}))}
            />
            <DetailItem 
              label="Phone number:" 
              value={contactDetails.ownerPhoneNumber} 
              editable={isEditingContact}
              onChangeText={(text) => dispatch(updateContactDetails({...contactDetails, ownerPhoneNumber: text}))}
            />
            <DetailItem 
              label="Office phone number:" 
              value={contactDetails.officePhoneNumbers} 
              editable={isEditingContact}
              onChangeText={(text) => dispatch(updateContactDetails({...contactDetails, officePhoneNumbers: text}))}
            />
          </View>

          {isEditingContact && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => dispatch(setIsEditingContact(false))}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Ayarlar */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity onPress={handleSettingsEdit}>
              <MaterialIcons name="edit" size={24} color="#F39C12" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem 
              label="Change password:" 
              value={settings.password} 
              editable={isEditingSettings}
              secureTextEntry={true}
              onChangeText={(text) => dispatch(updateSettings({...settings, password: text}))}
            />
            <DetailItem 
              label="Change mail:" 
              value={settings.email} 
              editable={isEditingSettings}
              onChangeText={(text) => dispatch(updateSettings({...settings, email: text}))}
            />
          </View>

          {isEditingSettings && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => dispatch(setIsEditingSettings(false))}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#F39C12',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F39C12',
  },
  tabText: {
    color: '#777',
  },
  activeTabText: {
    color: '#F39C12',
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#F39C12',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#F39C12',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  },
  bottomTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBottomTab: {
    borderTopWidth: 2,
    borderTopColor: '#F39C12',
  },
  bottomTabText: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  activeBottomTabText: {
    fontSize: 12,
    color: '#F39C12',
    marginTop: 2,
  },
});

export default ProfileScreen; 