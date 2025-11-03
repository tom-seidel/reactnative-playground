import { useCallback, useMemo, useRef } from 'react';
import type { ComponentRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type BottomSheetRef = ComponentRef<typeof BottomSheet>;

export default function App() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  // Snap points bei 40% des Bildschirms
  const snapPoints = useMemo(() => ['40%'], []);

  // Button Handler um das Bottom-Sheet zu öffnen
  const handleOpenBottomSheet = useCallback(() => {
    const sheet = bottomSheetRef.current;
    sheet?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    const sheet = bottomSheetRef.current;
    sheet?.close();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.content}>
          <Text style={styles.text}>Bottom-Sheet Test Projekt</Text>
          <StatusBar style="auto" />
        </View>

        {/* Roter Button unten */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={handleOpenBottomSheet}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>

        {/* Bottom-Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Geschlossen beim Start
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              style={styles.closeButton}
              hitSlop={8}
              accessibilityLabel="Sheet schließen"
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.bottomSheetTitle}>Gorhom Bottom-Sheet 🎉</Text>
            <Text style={styles.bottomSheetText}>
              Swipe down to close
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  redButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 0,
    color: '#333',
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  bottomSheetText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});
