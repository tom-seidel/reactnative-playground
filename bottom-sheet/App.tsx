import { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={handleOpenPress}
          activeOpacity={0.85}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Hello from the bottom sheet</Text>
            <Text style={styles.sheetSubtitle}>
              Swipe down or tap outside the sheet to close it.
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  openButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 48,
    backgroundColor: '#d90429',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});
