import { View, Text } from './Themed';
import { lightTheme } from '@constants/Colors';
import { StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect } from 'react';

export const ListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    readIncomeDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read income')) {
      readIncomeDetails();
    }
  };

  const onSpeechEnd = () => {
    startVoiceRecognition();
  };

  const readIncomeDetails = () => {
    Tts.speak(
      `Income ${props.count}, source ${props.source}, amount ${validAmount}`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Source</Text>
        <Text style={styles.columnLabel}>{props?.source}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>{validAmount}</Text>
      </View>
    </View>
  );
};

export const WithdrawListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  const beforeAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.balanceBefore);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    readWithdrawDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read withdraw')) {
      readWithdrawDetails();
    }
  };

  const onSpeechEnd = () => {
    startVoiceRecognition();
  };

  const readWithdrawDetails = () => {
    Tts.speak(
      `Withdraw ${props.count}, amount ${validAmount}, status ${
        props?.status === 'success' ? 'Success' : 'Failed'
      }
        Current balance ${beforeAmount}
      `,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Balance Before</Text>
        <Text style={styles.columnLabel}>{beforeAmount}</Text>
      </View>

      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>{validAmount}</Text>
      </View>
      
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {props?.status === 'success' ? 'Success' : 'Failed'}
        </Text>
      </View>
    </View>
  );
};

export const DepositListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    readDepositDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read deposit')) {
      readDepositDetails();
    }
  };

  const onSpeechEnd = () => {
    startVoiceRecognition();
  };

  const readDepositDetails = () => {
    Tts.speak(
      `Deposit ${props.count}, source ${
        props.source
      }, amount ${validAmount}, status ${
        props?.status === 'success' ? 'Success' : 'Failed'
      }`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Source</Text>
        <Text style={styles.columnLabel}>{props?.source}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>{validAmount}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {props?.status === 'success' ? 'Success' : 'Failed'}
        </Text>
      </View>
    </View>
  );
};
export const ExpenseListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    // startVoiceRecognition();

    // Read expense details when component mounts
    readExpenseDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read expense')) {
      readExpenseDetails();
    }
  };

  const onSpeechEnd = () => {
    // Optionally, you can restart voice recognition here if needed
    startVoiceRecognition();
  };

  const readExpenseDetails = () => {
    Tts.speak(
      `Expense ${props.count}, category ${props.category.name}, amount ${validAmount}, status success`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Category</Text>
        <Text style={styles.columnLabel}>{props?.category?.name}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>{validAmount}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}></Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Success</Text>
        </View>
      </View>
    </View>
  );
};

export const TransactionListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    // startVoiceRecognition();

    // Read transaction details when component mounts
    readTransactionDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read transaction')) {
      readTransactionDetails();
    }
  };

  const onSpeechEnd = () => {
    // Optionally, you can restart voice recognition here if needed
    startVoiceRecognition();
  };

  const readTransactionDetails = () => {
    Tts.speak(
      `Transaction ${props.count}, category ${props?.category?.name}, amount ${validAmount}, status success`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>2</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Category</Text>
        <Text style={styles.columnLabel}>Cateegory </Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>9000</Text>
      </View>

      <View style={styles.statusContainer}>
<<<<<<< HEAD
        <Text style={styles.statusText}>Success</Text>
      </View> 
    </View>
  );
};

export const ExpenseListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  useEffect(() => { 
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    // startVoiceRecognition();

    // Read expense details when component mounts
    readExpenseDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }
  , []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read expense')) {
      readExpenseDetails();
    }
  };

  const onSpeechEnd = () => {
    // Optionally, you can restart voice recognition here if needed
    startVoiceRecognition();
  };

  const readExpenseDetails = () => {
    Tts.speak(`Expense ${props.count}, category ${props.category.name}, amount ${validAmount}, status success`);
  };


  return (
    <View style={styles.container}>
      <View style={styles.countContainer}

      >
        <Text style={styles.countText}

        >{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Category</Text>
        <Text style={styles.columnLabel}>{props?.category?.name}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>{validAmount}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}></Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Success</Text>
        </View>
      </View>
    </View>
  );
};

export const TransactionListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    // startVoiceRecognition();

    // Read transaction details when component mounts
    readTransactionDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('read transaction')) {
      readTransactionDetails();
    }
  };

  const onSpeechEnd = () => {
    // Optionally, you can restart voice recognition here if needed
    startVoiceRecognition();
  };

  const readTransactionDetails = () => {
    Tts.speak(`Transaction ${props.count}, category ${props?.category?.name}, amount ${validAmount}, status success`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>2</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Category</Text>
        <Text style={styles.columnLabel}>Cateegory </Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>9000</Text>
      </View>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Success</Text>
=======
        <Text
          style={
            (styles.statusText,
            {
              color: props?.status === 'success' ? '#4A97CE' : '#FF0000',
            })
          }
        >
          Success
        </Text>
>>>>>>> 1ec4771 (fixing withdraw)
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingHorizontal: 10,
    paddingVertical: 19,

    borderRadius: 10,
    marginBottom: 20,

    backgroundColor: '#fff',
    shadowColor: lightTheme.text,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1.02,
    shadowRadius: 5.27,
    elevation: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  countText: {
    color: lightTheme.background,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 25,
    height: 25,
    borderRadius: 120 / 2,
    backgroundColor: lightTheme.primary,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginLeft: 20,
  },
  columnText: {
    color: lightTheme.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  columnLabel: {
    color: lightTheme.secondary,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#4A97CE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 20,
  },
  statusText: {
    color: lightTheme.background,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
