import {View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";



const Carousel = () => {
  const slides = [
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/ADS/Garnier/SX.jpg",
    "https://ma.jumia.is/cms/000_2023/000008_Aout/FS/WeekEnd/712x384.jpg",
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/ADS/Maybelline/HP-Slider-712x384.jpg",
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/ADS/LOreal/CPR/SX.jpg",
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/ADS/ITEL/SX_ITEL.jpg",
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/ADS/Dansmamaison/SX.jpg",
    "https://ma.jumia.is/cms/000_2024/000001_Janvier/SodesHiver/UND/CAN/SX.gif",
  ];
  return (
    <View>
      <SliderBox
        images={slides}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMethod="resize"
        resizeMode="cover"
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)",
        }}
        ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
        imageLoadingColor="#2196F3"
        sliderBoxHeight={200}
      />
    </View>
  );
};

export default Carousel

