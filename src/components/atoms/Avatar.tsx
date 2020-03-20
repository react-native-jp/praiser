import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { ImageSourcePropType, ViewStyle } from 'react-native';

interface Props {
  size?: number;
  source: ImageSourcePropType;
  style?: ViewStyle | ViewStyle[];
}

export default function Avatar(props: Props) {
  const { size = 220, source, style } = props;
  return <PaperAvatar.Image size={size} source={source} style={style} />;
}
