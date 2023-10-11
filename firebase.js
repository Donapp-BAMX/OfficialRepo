import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, collection, Timestamp, getDocs, updateDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from 'firebase/auth';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCTtuXMWzxMhH5_Boa8EHH_e_mxAbCQ9NQ",
  authDomain: "banmx-87212.firebaseapp.com",
  projectId: "banmx-87212",
  storageBucket: "banmx-87212.appspot.com",
  messagingSenderId: "834578965377",
  appId: "1:834578965377:web:21ca2404520a975d8afe80",
  measurementId: "G-YNYDNL0KHE"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

// Función para registrar un usuario
export const registerUser = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
};
  
  // Función para iniciar sesión
  export const loginUser = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logoutUser = () => {
    const auth = getAuth();
    return signOut(auth);
};

// Función para obtener la información del usuario
export const getUserInformation = async (currentUser) => {
  if (!currentUser) {
    throw new Error("El usuario actual es nulo");
  }

  const docRef = doc(db, "users", currentUser);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    const isVolunteer = userData.voluntario || false; // Si el campo voluntario no existe, se establece en false
    return {
      ...userData,
      voluntario: isVolunteer,
    };
  } else {
    throw new Error("El documento no existe");
  }
};

export const resetPassword = (email) => {
  const auth = getAuth(); // Obtén una instancia de Auth
  return sendPasswordResetEmail(auth, email); // Utiliza sendPasswordResetEmail para enviar el correo de restablecimiento
};


// Funcion para guardar anuncios en firestore
export const saveAnuncio = async (title, description) => {
  const anunciosCollection = collection(db, "anuncios");
  const currentDate = Timestamp.now();

  try {
    await addDoc(anunciosCollection, {
      title,
      description,
      creationDate: currentDate,
    });
    console.log("Anuncio guardado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el anuncio:", error);
    throw error;
  }
};

// Función para obtener todos los anuncios desde Firestore
export const getAnuncios = async () => {
  const anunciosCollection = collection(db, "anuncios");
  const querySnapshot = await getDocs(anunciosCollection);
  const anuncios = [];

  querySnapshot.forEach((doc) => {
    anuncios.push({ id: doc.id, ...doc.data() });
  });

  return anuncios;
};

// Función para agregar alimentos a Firebase
export const addFoodToFirebase = async (foodData) => {
  try {
    const foodCollectionRef = collection(db, 'foods');

    // Agregar la fecha de registro
    const foodDataWithTimestamp = {
      ...foodData,
      registeredAt: Timestamp.fromDate(new Date()),
    };

    const newFoodDocRef = await addDoc(foodCollectionRef, foodDataWithTimestamp);

    return newFoodDocRef.id; // Devuelve el ID del documento creado
  } catch (error) {
    throw error;
  }
};

// Función para actualizar el valor de voluntario en Firestore
export const updateVolunteerStatus = async (currentUser, isVolunteer) => {
  if (!currentUser) {
    throw new Error('El usuario actual es nulo');
  }

  const userDocRef = doc(db, 'users', currentUser);

  try {
    // Obtén el documento del usuario
    const userDoc = await getDoc(userDocRef);
    
    // Actualiza el valor de voluntario en el documento
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        voluntario: isVolunteer,
      });
    }
  } catch (error) {
    console.error('Error al actualizar el valor de voluntario:', error);
    throw error;
  }
};

// Funcion para confirmar que el usuario deja de ser voluntario
const confirmLeaveVolunteer = () => {
  updateVolunteerStatus(currentUser, false)
    .then(() => {
      setIsVolunteer(false);
    })
    .catch((error) => {
      console.error('Error al dejar de ser voluntario:', error);
    });
};

// Función para registrar o desregistrar al usuario como voluntario en Firebase
export const toggleVolunteerStatus = async (currentUser, isVolunteer) => {
  if (!currentUser) {
    throw new Error("El usuario actual es nulo");
  }

  const userDocRef = doc(db, "users", currentUser);

  try {
    // Obtén el documento del usuario
    const userDoc = await getDoc(userDocRef);

    // Actualiza el valor de voluntario en el documento
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        voluntario: isVolunteer,
      });
    }
  } catch (error) {
    console.error("Error al actualizar el valor de voluntario:", error);
    throw error;
  }
};