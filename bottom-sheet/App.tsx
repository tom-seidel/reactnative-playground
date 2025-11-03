import { useCallback, useMemo, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { WithSpringConfig } from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type BottomSheetRef = ComponentRef<typeof BottomSheet>;

export default function App() {
  // Ref to control the bottom sheet
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  // State to track if the sheet is open
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Get screen height for potential dynamic calculations
  const screenHeight = Dimensions.get('window').height;

  // Snap points at 40% of the screen
  const snapPoints = useMemo(() => ["40%"], []);

  // Faster spring config keeps the close animation snappy without noticeable bounce
  const animationConfigs = useMemo<WithSpringConfig>(
    () => ({
      damping: 32,
      stiffness: 320,
      mass: 0.7,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    }),
    []
  );

  // Button handler to open the bottom sheet
  const handleOpenBottomSheet = useCallback(() => {
    const sheet = bottomSheetRef.current;
    sheet?.expand();
    setIsSheetOpen(true);
  }, []);

  // Handler to close the bottom sheet
  const handleCloseBottomSheet = useCallback(() => {
    const sheet = bottomSheetRef.current;
    sheet?.close();
    setIsSheetOpen(false);
  }, []);

  // Ensure state resets when the sheet finishes closing
  const handleSheetClosed = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  // Callback when the sheet changes index
  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.content}>
          <Text style={styles.text}>Bottom Sheet Test Project</Text>
          <StatusBar style="auto" />
        </View>

        {/* Red button at the bottom */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={handleOpenBottomSheet}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>

        {isSheetOpen && (
          <Pressable
            style={styles.backdrop}
            onPress={handleCloseBottomSheet}
            accessibilityLabel="Close sheet by tapping on background"
          />
        )}

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Closed at start
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          enableOverDrag={false} // Prevent partial second stage
          enableDynamicSizing={false} // Keep the sheet fixed at the 40% snap point
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          animationConfigs={animationConfigs}
          onChange={handleSheetChange}
          onClose={handleSheetClosed}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              style={styles.closeButton}
              hitSlop={8}
              accessibilityLabel="Close sheet"
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.bottomSheetTitle}>Gorhom Bottom-Sheet</Text>
            <Text style={styles.bottomSheetText}>
              This bottom sheet is fully working in both Android and iOS!
            </Text>            
            <Text style={styles.bottomSheetText}>
              Swipe, tap the X button, or tap outside to close it.
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});