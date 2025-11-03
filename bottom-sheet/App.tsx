// App.tsx (or your Screen)
import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export default function App() {
  const sheetRef = useRef<BottomSheet>(null);

  // One open detent at 40%. Closed is index = -1 (no "0%" in snapPoints).
  const snapPoints = useMemo(() => ['40%'], []);

  const openSheet = useCallback(() => {
    // Either works. snapToIndex(0) is explicit for "40%".
    sheetRef.current?.snapToIndex(0);
    // sheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"     // tap outside closes
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Your content */}
      <View style={styles.content}>
        <Text style={styles.title}>Bottom-Sheet Test Projekt</Text>
      </View>

      {/* RED BUTTON at bottom */}
      <TouchableOpacity style={styles.redButton} onPress={openSheet} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={-1}                      // start closed
        snapPoints={snapPoints}         // only 40% open
        enablePanDownToClose            // swipe → close (-1)
        enableOverDrag={false}          // removes bouncy “mid” feel
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={closeSheet} style={styles.closeButton} hitSlop={8}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.bottomSheetTitle}>Gorhom Bottom-Sheet 🎉</Text>
          <Text style={styles.bottomSheetText}>Swipe down or tap outside to close</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', color: '#333' },

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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: Platform.select({ android: 0, ios: undefined }),
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  bottomSheetBackground: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  handleIndicator: { backgroundColor: '#ccc', width: 40 },
  bottomSheetContent: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' },
  bottomSheetTitle: { fontSize: 24, fontWeight: '700', color: '#333', textAlign: 'center', marginTop: 32, paddingHorizontal: 24 },
  bottomSheetText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 16 },

  closeButton: { position: 'absolute', top: 0, right: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f0f0f0' },
  closeButtonText: { fontSize: 16, fontWeight: '700', color: '#333' },
});
