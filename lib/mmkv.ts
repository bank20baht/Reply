import {MMKV} from 'react-native-mmkv';

const localStorage = new MMKV();

localStorage.recrypt('hunter2');

export default localStorage;
