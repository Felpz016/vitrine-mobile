import { StatusBar } from 'expo-status-bar';
import { CatalogoScreen } from '@/screens/CatalogoScreen';

export default function App() {
  return (
    <>
      <CatalogoScreen />
      <StatusBar style="light" />
    </>
  );
}