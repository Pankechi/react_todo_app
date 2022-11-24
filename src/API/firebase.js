// импорт и инициализация хранилища файрбейс
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHJ_H0vWGxAK4CmTbrYa0KESaJCOFYr_4",
  authDomain: "todo-storage-62095.firebaseapp.com",
  projectId: "todo-storage-62095",
  storageBucket: "todo-storage-62095.appspot.com",
  messagingSenderId: "155198476260",
  appId: "1:155198476260:web:8bf573c1fa96ec438b01f1"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export default storage

