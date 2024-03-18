import { Image } from 'react-native';
import cont2 from '@assets/images/cont2.png';
import deposite from '@assets/images/deposite.png';

interface IDummyHomeCard {
    id: number;
  title: string;
  counts: number;
  navigateTo: string;
  icon: React.ReactNode;
}

export const dummyData: IDummyHomeCard[] = [

  {
    id:1,
    title: 'Incomes',
    counts: 5,
    navigateTo: 'Income',
    icon: (
      <Image
        source={cont2}
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    id:2,
    title: 'Expenses',
    counts: 3,
    navigateTo: 'Expenses',
    icon: (
      <Image
        source={deposite}
        style={{ width: 50, height: 50 }}
      />
    ),
  },
];
