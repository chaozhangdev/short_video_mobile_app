import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
} from "react-native";
// import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "react-native-axios";

// import Video from "react-native-video";

import { Video, AVPlaybackStatus } from "expo-av";

export default function ShortVideos({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [videoList, setVideoList] = useState([]);
  const getVideos = () => {
    axios
      .post("https://qingtingapi.youyacao.com/api/v1/video/list")
      .then(function (res: any) {
        setVideoList(res.data.data.list);
      })
      .catch(function (err: Object) {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <ScrollView>
      {/* <TouchableOpacity onPress={getVideos}>
        <Text>Press Here</Text>
      </TouchableOpacity> */}

      <Video
        ref={video}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>

      {/* <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        shouldPlay
        resizeMode="cover"
        style={{ width: 300, height: 300 }}
      /> */}

      <Text>
        <View style={styles.videoList}>
          {videoList.map((el: any) => (
            <View style={styles.videoWrapper} key={el.id}>
              <View style={styles.video}>
                <Text>{el.id}</Text>
                <Text>{el.title}</Text>
                <Image
                  source={{ uri: el.thumb }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
          ))}
        </View>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  videoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  videoWrapper: {
    width: "50%",
    height: "auto",
    padding: "5%",
    textAlign: "center",
  },
  video: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    padding: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
