import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // ou 'stretch' pour couvrir toute la vue, peu importe sa taille
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    projectDetails: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    description: {
        fontSize: 23,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    type: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', // Centrer le texte
    },
});

export default styles;