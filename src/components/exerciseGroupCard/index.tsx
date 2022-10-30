import React from "react";
import { GroupType } from "../../models/exercise";
import { TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import {
  Card,
  CardContent,
  CardContentText,
  CardTitle,
  LeftHeading,
  LeftSpan,
  LeftView,
  RightContent,
  RightView,
} from "./styles";

interface GroupProp {
  group_data?: GroupType;
  navigation?: any;
}

const GroupCard = ({ group_data, navigation }: GroupProp) => {
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("Group", {
          id: group_data?._id,
        })
      }
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <Card>
          <View>
            <LeftView>
              <LeftHeading>{group_data?.days.length}</LeftHeading>
              <LeftSpan>
                {(group_data?.days?.length as number) > 1 ? "dias" : "dia"}
              </LeftSpan>
            </LeftView>
          </View>

          <RightView className="left-side">
            <RightContent>
              <View>
                <CardTitle>{group_data?.title}</CardTitle>
              </View>

              <View>
                <CardContent>
                  <CardContentText>
                    {group_data?.description?.length > 40
                      ? group_data?.description.slice(0, 40) + "..."
                      : group_data?.description}
                  </CardContentText>
                </CardContent>
              </View>
            </RightContent>
          </RightView>
        </Card>
      </View>
    </TouchableHighlight>
  );
};

export default GroupCard;
