import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.8)', // Semi-transparent background for readability
    padding: 20,
    
  },
  title: {
    fontSize: 28, // Increased font size for more impact
    fontWeight: 'bold',
    color: '#2C3E50', // Slightly darker text color
    textAlign: 'center',
    marginBottom: 30, // More space for better separation
  },
  projectItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15, // More pronounced rounded corners for a modern look
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25, // Reduced shadow opacity for a subtler appearance
    shadowRadius: 6, // Increased shadow radius
    elevation: 8,
    marginBottom: 20, // More margin for extra space between items
    borderColor: '#d1d1d1',
    borderWidth: 0.5,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  projectIcon: {
    marginRight: 20, // Increased space between icon and text for better readability
  },
  projectTitle: {
    fontSize: 24, // Larger font size for better readability
    color: '#34495E', // Slightly softer text color
    fontWeight: 'bold',
    flex: 1, // Added to ensure text takes available space
  },
  menuIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end', // Align to the right
    padding: 10,
  },
  menuIcon: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 40, // Extra space for the list
  },
  separator: {
    height: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40, // Slightly adjusted position for better accessibility
    width: 65, // Slightly increased button size
    height: 65, // Slightly increased button size
    borderRadius: 32.5, // Adjusted border radius
    backgroundColor: '#1A73E8', // More vibrant color for the floating button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15, // Rounded corners for a softer look
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    padding: 15,
    borderRadius: 10, // Rounded corners for better visual comfort
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure it is above other content
  },
  descriptionInput: {
    height: 140,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
},
fullWidthButton: {
    width: '100%',
    backgroundColor: '#007bff', // Set the background color
    paddingVertical: 10,
    borderRadius: 20, // Apply borderRadius here
    alignItems: 'center', // Center the text inside the button
},
buttonText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
},



  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1A73E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalCancelButton: {
    backgroundColor: '#E74C3C',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 25,
    marginTop: 100,
    height: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#333',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
