import React, { useCallback, useRef, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CarouselStatic } from 'react-native-snap-carousel';
import SafeAreaView from 'react-native-safe-area-view';
import Carousel from '../../organisms/Carousel';
import Pagination from '../../atoms/Pagination';
import testIDs from '../../../constants/testIDs';
import * as LocalStore from '../../../lib/local-store';
import { Context, Status } from '../../../contexts/ui';
import { COLOR } from '../../../constants/theme';

const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
    backgroundColor: COLOR.MAIN,
  },
});

interface Data {
  text: string;
}

const renderData = [
  {
    text: 'Hello React Native world.\nWelcome to the JS world.\n\nThis application is made from React Native.',
    testID: testIDs.INITIAL_NEXT_BUTTON1,
  },
  {
    text: 'If you use this application,\nyou could manage your task.\n\nSo, please register and manage your task',
    testID: testIDs.INITIAL_NEXT_BUTTON2,
  },
  {
    text: 'In the first, you have to register your account.\n\nPlease, tell me your email.',
    testID: testIDs.INITIAL_NEXT_BUTTON3,
  },
];

export default function Initial() {
  const [activeSlide, changeSlide] = useState(0);
  const { setApplicationState } = useContext(Context);
  const carouselRef = useRef(null);
  const onEnd = useCallback(() => {
    LocalStore.InitialLaunch.markAsTutorialIsDone().finally(() => {
      setApplicationState(Status.UN_AUTHORIZED);
    });
  }, [setApplicationState]);

  const onNext = useCallback(() => {
    const nextIndex = activeSlide === renderData.length - 1 ? activeSlide : 1 + activeSlide;
    setTimeout(() => {
      if (!carouselRef || !carouselRef.current) {
        return;
      }
      const carousel = (carouselRef.current as any) as CarouselStatic<Data>;
      carousel.snapToItem(nextIndex);
    }, 250);
    changeSlide(nextIndex);
  }, [activeSlide]);
  return (
    <SafeAreaView style={styles.container} testID={testIDs.INITIAL}>
      <Carousel data={renderData} onEnd={onEnd} onNext={onNext} carouselRef={carouselRef} onSnapToItem={changeSlide} />
      <Pagination length={renderData.length} index={activeSlide} />
    </SafeAreaView>
  );
}
