import { useState, useEffect } from 'react';
import { ProgressiveImageProps } from './progressive-image.type';
import styles from './styles.module.scss';
import NImage from 'next/image';
import { Box } from '@mui/material';
const ProgressiveImage = ({
  placeholderSrc,
  src,
  cache,
  ...props
}: ProgressiveImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src]);
  const customClass =
    placeholderSrc && imgSrc === placeholderSrc && !isLoaded
      ? styles['progressive-image-loading']
      : styles['progressive-image-loaded'];
  return (
    <>
      {!isLoaded && (
        <div
          className={`${customClass} ${props.className}`}
          style={props.style}
        />
      )}
      {isLoaded &&
        (!!cache ? (
          <NImage
            {...{ src: imgSrc, data: imgSrc, ...props }}
            alt={props.alt || ''}
            className={`${customClass} ${props.className}`}
          />
        ) : (
          <Box
            component="img"
            {...{ src: imgSrc, data: imgSrc, ...props }}
            alt={props.alt || ''}
            className={`${customClass} ${props.className}`}
          />
        ))}
    </>
  );
};
export default ProgressiveImage;
